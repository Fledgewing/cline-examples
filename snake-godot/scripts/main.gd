extends Node2D

var score := 0
var high_score := 0
var game_active := true

# UI elements
@onready var score_label = $ScoreLabel
@onready var game_over_label = $GameOverLabel
@onready var snake = $Snake
@onready var berry = $Berry

func _ready() -> void:
	# Initialize game
	randomize()
	load_high_score()
	update_score_label()
	game_over_label.hide()
	
	# Connect signals
	snake.game_over.connect(_on_game_over)
	berry.berry_collected.connect(_on_berry_collected)
	
	Logger.log_info("Game initialized")

func _input(event: InputEvent) -> void:
	if !game_active and event is InputEventKey and event.pressed and !event.echo:
		restart_game()
		get_viewport().set_input_as_handled()

func _on_berry_collected() -> void:
	score += 10
	if score > high_score:
		high_score = score
		save_high_score()
	update_score_label()
	snake.grow()
	Logger.log_info("Score increased to: " + str(score))

func _on_game_over() -> void:
	game_active = false
	game_over_label.show()
	Logger.log_info("Game Over - Final Score: " + str(score))

func restart_game() -> void:
	if game_active:
		return
		
	# Reset game state
	score = 0
	game_active = true
	update_score_label()
	game_over_label.hide()
	
	# Remove old nodes
	if is_instance_valid(snake):
		snake.queue_free()
	if is_instance_valid(berry):
		berry.queue_free()
	
	# Wait for nodes to be freed
	await get_tree().process_frame
	
	# Create new instances
	snake = preload("res://scenes/snake.tscn").instantiate()
	berry = preload("res://scenes/berry.tscn").instantiate()
	
	add_child(snake)
	add_child(berry)
	
	# Reconnect signals
	snake.game_over.connect(_on_game_over)
	berry.berry_collected.connect(_on_berry_collected)
	
	Logger.log_info("Game restarted")

func update_score_label() -> void:
	score_label.text = "Score: %d\nHigh Score: %d" % [score, high_score]

func save_high_score() -> void:
	var save_file = FileAccess.open("user://highscore.save", FileAccess.WRITE)
	if save_file:
		save_file.store_var(high_score)
		Logger.log_info("High score saved: " + str(high_score))

func load_high_score() -> void:
	if FileAccess.file_exists("user://highscore.save"):
		var save_file = FileAccess.open("user://highscore.save", FileAccess.READ)
		if save_file:
			high_score = save_file.get_var()
			Logger.log_info("High score loaded: " + str(high_score))
