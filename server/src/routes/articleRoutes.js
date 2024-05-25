const router = require("express").Router();

// init controller
const articleCtrl = require("../controllers/articleController");

const passport = require("passport");
const middleware = passport.authenticate("jwt", { session: false });

// routers //
router.post("/create",  articleCtrl.createArticle);
router.put("/:id",  articleCtrl.updateArticle);
router.delete("/:id",  articleCtrl.deleteArticle);
router.get("/home",  articleCtrl.getAllArticles);
router.get("/:id",  articleCtrl.getAArticle);
router.put("/comment/:id",  articleCtrl.addComment);
router.put("/favorite/:id",  articleCtrl.addFavorite);

module.exports = router;
