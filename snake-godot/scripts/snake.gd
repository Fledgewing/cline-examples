extends Node2D

signal game_over

var direction = Vector2(1, 0)  # Start moving right
var segments: Array[Vector2] = []
var speed = 0.15  # seconds between moves
var timer = 0.0
var grid_size = 20  # pixels per grid cell
var next_direction = Vector2(1, 0)  # Buffer for next direction change

# Touch controls
var touch_start_position = null
var min_swipe_distance = 20  # Minimum distance for a swipe to register
var current_swipe = Vector2.ZERO

func _ready() -> void:
	# Initialize snake with 3 segments
	segments = [
		Vector2(5, 5),  # Head
		Vector2(4, 5),
		Vector2(3, 5)   # Tail
	]
	Logger.log_info("Snake initialized with " + str(segments.size()) + " segments")

func _process(delta: float) -> void:
	timer += delta
	if timer >= speed:
		timer = 0
		move()

func _input(event: InputEvent) -> void:
	# Handle keyboard input
	if event.is_action_pressed("move_up") and direction.y != 1:
		next_direction = Vector2(0, -1)
	elif event.is_action_pressed("move_down") and direction.y != -1:
		next_direction = Vector2(0, 1)
	elif event.is_action_pressed("move_left") and direction.x != 1:
		next_direction = Vector2(-1, 0)
	elif event.is_action_pressed("move_right") and direction.x != -1:
		next_direction = Vector2(1, 0)
	
	# Handle touch/drag input
	if event is InputEventScreenTouch:
		if event.pressed:
			touch_start_position = event.position
			current_swipe = Vector2.ZERO
		else:
			touch_start_position = null
	elif event is InputEventScreenDrag:
		if touch_start_position != null:
			current_swipe = event.position - touch_start_position
			if current_swipe.length() >= min_swipe_distance:
				# Determine primary direction of swipe
				var abs_x = abs(current_swipe.x)
				var abs_y = abs(current_swipe.y)
				if abs_x > abs_y:
					# Horizontal swipe
					if current_swipe.x > 0 and direction.x != -1:
						next_direction = Vector2(1, 0)  # Right
					elif current_swipe.x < 0 and direction.x != 1:
						next_direction = Vector2(-1, 0)  # Left
				else:
					# Vertical swipe
					if current_swipe.y > 0 and direction.y != -1:
						next_direction = Vector2(0, 1)  # Down
					elif current_swipe.y < 0 and direction.y != 1:
						next_direction = Vector2(0, -1)  # Up
				touch_start_position = event.position
				current_swipe = Vector2.ZERO

func move() -> void:
	if !get_parent().game_active:
		return
		
	direction = next_direction
	var new_head = segments[0] + direction
	
	# Check for collisions
	if is_collision(new_head):
		game_over.emit()
		Logger.log_info("Game over - collision detected")
		return
	
	# Check berry collection
	var berry = get_parent().get_node("Berry")
	if berry and berry.check_collection(new_head):
		# Berry collected, don't remove tail
		segments.push_front(new_head)
	else:
		# Normal movement
		segments.push_front(new_head)
		segments.pop_back()
	queue_redraw()

func is_collision(pos: Vector2) -> bool:
	# Get viewport size in grid units
	var grid_width = int(get_viewport_rect().size.x / grid_size)
	var grid_height = int(get_viewport_rect().size.y / grid_size)
	
	# Check wall collision
	if pos.x < 0 or pos.x >= grid_width or pos.y < 0 or pos.y >= grid_height:
		Logger.log_warning("Wall collision detected at position: " + str(pos))
		return true
	
	# Check self collision (skip head)
	if pos in segments.slice(1):
		Logger.log_warning("Self collision detected at position: " + str(pos))
		return true
	
	return false

func grow() -> void:
	# Add new segment at the end of the snake
	segments.push_back(segments[-1])
	Logger.log_debug("Snake grew to " + str(segments.size()) + " segments")
	speed = max(0.05, speed * 0.95)  # Increase speed, but not faster than 0.05s

func _draw() -> void:
	# Draw snake segments
	for segment in segments:
		var rect = Rect2(
			segment * grid_size,
			Vector2(grid_size, grid_size)
		)
		draw_rect(rect, Color.GREEN)
