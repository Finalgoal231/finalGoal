const User = require("../../models/userModel");

// make a controller for get all users
exports.allUser = (req, res) => {
  User.find({ delected: null })
    .populate([{ path: "followers.user" }, { path: "following.user" }])
    .sort({ createdAt: -1 })
    .then((users) => {
      res.status(201).json({ users: users });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Can not read Users Information" });
    });
};

// make a controller for permission users
exports.permissionUser = (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  User.findById(id)
    .then((user) => {
      user.role = role;
      user
        .save()
        .then(() => {
          res
            .status(200)
            .json({ msg: "User role changed successfully.", role: role });
        })
        .catch(() => {
          res.status(500).json({ msg: "Server error" });
        });
    })
    .catch(res.status(404).json({ msg: "Can not find user" }));
};

// make a controller for delete users
exports.delUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      user.delected = new Date();
      user
        .save()
        .then(
          res.status(201).json({ msg: "User deleted successfully", user: user })
        );
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

// make a controller for get a user
exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(201).json({ user: user });
    })
    .catch(() => {
      res.status(400).json({ msg: "Can not find user." });
    });
};

// make a controller for change profile information
exports.changeInfo = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((user) => {
      res
        .status(200)
        .json({ msg: "Profile information changed successfully.", user: user });
    })
    .catch(() => {
      res.status(404).json({ msg: "Can not find user." });
    });
};

// make a controller for change password
exports.changePassword = (req, res) => {
  const id = req.params.id;
  const { currentPassword, newPassword } = req.body;
  User.findById(id)
    .then((user) => {
      if (user.show_pwd(currentPassword, user.password)) {
        user.password = newPassword;
        user
          .save()
          .then(() => {
            res.status(200).json({
              msg: "Profile information changed successfully.",
              user: user,
            });
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
  uploadPath = `C:\\Program Files\\gogs\\data\\avatars\\${id}.${avatar.name}`;

  avatar.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    User.findById(id)
      .then((user) => {
        user.avatar = `http://192.168.6.2:3000/avatars/${id}.${avatar.name}`;
        user
          .save()
          .then(() => {
            res
              .status(200)
              .json({ msg: "Profile avatar changed successfully." });
          })
          .catch(() => {
            res.status(500).json({ msg: "Server error" });
          });
      })
      .catch(() => {
        res.status(404).json({ msg: "Can not find user" });
      });
  });
};

exports.addFollower = (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  User.findById(id)
    .then((user) => {
      user.followers.push({ user: req.body.from });
      user
        .save()
        .then(() => {
          User.findById(req.body.from)
            .then((user) => {
              user.following.push({ user: id });
              user
                .save()
                .then(res.status(201).json({ msg: "Success" }))
                .catch((err) => {
                  res.status(500).json({ msg: "Can not follow this user" });
                });
            })
            .catch(() => {
              res.status(500).json({ msg: "Can not follow this user" });
            });
        })
        .catch((err) => {
          res.status(500).json({ msg: "Can not follow this user" });
        });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can not follow this user" });
    });
};
