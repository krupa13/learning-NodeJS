const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://krupamr2795_db_user:nSrAokeXu1VnG8kh@krupadev.ux082xp.mongodb.net/devTinder"
    );
};

module.exports = connectDB;