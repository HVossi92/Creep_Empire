function doMove(creep, target) {
    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    // console.log(creep.memory.lastPos);
}

module.exports.doMove = doMove;