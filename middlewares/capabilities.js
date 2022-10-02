


module.exports = (capabilities) => (req, res, next) => {
    
    if(req.user.capabilities.includes(capabilities)){
        next();
    } else {
        next('Not Authorized');
    }

}