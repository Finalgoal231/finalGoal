const router = require("express").Router();

// init middleware

// init controller
const categoryCtrl = require("../../controllers/adminControllers/categoryController");

// Admin - Category
router.post("/", categoryCtrl.createCategory);
router.put("/:id", categoryCtrl.updateCategory);
router.delete("/:id", categoryCtrl.deleteCategory);
router.get("/all", categoryCtrl.getAllCategory);

module.exports = router;
