const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong: " + value);
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gend is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using this app.",
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
    },
    photoURL: {
      type: String,
      default: "http://example.com/default-photo.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid: " + value);
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this; // this represents the user document (It'll get jwt token for particular user)

  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER@dgvds", {
    expiresIn: "1h",
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
