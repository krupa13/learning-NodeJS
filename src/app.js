require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER@dgvds", {
        expiresIn: "1h",
      });
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

//Read cookie back
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // Checks the user is existed or not
    res.send(user); // Sending back the user data
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sent you a connection request.");
  } catch(err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

console.log("Attempting to connect to MongoDB...");
connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(7777, () => {
      console.log("Server is successfully connected...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
