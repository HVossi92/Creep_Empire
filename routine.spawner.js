const routineSpawner = {

    /** @param {Creep} creep **/
    run: function () {
        let harvester = 'harvester';
        let builder = 'builder';
        let upgrader = 'upgrader';
        let transporter = 'transporter';
        let standardRoleParts = [WORK, CARRY, MOVE];
        let transporterRoleParts = [CARRY, CARRY, MOVE];

        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }


        const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        doSpawnStandardRole(builders, 2, builder, standardRoleParts);

        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        doSpawnStandardRole(upgraders, 2, upgrader, standardRoleParts);

        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        doSpawnStandardRole(harvesters, 4, harvester, standardRoleParts);

        // const transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        // doSpawnStandardRole(transporters, 2, transporter, transporterRoleParts);

        if (Game.spawns['Spawn1'].spawning) {
            const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};

function doSpawnStandardRole(creepsPresent, max, roleName, roleParts) {
    if (creepsPresent.length < max) {
        const newName = roleName + "_" + Game.time;
        console.log('Spawning new: ' + roleName + " " + newName);
        Game.spawns['Spawn1'].spawnCreep(roleParts, newName,
            {memory: {role: roleName, sourceId: getSourceId(creepsPresent.length)}});
    }
}

function getSourceId(num){
    const sourcesAry = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    if (num <= 5)
        return sourcesAry[0].id;
}

module.exports = routineSpawner;