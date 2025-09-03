StartupEvents.registry('palladium:abilities', (event) => {
    event.create('andromedan_wonders:cone_wave')
        .icon(palladium.createItemIcon('minecraft:tnt'))
        .addProperty("radius", "float", 5.0, "Radius of the block wave effect")
        .addProperty("enableVisuals", "boolean", true, "Enable particle effects")
        .addProperty("isDestructionEnabled", "boolean", true, "Enable block breaking")
        .tick((entity, entry, holder, enabled) => {
            if (!enabled || !entity.isPlayer()) return;

            let radius = entry.getPropertyByName("radius");
            let enableVisuals = entry.getPropertyByName("enableVisuals");
            let isDestructionEnabled = entry.getPropertyByName("isDestructionEnabled");

            if (!enableVisuals) return;

            let footY = Math.floor(entity.y) - 1;
            let playerY = Math.floor(entity.y);

            // Forward vector from yaw
            let yawRad = (entity.yaw % 360) * (Math.PI / 180);
            let forwardX = -Math.sin(yawRad);
            let forwardZ = Math.cos(yawRad);

            for (let i = 1; i <= radius; i++) {
                // capture block coordinates safely
                let blockX = Math.floor(entity.x + forwardX * i);
                let blockZ = Math.floor(entity.z + forwardZ * i);

                entity.server.schedule(i, () => {
                    let block = entity.level.getBlock(blockX, footY, blockZ);
                    if (!block) return;

                    let blockId = block.getId();
                    if (blockId === "minecraft:air") return;

                    if (isDestructionEnabled) {
                        let fallingBlock = entity.level.createEntity("falling_block");
                        fallingBlock.setPosition(blockX + 0.5, footY, blockZ + 0.5);
                        fallingBlock.nbt.BlockState = { Name: blockId };
                        block.set("air");
                        fallingBlock.spawn();
                        fallingBlock.setMotion(0, 0.25, 0);
                    }

                    entity.level.spawnParticles(
                        'block ' + blockId,
                        true,
                        blockX + 0.5,
                        playerY + 0.5,
                        blockZ + 0.5,
                        0.2, 0.4, 0.2,
                        5, // low particle count for testing
                        0.1
                    );
                });
            }
        });
});
