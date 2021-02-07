const routineSpawner = require('routine.spawner');
const roleRunner = require('roleRunner');

module.exports.loop = function () {
    routineSpawner.run();
    roleRunner.run();
}