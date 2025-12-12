const validator = require("validator");

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName) {
        throw new Error("Username is not valid!");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough!");
    }
}

const validationEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "password",
        "gender",
        "about",
        "photoURL",
        "skills"
    ];

    // Let us loop through req.body keys and check are these things matching the criteria
    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
    );

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validationEditProfileData
}