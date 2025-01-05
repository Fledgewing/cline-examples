extends CharacterBody3D

@export var SPEED = 5.0
@export var JUMP_VELOCITY = 4.5
@export var MOUSE_SENSITIVITY = 0.01

var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")
@onready var head = $Head
@onready var camera = $Head/Camera3D

@onready var click_to_play = $"../UI/ClickToPlay"
@onready var game_manager = $"../GameManager"

func _ready():
    add_to_group("player")
    
    # Initial mouse mode
    if OS.has_feature("web"):
        Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
        click_to_play.visible = true
    else:
        Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
        click_to_play.visible = false
        game_manager.start_game()

func _notification(what):
    if what == Window.NOTIFICATION_APPLICATION_FOCUS_OUT:
        if OS.has_feature("web"):
            Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
            click_to_play.visible = true
    elif what == Window.NOTIFICATION_APPLICATION_FOCUS_IN:
        if OS.has_feature("web") and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
            await get_tree().create_timer(0.1).timeout
            Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
            click_to_play.visible = false

func _input(event):
    if OS.has_feature("web"):
        if event is InputEventMouseButton and event.pressed:
            if Input.mouse_mode == Input.MOUSE_MODE_VISIBLE:
                Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
                click_to_play.visible = false
                game_manager.start_game()
        elif Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
            if event is InputEventMouseMotion:
                rotate_y(-event.relative.x * MOUSE_SENSITIVITY)
                head.rotate_x(-event.relative.y * MOUSE_SENSITIVITY)
                head.rotation.x = clamp(head.rotation.x, -PI/2, PI/2)
            
    # Handle pause and mouse capture
    if event.is_action_pressed("ui_cancel"):
        if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
            Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
            if OS.has_feature("web"):
                click_to_play.visible = true
        else:
            Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
            if OS.has_feature("web"):
                click_to_play.visible = false

func _physics_process(delta):
    # Add gravity
    if not is_on_floor():
        velocity.y -= gravity * delta

    # Handle Jump
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # Get movement input
    var input_dir = Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    var direction = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
    
    if direction:
        velocity.x = direction.x * SPEED
        velocity.z = direction.z * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)
        velocity.z = move_toward(velocity.z, 0, SPEED)

    move_and_slide()
