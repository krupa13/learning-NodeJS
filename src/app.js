const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    //Creating new instance of the user model
    const user = new User({
        firstName: "Abhishek",
        lastName: "Mudimanchi",
        emailId: "abhi@gmail.com",
        password: "abhi@123",
    });

    try{
      await user.save();
      res.send("User Added Successfully");
    } catch(err) {
      res.status(400).send("Error in adding user: " + err.message);
    } 

});

connectDB()
    .then(() => {
        console.log("Database connection");
        app.listen(7777, () => {
            console.log("Server is successfully connected...");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected");
    });