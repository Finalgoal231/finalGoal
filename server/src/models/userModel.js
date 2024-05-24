const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Must be provided username"],
  },
  name: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
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
    defaule: "public/default.jpg",
  },
  follower: [
    {
      username: {
        type: String,
      },
    },
  ],
  category: [{ type: mongoose.Schema.ObjectId }],
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

userSchema.method.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSalt(8), null);
};
userSchema.method.validPass = function (pass) {
  return bcrypt.compareSync(pass, this.pass);
};

module.exports = mongoose.model("User", userSchema);
