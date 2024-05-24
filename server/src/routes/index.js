const express = require("express");

//init Routes

const authRoutes = require("./authRoute");
const adminRoutes = require("./adminRoutes/adminRoutes");
const shopRoutes = require("./eshopRoutes/sellerRoute");
const studyRoutes = require("./studyRoutes");
// email routes //

//routes container
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/shop", shopRoutes);
router.use("/study", studyRoutes);
// email routes con//

module.exports = router;
