const express = require("express");
const requestRouter = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("./middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sent you a connection request.");
  } catch(err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = requestRouter;
