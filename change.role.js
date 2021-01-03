const changeRole = {
    /** @param {Creep} creep **/
    run: function (creep, newRole) {
        creep.memory.role = newRole;
    }
};

module.exports = changeRole;