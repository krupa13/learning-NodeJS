const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
    // try{
        throw new error("ajdbf");
        res.send("user sent data");
    // } catch(err) {
    //     res.status(500).send("some error");
    // }
});

app.use("/", (err, req, res, next) => {
    if(err) {
        //log the err
        res.status(500).send("something went wrong");
    }
});

app.listen(3000, () => {
    console.log("server successfull");
});