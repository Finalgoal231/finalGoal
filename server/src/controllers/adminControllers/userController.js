const mongoose = require("mongoose");

const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

// make a controller for get all users
exports.allUser = (req, res) => {
  userModel
    .find({ delected: null })
    .sort({ createdAt: -1 })
    .then((users) => {
      res.status(201).json({ users: users });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Can't read Users Information" });
    });
};

// make a controller for permission users
exports.permissionUser = (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  userModel
    .findById(id)
    .then((user) => {
      user.role = role;
      user.save((err) => {
        if (err) {
          res.status(500).json({ msg: "Server error" });
        } else {
          res.status(200).json({ msg: "User role changed successfully." });
        }
      });
    })
    .catch(res.status(404).json({ msg: "Can not find user" }));
};

// make a controller for delete users
exports.delUser = (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((user) => {
      user.delected = new Date();
      user
        .save()
        .then(res.status(201).json({ msg: "User deleted successfully" }));
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

// make a controller for get a user
exports.getUser = (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((user) => {
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

// make a controller for change profile information
exports.changeInfo = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(id, req.body)
    .then(() => {
      res
        .status(200)
        .json({ msg: "Profile information changed successfully." });
    })
    .catch(() => {
      res.status(404).json({ msg: "Can not find user" });
    });
};

// make a controller for change password
exports.changePassword = (req, res) => {
  const id = req.params.id;
  const { currentPassword, newPassword } = req.body;
  userModel
    .findById(id)
    .then((user) => {
      if (user.show_pwd(currentPassword, user.password)) {
        user.password = newPassword;
        user
          .save()
          .then(() => {
            res
              .status(200)
              .json({ msg: "Profile information changed successfully." });
          })
          .catch(() => {
            res.status(500).json({ msg: "Server error" });
          });
      } else {
        res.status(401).json({ msg: "Don't Match Password" });
      }
    })
    .catch(() => {
      res.status(404).json({ msg: "Can not find user" });
    });
};

// make a controller for change password
exports.changeAvatar = (req, res) => {
  const id = req.params.id;
  const { avatar } = req.files;
  uploadPath = "C:\\Program Files\\gogs\\data\\avatars\\" + id;

  avatar.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    userModel
      .findById(id)
      .then((user) => {
        user.avatar = `http://192.168.6.2:3000/avatars/${id}`;
        user.save((err) => {
          if (err) {
            res.status(500).json({ msg: "Server error" });
          } else {
            res
              .status(200)
              .json({ msg: "Profile avatar changed successfully." });
          }
        });
      })
      .catch(() => {
        res.status(404).json({ msg: "Can not find user" });
      });
  });
};
