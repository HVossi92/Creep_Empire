const doHarvest = require('function.harvest');
const doMove = require('function.move');

const roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    doMove.doMove(creep, targets[0]);
                }
            }
        } else {
            if (Game.spawns.Spawn1.energy > 250) {
                if (creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    doMove.doMove(creep, Game.spawns.Spawn1);
                }
            } else {
                doHarvest.doHarvest(creep);
            }
        }
    }
};

module.exports = roleBuilder;