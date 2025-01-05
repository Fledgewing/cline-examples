extends CharacterBody3D

@export var health: int = 30  # 3 hits to kill
@export var movement_speed: float = 3.0
@export var detection_range: float = 30.0
@export var attack_range: float = 2.0
@export var attack_damage: int = 10
@export var attack_cooldown: float = 1.0

var player: Node3D
var is_dead: bool = false
var can_attack: bool = true

@onready var visual = $Visual
@onready var nav_agent = $NavigationAgent3D

func _ready():
    # Add to enemy group
    add_to_group("enemy")
    
    # Get player reference
    await get_tree().create_timer(0.1).timeout
    player = get_tree().get_nodes_in_group("player")[0]
    
    # Setup material
    var material = visual.get_surface_override_material(0)
    material.albedo_color = Color(0.2, 0.8, 0.2)  # Start green
    
    print_debug("Enemy spawned and initialized at ", position)

func _physics_process(_delta):
    if is_dead or not player:
        return
        
    var distance_to_player = global_position.distance_to(player.global_position)
    if distance_to_player < detection_range:
        if distance_to_player <= attack_range and can_attack:
            attack()
        else:
            # Direct movement towards player
            var direction = (player.global_position - global_position)
            direction.y = 0  # Keep movement horizontal
            direction = direction.normalized()
            
            # Set velocity
            velocity = direction * movement_speed
            
            # Look at player (only y-axis rotation)
            look_at(Vector3(player.global_position.x, global_position.y, player.global_position.z))
            
            # Debug output
            print_debug("Moving towards player with velocity: ", velocity)
    else:
        # Stop movement when not chasing
        velocity = Vector3.ZERO
            
    # Move enemy
    move_and_slide()

func take_damage(amount: int):
    if is_dead:
        return
        
    health -= amount
    print_debug("Enemy health: ", health)
    
    # Update color based on health percentage
    var health_percent = float(health) / 30.0  # Match with max health
    var red = lerp(0.2, 0.8, 1.0 - health_percent)
    var green = lerp(0.2, 0.8, health_percent)
    
    var material = visual.get_surface_override_material(0)
    material.albedo_color = Color(red, green, 0.2)
    
    if health <= 0:
        die()

func attack():
    if not can_attack:
        return
        
    can_attack = false
    print_debug("Attacking player")
    
    # Deal damage to player if they have the method
    if player.has_method("take_damage"):
        player.take_damage(attack_damage)
    
    # Reset attack cooldown
    await get_tree().create_timer(attack_cooldown).timeout
    can_attack = true

func die():
    is_dead = true
    print_debug("Enemy died")
    
    # Emit signal for score or other game mechanics
    if has_node("../GameManager"):
        get_node("../GameManager").enemy_killed()
    
    queue_free()
