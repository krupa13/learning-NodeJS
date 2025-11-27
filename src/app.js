const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
    res.send("User logged in");
});

app.get("/user/data", userAuth, (req, res) => {
    res.send("User data accessed");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("Admin data set");
});

app.get("/admin/deleteData", (req, res) => {
    res.send("Delete data");
});

app.listen(3000, () => {
    console.log("server successfull");
});