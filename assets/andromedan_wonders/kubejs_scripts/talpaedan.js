PalladiumEvents.registerAnimations((event) => {
    event.register("etp/talpaedan", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "andromedan_wonders:talpaedan", "renderLayer")) {
            if (builder.isFirstPerson()) {
                builder.get("right_arm")
                    .setX(-2.4)
                    .setZ(6)
                    .scaleX(0.6)
                    .scaleY(0.6)
                    .scaleZ(0.6);
                    builder.get("left_arm")
                    .setX(1.3)
                    .setZ(6)
                    .scaleX(0.6)
                    .scaleY(0.6)
                    .scaleZ(0.6);
            }
            else {
                if (builder.getPlayer().isCrouching()) {
                    builder.get("head")
                        .moveZ(-4)
                        .moveY(-3.7);
                    builder.get("right_arm")
                        .setZ(-0.8)
                        .setY(-0.7);
                    builder.get("left_arm")
                        .setZ(-0.8) //negative = forwards
                        .setY(-0.7); //negative = higher placement
                    builder.get("right_leg")
                        .setY(10);
                    builder.get("left_leg")
                        .setY(10);
                    builder.get("chest")
                        .setY(-0.8);
                }
            }
        }
    });
});

ServerEvents.commandRegistry(event => {
    event.registerCommand("earth_shake_particles", ctx => {
        let server = ctx.source.server;

        // sound + tag once
        server.runCommandSilent("tag @s add AlienEvo.ScreenShake");

        // spawn particles repeatedly for 10 ticks
        for (let i = 0; i < 10; i++) {
            server.scheduleInTicks(i, () => {
                server.runCommandSilent("particle minecraft:explosion ~ ~1 ~ 2 1 2 0 50");
            });
        }

        return 1;
    });
});

ClientEvents.tick(event => {
    if (abilityUtil.hasPower(event.player, "andromedan_wonders:talpaedan")) {
        let burrow_rumbleEnabled = abilityUtil.isEnabled(event.player, "andromedan_wonders:talpaedan", "burrow_rumble");
        if (burrow_rumbleEnabled) {
            let mode = Client.options.getCameraType();
            if (mode !== 'third_person_back' && mode !== 'third_person_front') {
                event.player.persistentData.camera_reset = 1;
                Client.options.setCameraType('third_person_back');
            }
        } else {
            // if rumble turns off and camera was forced before, reset
            if (event.player.persistentData.camera_reset === 1) {
                event.player.persistentData.camera_reset = 0;
                Client.options.setCameraType('first_person');
            }
        }
    }
});