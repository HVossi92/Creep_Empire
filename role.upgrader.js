const doHarvest = require('function.harvest');
const doMove = require('function.move');
const changeRole = require('change.role');
const roles = require('global.roles');

const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (_.filter(Game.creeps, (creep) => creep.memory.role == roles.harvester).length < 5) {
            changeRole.run(creep, roles.harvester);
            return;
        }

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                doMove.doMove(creep, creep.room.controller);
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

module.exports = roleUpgrader;