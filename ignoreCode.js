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


// app.get("/getUserData", (req, res) => {
//     // try{
//         throw new error("ajdbf");
//         res.send("user sent data");
//     // } catch(err) {
//     //     res.status(500).send("some error");
//     // }
// });

// app.use("/", (err, req, res, next) => {
//     if(err) {
//         //log the err
//         res.status(500).send("something went wrong");
//     }
// });

//Get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     if (!user) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//     // const users = await User.find({emailId: userEmail});
//     // if(users.length === 0) {
//     //     res.status(404).send("User not found");
//     // } else {
//     //     res.send(users);
//     // }
//   } catch (err) {
//     res.status(400).send("Something went wrong: " + err.message);
//   }
// });

// //Get user by ID
// app.get("/user", async (req, res) => {
//   const userId = req.body._id;

//   try {
//     const user = await User.findOneAndDelete({ _id: userId });
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Something went wrong: " + err.message);
//   }
// });

// //Feed API - GET/feed - get all the users from the database
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Something went wrong: " + err.message);
//   }
// });

// //Update dat of the user
// app.patch("/user/:_id", async (req, res) => {
//   const userId = req.params?._id;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["skills", "about", "photoURL"];
//     const isAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isAllowed) {
//       throw new Error("Invlid updates!");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       runValidators: true,
//     });
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(400).send("Error in updating user: " + err.message);
//   }
// });