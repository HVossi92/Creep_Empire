const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transporter');

const roleRunner = {
    run: function () {
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
}

module.exports = roleRunner;