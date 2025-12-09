const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("./middlewares/auth");

//Read cookie back
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // Checks the user is existed or not
    res.send(user); // Sending back the user data
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;