const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the server.");
});

app.use("/hello", (req, res) => {
    console.log("Hellooooooooooo");
});

app.listen(3000, () => {
    console.log("server successfull");
});