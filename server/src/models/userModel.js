const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exist!"],
    required: [true, "Must be provided username"],
  },
  name: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
    default: "/assets/avatars/default.jpg",
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  category: [String],
  delected: {
    type: Date,
    default: null,
  },
  complete: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.hide_pwd = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

userSchema.methods.show_pwd = (reqPwd, dbPwd) => {
  return bcrypt.compareSync(reqPwd, dbPwd);
};

module.exports = mongoose.model("User", userSchema);
