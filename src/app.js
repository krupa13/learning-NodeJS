require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const user = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try{
      await user.save();
      res.send("User Added Successfully");
    } catch(err) {
      res.status(400).send(err.message);
    }
});

//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId: userEmail});
        if(!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
        // const users = await User.find({emailId: userEmail});
        // if(users.length === 0) {
        //     res.status(404).send("User not found");
        // } else {
        //     res.send(users);
        // }
    } catch(err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
})

//Get user by ID
app.get("/user", async (req, res) => {
    const userId = req.body._id;

    try {
        const user = await User.findOneAndDelete({_id: userId});
        res.send(user);
    } catch(err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
})

//Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

//Update dat of the user
app.patch("/user", async (req, res) => {
    const userId = req.body._id;
    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate({_id: userId}, data, {
            runValidators: true
        });
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Error in updating user: " + err.message);
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