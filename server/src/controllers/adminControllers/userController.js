const mongoose = require("mongoose");

const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

// make a controller for get all users
exports.allUser = (req, res) => {
  // userModel
  //   .find({})
  //   .sort({ createdAt: -1 })
  //   .then((result) => {
  //     res.status(201).json({ result: result });
  //   })
  //   .catch((err) => {
  //     res.status(400).json({ err: err });
  //   });
};

// make a controller for permission users
exports.permissionUser = (req, res) => {
  
};

// make a controller for change password
exports.changePass = (req, res) => {
  const id = req.params.id;
  // userModel.findById(id, (err, user) => {
  //   if (err) {
  //     res.status(404).json({ msg: "Can not find user" });
  //   } else {
  //     bcrypt.genSalt(10, (err, salt) => {
  //       bcrypt.hash(req.body.password, salt, (err, hash) => {
  //         console.log(hash);
  //         user.password = hash;
  //         user.save((err) => {
  //           if (err) {
  //             res.status(500).json({ msg: "Server error" });
  //           } else {
  //             res.status(200).json({ msg: "Change password successfully." });
  //           }
  //         });
  //       });
  //     });
  //   }
  // });
};

// make a controller for get seller
exports.getSeller = (req, res) => {
  // userModel.find({ role: "seller" }, (err, result) => {
  //   if (err) {
  //     res.status(404).json({ msg: "Can not find seller." });
  //   } else {
  //     res.status(200).json({ result: result });
  //   }
  // });
};
