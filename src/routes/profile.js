const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validationEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

//Read cookie back
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // Checks the user is existed or not
    res.send(user); // Sending back the user data
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validationEditProfileData(req)) {
      throw new Error("Invalid edit request data.");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile has been successfully updated.`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Forgot Password API
profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { existingPassword, newPassword } = req.body || {};

    if (!existingPassword || !newPassword) {
      throw new Error("Both existing and new passwords are required.");
    }

    const isPasswordValid = await bcrypt.compare(
      existingPassword,
      loggedInUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Existing password is incorrect.");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not strong enough.");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;
    await loggedInUser.save();

    res.json({
      message: "Password has been successfully updated.",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
