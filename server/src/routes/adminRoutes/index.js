const express = require("express");

//init Routes

const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
// email routes //

//routes container
const router = express.Router();

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
// email routes con//

module.exports = router;
