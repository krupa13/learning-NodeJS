const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        //read the token from cookies
        const { token } = req.cookies;
        if(!token) { throw new Error("Token is not valid"); }
        
        const decodeObj = await jwt.verify(token, "DEV@TINDER@dgvds");
        //If I get the decodeobj, then only i will the _id and user allwoed to process
        const { _id } = decodeObj;
        const user = await User.findById(_id);
        if(!user) { throw new Error("User not found"); }
        req.user = user; //Whatever the user we have found in the database, we're attaching it to the req object
        next(); //Next is called to move to the next middleware or route handler
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = {userAuth};