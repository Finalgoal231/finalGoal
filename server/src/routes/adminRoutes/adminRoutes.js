const router = require("express").Router();

// init middleware
const { requireAdmin } = require("../../middleware/authorization");

// init controller
const categoryCtrl = require("../../controllers/adminControllers/categoryController");
const userManageCtrl = require("../../controllers/adminControllers/userController");

// routers //
router.post("/cate/getAll", requireAdmin, categoryCtrl.getAll);
router.get("/cate/Aget/:id", requireAdmin, categoryCtrl.Aget);
router.post("/cate/create", requireAdmin, categoryCtrl.create);
router.put("/cate/update/:id", requireAdmin, categoryCtrl.update);
router.delete("/cate/delete/:id", requireAdmin, categoryCtrl.deleteCate);

router.get("/user/all", userManageCtrl.allUser);
router.get("/user/seller", userManageCtrl.getSeller);
router.put("/user/del/:id", userManageCtrl.permissionUser);
router.put("/changePass/:id", userManageCtrl.changePass);

module.exports = router;
