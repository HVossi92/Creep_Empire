const doMove = require('function.move');

const roleTransporter = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    doMove.doMove(creep, target);
                }
            }
        } else {
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
        }
    }
};

module.exports = roleTransporter;