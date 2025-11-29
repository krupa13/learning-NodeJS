require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try{
      await user.save();
      res.send("User Added Successfully");
    } catch(err) {
      res.status(400).send("Error in adding user: " + err.message);
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