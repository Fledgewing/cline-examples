extends Control

@onready var ammo_label = %Ammo
@onready var weapon = %Weapon

func _ready():
    if weapon:
        weapon.ammo_changed.connect(_on_ammo_changed)
        weapon.reload_started.connect(_on_reload_started)
        weapon.reload_finished.connect(_on_reload_finished)
        print_debug("UI connected to weapon signals")
    else:
        print_debug("Failed to find weapon")

func _on_ammo_changed(amount: int):
    if ammo_label:
        ammo_label.text = str(amount)
        print_debug("Ammo display updated: ", amount)

func _on_reload_started():
    if ammo_label:
        ammo_label.text = "R"
        print_debug("Reload started")

func _on_reload_finished():
    print_debug("Reload finished")
