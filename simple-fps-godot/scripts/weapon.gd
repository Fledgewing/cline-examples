extends Node3D

class_name Weapon

@export var damage: int = 10
@export var ammo_capacity: int = 9
@export var reload_time: float = 1.5
@export var fire_rate: float = 0.1

var current_ammo: int
var can_fire: bool = true
var is_reloading: bool = false

@onready var ray_cast = $"../RayCast3D"
@onready var audio_player = $AudioStreamPlayer3D
@onready var ammo_label = $WeaponUI/AmmoLabel

var base_position = Vector3(0.5, -0.25, -0.5)
var is_animating: bool = false

func _ready():
    current_ammo = ammo_capacity
    position = base_position
    
    # Verify setup
    print_debug("=== WEAPON SETUP ===")
    print_debug("RayCast exists: ", ray_cast != null)
    print_debug("Ammo label exists: ", ammo_label != null)
    if ray_cast:
        print_debug("RayCast enabled: ", ray_cast.enabled)
        print_debug("RayCast collision mask: ", ray_cast.collision_mask)
        print_debug("RayCast debug shape enabled: ", ray_cast.debug_shape_enabled)
        # Set raycast range to arena size
        ray_cast.target_position = Vector3(0, 0, -100)
    
    update_ammo_display()

func _physics_process(_delta):
    if !is_animating:
        position = position.lerp(base_position, 0.3)
    
    if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
        if Input.is_action_just_pressed("shoot"):
            if can_fire and !is_reloading and current_ammo > 0:
                shoot()
        elif Input.is_action_just_pressed("reload") and not is_reloading and current_ammo < ammo_capacity:
            reload()

func update_ammo_display():
    if !ammo_label:
        print_debug("No ammo label found for update")
        return
        
    if is_reloading:
        ammo_label.text = "Reloading..."
    elif current_ammo == 0:
        ammo_label.text = "Hit R to reload"
    else:
        ammo_label.text = str(current_ammo)
    print_debug("Ammo display updated: ", ammo_label.text)

func shoot():
    if !can_fire or is_reloading or current_ammo <= 0:
        return

    current_ammo -= 1
    update_ammo_display()
    can_fire = false
    
    print_debug("=== SHOOT ===")
    print_debug("Ammo remaining: ", current_ammo)
    
    # Force raycast update
    ray_cast.force_raycast_update()
    ray_cast.force_update_transform()
    get_tree().call_group("enemy", "force_update_transform")
    
    if ray_cast.is_colliding():
        var target = ray_cast.get_collider()
        var collision_point = ray_cast.get_collision_point()
        print_debug("Hit: ", target.name, " at ", collision_point)
        if target.has_method("take_damage"):
            target.take_damage(damage)
            print_debug("Dealt ", damage, " damage")
    else:
        print_debug("Missed - no collision detected")
    
    # Play recoil animation
    is_animating = true
    position.z += 0.2
    
    await get_tree().create_timer(0.1).timeout
    is_animating = false
    
    if audio_player and audio_player.stream:
        audio_player.play()
    
    await get_tree().create_timer(fire_rate).timeout
    can_fire = true

func reload():
    if is_reloading or current_ammo == ammo_capacity:
        return
        
    is_reloading = true
    update_ammo_display()
    print_debug("Reloading...")
    
    is_animating = true
    position.y -= 0.1
    
    await get_tree().create_timer(reload_time).timeout
    is_animating = false
    await get_tree().create_timer(reload_time).timeout
    
    current_ammo = ammo_capacity
    is_reloading = false
    update_ammo_display()
    print_debug("Reload complete")
