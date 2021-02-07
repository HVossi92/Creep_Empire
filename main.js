const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transporter');
const routineSpawner = require('routine.spawner');
const structureTower = require('structure.tower');
const roleRunner = require('roleRunner');

module.exports.loop = function () {

    routineSpawner.run();
    roleRunner.run();
}