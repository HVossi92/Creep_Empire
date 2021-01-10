const doHarvest = require('function.harvest');
const doMove = require('function.move');
const roles = require('global.roles');

const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            doHarvest.doHarvest(creep);
        } else {
            if (_.filter(Game.creeps, (creep) => creep.memory.role == roles.transporter).length < 5) {
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        doMove.doMove(creep, targets[0]);
                    }
                }
                else{
                    doMove.doMove(creep, Game.spawns['Spawn1']);
                }
            } else {
                creep.drop(RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleHarvester;