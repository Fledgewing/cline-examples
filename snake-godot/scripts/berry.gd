extends Node2D

signal berry_collected

var grid_size = 20  # pixels per grid cell
var position_grid := Vector2.ZERO

func _ready() -> void:
	spawn_berry()

func spawn_berry() -> void:
	var valid_position = false
	
	# Get viewport size in grid units
	var grid_width = int(get_viewport_rect().size.x / grid_size)
	var grid_height = int(get_viewport_rect().size.y / grid_size)
	
	while !valid_position:
		# Generate random position
		position_grid = Vector2(
			randi_range(0, grid_width - 1),
			randi_range(0, grid_height - 1)
		)
		valid_position = !is_position_occupied(position_grid)
	
	# Update berry position
	position = position_grid * grid_size
	Logger.log_debug("Berry spawned at grid position: " + str(position_grid))
	queue_redraw()

func is_position_occupied(pos: Vector2) -> bool:
	# Get reference to snake (assuming it's a sibling node)
	var snake = get_parent().get_node("Snake")
	if snake and pos in snake.segments:
		return true
	return false

func check_collection(snake_head: Vector2) -> bool:
	if snake_head == position_grid:
		Logger.log_info("Berry collected at position: " + str(position_grid))
		berry_collected.emit()
		spawn_berry()
		return true
	return false

func _draw() -> void:
	# Draw berry as a red circle
	var center = Vector2(grid_size / 2, grid_size / 2)
	var radius = grid_size / 3
	draw_circle(center, radius, Color.RED)
