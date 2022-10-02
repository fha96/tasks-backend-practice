'use strict';


module.exports = (userModel) => (req, res, next) => {
    let headers = req.headers.authorization.split(' ');
    let token = headers.pop();
    userModel.validateToken(token).then(resolve => {
        req.user = resolve;
        next();
    }).catch(rejected => {
        next(rejected);
    });
}