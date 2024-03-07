'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    ajv : {
        enable: true,
        package: 'egg-ajv',
    },
    sequelize : {
        enable: true,
        package: 'egg-sequelize',
    }
};
