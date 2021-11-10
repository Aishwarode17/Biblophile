const handlingError = require("../utilities/handlingError");
const asyncError = require("./asyncError");
const jwt = require('jsonwebtoken');
const User = require('../prototype/userPrototype');

// to check if the user is logged in that is a user is authenticated or not
exports.isAuthenticatedUser = asyncError(async (req, res, next) => {
    
    const {token} = req.cookies;

    if(!token){
        return next(new handlingError("You need to login to continue and gain access", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData.exp,decodedData.iat);
    req.user = await User.findById(decodedData.id);
    console.log(req.user);
    next();
     
});

