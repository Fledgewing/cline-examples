extends Node

enum LogLevel {DEBUG, INFO, WARNING, ERROR}
var log_file: FileAccess

func _ready() -> void:
	init("user://snake_game.log")

func init(path: String) -> void:
	log_file = FileAccess.open(path, FileAccess.WRITE)
	log_info("Logger initialized")

func _exit_tree() -> void:
	if log_file:
		log_file.close()

func write_log(level: LogLevel, message: String) -> void:
	var timestamp = Time.get_datetime_dict_from_system()
	var log_message = "[%s] [%s]: %s\n" % [
		_format_timestamp(timestamp),
		LogLevel.keys()[level],
		message
	]
	
	if log_file:
		log_file.store_string(log_message)
	
	if OS.is_debug_build():
		print(log_message)

func log_debug(message: String) -> void:
	write_log(LogLevel.DEBUG, message)

func log_info(message: String) -> void:
	write_log(LogLevel.INFO, message)

func log_warning(message: String) -> void:
	write_log(LogLevel.WARNING, message)

func log_error(message: String) -> void:
	write_log(LogLevel.ERROR, message)

func _format_timestamp(datetime: Dictionary) -> String:
	return "%d-%02d-%02d %02d:%02d:%02d" % [
		datetime.year,
		datetime.month,
		datetime.day,
		datetime.hour,
		datetime.minute,
		datetime.second
	]
