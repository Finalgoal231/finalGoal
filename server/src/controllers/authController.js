const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const keys = require("../configs/keys");
const User = require("../models/userModel");

// make a controller for signup
exports.signup = (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save((err) => {
        if (err === null) {
          res.json({ msg: "Can not signup!" });
        } else res.status(201).json({ msg: "Success signup!" });
      });
    });
  });
};

// make a controller for signin
exports.signin = (req, res) => {
  let userEmail = req.body.email;
  let password = req.body.password;
  User.findOne({ email: userEmail }, (err, user) => {
    if (!user) {
      res.status(404).json({ msg: "Can not found user" });
    }
    console.log(user);
    bcrypt.compare(password, user.password).then((isMatch) => {
      console.log("match", isMatch);
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.status(200).json({
              user: user,
              success: true,
              token: token,
            });
          }
        );
      } else {
        res.status(400).json({ msg: "Incorrect password!" });
      }
    });
  });
};

// make a controller for admin
exports.defaultAdmin = (req, res) => {
  const adminData = keys.adminData;
  const AdminUser = new User(adminData);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(AdminUser.password, salt, (err, hash) => {
      AdminUser.password = hash;
      AdminUser.save((err) => {
        if (err) {
          console.log("---Can not create admin---");
        } else {
          console.log("---Create admin successfully.---");
        }
      });
    });
  });
};
