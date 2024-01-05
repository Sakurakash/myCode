const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require('../validator/userValidator');
const {getUser} = require('../service/userService');

function userValidate(data) {
    return ajv.validate(userSchema, data);
}

async function userExists(username){
    let users = await getUser(username);
    return users.length !== 0;
}

module.exports = {
    userValidate,
    userExists
}