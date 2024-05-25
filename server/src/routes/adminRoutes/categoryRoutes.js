const router = require("express").Router();

// init middleware

// init controller
const categoryCtrl = require("../../controllers/adminControllers/categoryController");

const passport = require("passport");
const middleware = passport.authenticate("jwt", { session: false });

// Admin - Category
router.post("/", middleware, categoryCtrl.createCategory);
router.put("/:id", middleware, categoryCtrl.updateCategory);
router.delete("/:id", middleware, categoryCtrl.deleteCategory);
router.get("/all", middleware, categoryCtrl.getAllCategory);

module.exports = router;
