const adminAuth = (req, res, next) => {
    console.log("Admin auth middleware called");
    const token = "xyz";
    const isAdminAUthorized = token === "xyz";
    if(!isAdminAUthorized) {
        return res.status(401).send("Unauthorized: Admin access required");
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User admin middleware called");
    const token = "abc";
    const isUserAuthorized = token === "abc";
    if(!isUserAuthorized) {
        return res.status(401).send("Unauthorized: User access required");
    } else {
        next();
    }
}

module.exports = {adminAuth, userAuth};