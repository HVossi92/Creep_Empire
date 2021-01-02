const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transporter');
const routineSpawner = require('routine.spawner');

module.exports.loop = function () {

    let rooms;
    for (let i = 0; i < Game.rooms.length; i++) {
        rooms[i] = Game.rooms[i];
    }
    let tower;
    if (rooms != undefined && rooms.length > 0)
        towers = rooms.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});


    routineSpawner.run();

    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }

        if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
    }
}