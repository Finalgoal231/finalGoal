const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../configs/config");
const User = require("../models/userModel");

// make a controller for signup
exports.signup = async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  newUser.password = await newUser.hide_pwd(req.body.password);
  await newUser.save((err) => {
    if (err) {
      res.status(500).json({
        message: "This error is" + err.message,
      });
    } else {
      res.status(201).json({
        message: "Create a new user successfully.",
      });
    }
  });
};

// make a controller for signin
exports.signin = async (req, res) => {
  try {
    console.log(req.body);
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
      } else
        res.status(401).json({
          message: "Password is incorrect.",
          user: user,
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for admin
exports.defaultAdmin = (req, res) => {
  const adminData = config.adminData;
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
