const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../configs/config");
const User = require("../models/userModel");

// make a controller for signup
exports.signup = async (req, res) => {
  const newUser = new User(req.body);
  newUser.password = await newUser.hide_pwd(req.body.password);
  newUser
    .save()
    .then(() => {
      res.status(201).json({
        msg: "Create a new user successfully.",
      });
    })
    .catch(() => {
      res.status(500).json({
        msg: "Please enter again your infomation correctly",
      });
    });
};

// make a controller for signin
exports.signin = async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res
        .status(404)
        .json({ msg: `Not found user with id: ${username}` });
    } else {
      if (user.show_pwd(password, user.password)) {
        const { username, password } = user;
        jwt.sign(
          { username, password },
          config.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.status(202).json({
              msg: "Login Success!",
              token: token,
              user: user,
              status: true,
            });
          }
        );
      } else {
        res.status(401).json({
          message: "Password is incorrect.",
          user: user,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// make a controller for admin
exports.defaultAdmin = async (req, res) => {
  const adminData = config.adminData;
  const AdminUser = new User(adminData);
  AdminUser.password = await AdminUser.hide_pwd(adminData.password);

  AdminUser.save()
    .then(() => console.log("---Create admin successfully.---"))
    .catch(() => {
      console.log("---Can not create admin---");
    });
};
