const router = require("express").Router();

// init middleware

// init controller
const categoryCtrl = require("../../controllers/adminControllers/categoryController");

// Admin - Category
router.post("/", categoryCtrl.create);
router.put("/:id", categoryCtrl.update);
router.delete("/:id", categoryCtrl.delete);
router.get("/all", categoryCtrl.getAll);

module.exports = router;
