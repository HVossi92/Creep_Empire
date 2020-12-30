const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            let mySource = 0;
            for (let i = 0; i < sources.length; i++) {
                if (sources[i].id === creep.memory.sourceId)
                    mySource = i;
            }
            console.log(mySource);
            if (creep.harvest(sources[mySource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[mySource], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            if (true) {
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
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                creep.drop(RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleHarvester;