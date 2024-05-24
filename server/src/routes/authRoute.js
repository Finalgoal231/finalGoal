const router = require("express").Router();

// init controller
const authCtrl = require("../controllers/authController");

// routers //
router.post("/signup", authCtrl.signup);
router.post("/signin", authCtrl.signin);

module.exports = router;
