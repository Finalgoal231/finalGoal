const router = require("express").Router();

// init middleware
const { requireAdmin } = require("../../middleware/authorization");

// init controller
const userManageCtrl = require("../../controllers/adminControllers/userController");

// Admin - Users
router.get("/all", userManageCtrl.allUser);
router.put("/role/:id", userManageCtrl.permissionUser);
router.delete("/:id", userManageCtrl.delUser);

// User - Profile
router.get("/:id", userManageCtrl.getUser);
router.put("/:id", userManageCtrl.changeInfo);
router.put("/password/:id", userManageCtrl.changePassword);
router.put("/avatar/:id", userManageCtrl.changeAvatar);

module.exports = router;
