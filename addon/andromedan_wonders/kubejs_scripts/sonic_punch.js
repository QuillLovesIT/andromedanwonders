StartupEvents.registry("palladium:abilities", event => { // CREDIT TO BEANS FOR THE SCRIPT, I ONLY TWEAKED A BIT
    event.create("andromedan_wonders:mob_pusher_modified")
        .icon(palladium.createItemIcon('minecraft:egg'))
        .documentationDescription('Pushes mobs in all directions, including up.')
        .addProperty("range", "float", 0.0, "Range of the ability")
        .addProperty("motion_scale", "float", 1.0, "Strength of the push")
        .addProperty("vertical_boost", "float", 0.5, "Vertical knockback amount")
        .tick((entity, entry, holder, enabled) => {
            if (!enabled) return;

            const motionscale = entry.getPropertyByName("motion_scale");
            const range = entry.getPropertyByName('range');
            const verticalBoost = entry.getPropertyByName('vertical_boost');

            // Get all entities within range
            const entities = entity.level.getEntities(null, entity.getBoundingBox().inflate(range));

            for (let target of entities) {
                if (target === entity) continue;

                const isProjectile = (typeof target.setDeltaMovement === 'function' &&
                                      typeof target.getDeltaMovement === 'function' &&
                                      (!target.isLiving || !target.isLiving()));
                const isLiving = target.isLiving && target.isLiving();
                if (!isProjectile && !isLiving) continue;

                // Calculate direction vector
                let direction = target.position().subtract(entity.position()).normalize();
                direction = direction.add(0, verticalBoost, 0); // add vertical push

                // Apply scaled motion
                const motion = direction.scale(motionscale);
                target.setDeltaMovement(motion);

                // If target is a player, sync motion with client
                if (target.isPlayer && target.isPlayer()) {
                    target.connection.send(new ClientboundSetEntityMotionPacket(target));
                }
            }
        });
});
