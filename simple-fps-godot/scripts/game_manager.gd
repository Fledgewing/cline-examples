extends Node

@export var enemy_scene: PackedScene
@export var max_enemies: int = 5
@export var spawn_interval: float = 1.8
@export var points_per_kill: int = 10

var score: int = 0
var spawn_points: Array
var game_started: bool = false
var game_over: bool = false

@onready var score_label = $"../UI/Score"
@onready var click_to_play = $"../UI/ClickToPlay"
@onready var game_over_label = $"../UI/GameOver"
@onready var weapon = $"../Player/Head/Camera3D/Weapon"

func _ready():
    spawn_points = get_tree().get_nodes_in_group("spawn_point")
    print_debug("Game manager initialized with ", spawn_points.size(), " spawn points")
    
    # Connect to player input
    if OS.has_feature("web"):
        Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
        click_to_play.visible = true
        game_over_label.visible = false
    else:
        Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
        click_to_play.visible = false
        game_over_label.visible = false
        start_game()

func _input(event):
    if game_over:
        if event is InputEventKey and event.pressed and event.keycode == KEY_ENTER:
            restart_game()
            return
            
    if OS.has_feature("web") and not game_over:
        if event is InputEventMouseButton and event.pressed:
            if Input.mouse_mode == Input.MOUSE_MODE_VISIBLE:
                Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
                click_to_play.visible = false
                start_game()

func start_game():
    if game_started:
        return
        
    game_started = true
    game_over = false
    score = 0
    score_label.text = "Score: " + str(score)
    game_over_label.visible = false
    
    # Start spawning enemies
    spawn_enemy()
    spawn_enemy()  # Spawn two initially
    spawn_enemy()  # Spawn three initially

func end_game():
    game_over = true
    game_started = false
    Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
    game_over_label.text = "Game Over - an Enemy touched you.\nPress Enter to restart."
    game_over_label.visible = true
    
    # Clear existing enemies
    for enemy in get_tree().get_nodes_in_group("enemy"):
        enemy.queue_free()

func restart_game():
    # Reset game state
    game_over = false
    score = 0
    score_label.text = "Score: " + str(score)
    game_over_label.visible = false
    Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
    
    # Replenish ammo and reset weapon state
    if weapon:
        weapon.current_ammo = weapon.ammo_capacity
        weapon.is_reloading = false
        weapon.can_fire = true
        weapon.update_ammo_display()
    
    # Start new game
    start_game()

func spawn_enemy():
    if !game_started or game_over:
        return
        
    var current_enemies = get_tree().get_nodes_in_group("enemy")
    print_debug("Current enemies: ", current_enemies.size())
    
    if current_enemies.size() < max_enemies:
        var spawn_point = spawn_points[randi() % spawn_points.size()]
        var enemy = enemy_scene.instantiate()
        enemy.position = spawn_point.position
        enemy.position.y = 0  # Ensure enemy is on ground
        add_sibling(enemy)
        print_debug("Enemy spawned at ", enemy.position)
        
    # Schedule next spawn
    await get_tree().create_timer(spawn_interval).timeout
    spawn_enemy()

func enemy_killed():
    score += points_per_kill
    score_label.text = "Score: " + str(score)
