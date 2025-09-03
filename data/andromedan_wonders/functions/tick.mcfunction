# get current broken blocks into delta
execute as @a store result score @s blocks_delta run scoreboard players get @s blocks_broken

# delta = current - old
scoreboard players operation @a blocks_delta -= @a old_blocks_broken

# set old = current for next tick
scoreboard players operation @a old_blocks_broken = @a blocks_broken

# add energy if blocks were mined this tick
execute as @a if score @s blocks_delta matches 1.. run scoreboard players add @s dig_meter 2
