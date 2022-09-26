'use strict';

const base64 = require('base-64');

module.exports = (userModel) => (req, res, next) => {
    console.log(req.headers.authorization);
    try {
    let headers = req.headers.authorization.split(' ');
    let encoded = headers.pop();
    let decoded = base64.decode(encoded).split(':');
    const [userName, password] = decoded;
    userModel.authenticateBasic(userName,password).then((resolve) => {
        req.user = resolve;
        next();
    })
    .catch(rejected => next(rejected));
    } catch (error) {
        next('Invalid Login');
    }
}