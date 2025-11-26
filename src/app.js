const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    //Save data to DB
    res.send({firstName: "Krupa", lastName: "Nandh"});
});

app.post("/user", (req, res) => {
    res.send("Post data saved successfully.");
});

app.delete("/user", (req, res) => {
    res.send("Data deleted successfully.");
});

app.listen(3000, () => {
    console.log("server successfull");
});