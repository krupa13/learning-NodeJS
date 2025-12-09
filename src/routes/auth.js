const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("./utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //Validate the data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Login Check
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //Find user by email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Login Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //Create a JWT token
      const token = await user.getJWT();
      if (!token) {
        throw new Error("Token is invalid");
      }

      // Add the token to cookie and send response back
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000) // Expires in 1 hour
      });

      res.send("Login Successful");
    } else {
      throw new Error("Invalid Login Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;