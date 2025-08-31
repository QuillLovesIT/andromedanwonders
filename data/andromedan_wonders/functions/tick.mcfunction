# Start with 0
scoreboard players set @a dig_meter 0

# Add all block objectives
execute as @a run scoreboard players operation @s dig_meter += @s dig_stone
execute as @a run scoreboard players operation @s dig_meter += @s dig_cobblestone
execute as @a run scoreboard players operation @s dig_meter += @s dig_tuff
execute as @a run scoreboard players operation @s dig_meter += @s dig_andesite
execute as @a run scoreboard players operation @s dig_meter += @s dig_granite
execute as @a run scoreboard players operation @s dig_meter += @s dig_diorite
execute as @a run scoreboard players operation @s dig_meter += @s dig_deepslate
execute as @a run scoreboard players operation @s dig_meter += @s dig_blackstone
execute as @a run scoreboard players operation @s dig_meter += @s dig_cobbled_deepslate
execute as @a run scoreboard players operation @s dig_meter += @s dig_basalt
execute as @a run scoreboard players operation @s dig_meter += @s dig_netherrack

execute as @a if score @s dig_meter matches 1.. if score @s dig_reward matches 0..0 run function andromedan_wonders/mine_block

execute as @a if score @s dig_meter matches 1.. if score @s dig_reward matches 0..0 run scoreboard players set @s dig_reward 1
