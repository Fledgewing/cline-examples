extends Node

@export var enemy_scene: PackedScene
@export var max_enemies: int = 4
@export var spawn_interval: float = 2.0
@export var points_per_kill: int = 10

var score: int = 0
var spawn_points: Array
var game_started: bool = false

@onready var score_label = $"../UI/Score"
@onready var click_to_play = $"../UI/ClickToPlay"
@onready var nav_region = $"../NavigationRegion3D"

func _ready():
    spawn_points = get_tree().get_nodes_in_group("spawn_point")
    print_debug("Game manager initialized with ", spawn_points.size(), " spawn points")
    
    # Connect to player input
    if OS.has_feature("web"):
        Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
        click_to_play.visible = true
    else:
        Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
        click_to_play.visible = false
        start_game()

func _input(event):
    if OS.has_feature("web"):
        if event is InputEventMouseButton and event.pressed:
            if Input.mouse_mode == Input.MOUSE_MODE_VISIBLE:
                Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
                click_to_play.visible = false
                start_game()

func start_game():
    if game_started:
        return
        
    game_started = true
    score = 0
    score_label.text = "Score: " + str(score)
    
    print_debug("Starting game...")
    
    # Start spawning enemies
    spawn_enemy()
    spawn_enemy()  # Spawn two initially
    spawn_enemy()  # Spawn three initially

func spawn_enemy():
    if !game_started:
        return
        
    var current_enemies = get_tree().get_nodes_in_group("enemy")
    print_debug("Current enemies: ", current_enemies.size())
    
    if current_enemies.size() < max_enemies:
        var spawn_point = spawn_points[randi() % spawn_points.size()]
        var enemy = enemy_scene.instantiate()
        enemy.position = spawn_point.position
        enemy.position.y = 0  # Ensure enemy is on ground
        nav_region.add_child(enemy)
        print_debug("Enemy spawned at ", enemy.position)
        
    # Schedule next spawn
    await get_tree().create_timer(spawn_interval).timeout
    spawn_enemy()

func enemy_killed():
    score += points_per_kill
    score_label.text = "Score: " + str(score)
    print_debug("Enemy killed, score: ", score)
