// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params);
//     //Save data to DB
//     res.send({firstName: "Krupa", lastName: "Nandh"});
// });

// app.post("/user", (req, res) => {
//     res.send("Post data saved successfully.");
// });

// app.delete("/user", (req, res) => {
//     res.send("Data deleted successfully.");
// });

// app.use(
//     "/user", 
//     [(req, res, next) => {
//         console.log("Handling user request 1");
//         //res.send("Response 1");
//         next();
//     },
//     (req, res, next) => {
//         console.log("Handling request 2");
//         //res.send("Response 2");
//         next();
//     }],
//     (req, res, next) => {
//         console.log("Handling request 3");
//         //res.send("Response 3");
//         next();
//     },
//     (req, res) => {
//         console.log("Handling request 4");
//         res.send("Response 4");
//     }
// );


// middlewares
// const { adminAuth, userAuth } = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.post("/user/login", (req, res) => {
//     res.send("User logged in");
// });

// app.get("/user/data", userAuth, (req, res) => {
//     res.send("User data accessed");
// });

// app.get("/admin/getAllData", (req, res) => {
//     res.send("Admin data set");
// });

// app.get("/admin/deleteData", (req, res) => {
//     res.send("Delete data");
// });