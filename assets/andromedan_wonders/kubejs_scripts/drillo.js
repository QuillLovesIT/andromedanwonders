BlockEvents.broken(event => {
    if (event.block.hasTag('minecraft:mineable/pickaxe')) {
        if (palladium.superpowers.hasSuperpower(event.entity, 'andromedan_wonders:talpaedan')) {
            event.server.runCommandSilent(
                `scoreboard players add ${event.player.name.string} dig_meter 1`
            );
        }
    }
})