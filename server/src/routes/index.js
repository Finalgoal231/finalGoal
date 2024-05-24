const express = require("express");

//init Routes

const authRoutes = require("./authRoute");
const adminRoutes = require("./adminRoutes/adminRoutes");
// email routes //

//routes container
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
// email routes con//

module.exports = router;
