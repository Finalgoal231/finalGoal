const router = require("express").Router();

// init middleware
const { requireAdmin } = require("../../middleware/authorization");

// init controller
const userManageCtrl = require("../../controllers/adminControllers/userController");

const passport = require("passport");
const middleware = passport.authenticate("jwt", { session: false });

// Admin - Users
router.get("/all", middleware, userManageCtrl.allUser);
router.put("/role/:id", middleware, userManageCtrl.permissionUser);
router.delete("/:id", middleware, userManageCtrl.delUser);

// User - Profile
router.get("/:id", middleware, userManageCtrl.getUser);
router.put("/:id", middleware, userManageCtrl.changeInfo);
router.put("/password/:id", middleware, userManageCtrl.changePassword);
router.put("/avatar/:id", middleware, userManageCtrl.changeAvatar);

module.exports = router;
