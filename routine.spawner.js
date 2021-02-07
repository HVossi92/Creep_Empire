const roles = require('global.roles');

const routineSpawner = {

    /** @param {Creep} creep **/
    run: function () {
        let standardRoleParts = [WORK, CARRY, MOVE];
        let transporterRoleParts = [CARRY, CARRY, MOVE];

        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        if (Game.spawns['Spawn1'].memory.spawnRotation == null || Game.spawns['Spawn1'].memory.spawnRotation == undefined)
            Game.spawns['Spawn1'].memory.spawnRotation = 0;

        if(_.filter(Game.creeps, (creep) => creep.memory.role == roles.harvester).length < 5)
            Game.spawns['Spawn1'].memory.spawnRotation = 0;

        switch (Game.spawns['Spawn1'].memory.spawnRotation) {
            case 0:
                const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roles.harvester);
                doSpawnStandardRole(harvesters, 15, roles.harvester, standardRoleParts);
                break;
            case 1:
                const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == roles.upgrader);
                doSpawnStandardRole(upgraders, 4, roles.upgrader, standardRoleParts);
                break;
            case 2:
                const builders = _.filter(Game.creeps, (creep) => creep.memory.role == roles.builder);
                doSpawnStandardRole(builders, 10, roles.builder, transporterRoleParts);
                break;
            case 3:
                if (_.filter(Game.creeps, (creep) => creep.memory.role == roles.harvester).length < 20)
                    break;
                const transporters = _.filter(Game.creeps, (creep) => creep.memory.role == roles.transporter);
                doSpawnStandardRole(transporters, 12, roles.transporter, standardRoleParts);
                break;
            default:
                Game.spawns['Spawn1'].memory.spawnRotation = 0;
                break;
        }
        Game.spawns['Spawn1'].memory.spawnRotation++;


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
        Game.spawns['Spawn1'].spawnCreep(roleParts, newName,
            {memory: {role: roleName,
                    sourceId: getSourceId(creepsPresent.length),
                    lastPos: [0 , 0],
                    building: false}});
    }
}

function getSourceId(num) {
    const sourcesAry = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    if (num < 3)
        return sourcesAry[0].id;
    if (num < 10)
        return sourcesAry[1].id;
    if (num < 20)
        return sourcesAry[3].id;
    if (num < 30)
        return sourcesAry[2].id;
}

module.exports = routineSpawner;