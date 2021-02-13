function doHarvest (creep) {
//TODO: Fix do harvest method. Not working at all.
    const sources = creep.room.find(FIND_SOURCES);
    let mySource = 0;
    for (let i = 0; i < sources.length; i++) {
        if (sources[i].id === creep.memory.sourceId)
            mySource = i;
    }

    if (creep.harvest(sources[mySource]) < 1) {
        creep.moveTo(sources[mySource], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

module.exports.doHarvest = doHarvest;