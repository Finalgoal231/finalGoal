const router = require("express").Router();

// init controller
const articleCtrl = require("../controllers/articleController");

const passport = require("passport");
const middleware = passport.authenticate("jwt", { session: false });

// routers //
router.post("/create", middleware, articleCtrl.createArticle);
router.put("/:id", middleware, articleCtrl.updateArticle);
router.delete("/:id", middleware, articleCtrl.deleteArticle);
router.get("/home", articleCtrl.getHomeArticles);
router.get("/all", articleCtrl.getAllArticles);
router.get("/my", articleCtrl.getMyArticles);
router.get("/favorite", articleCtrl.getFavoriteArticles);
router.get("/draft", articleCtrl.getDraftArticles);
router.get("/:id", middleware, articleCtrl.getAArticle);
router.put("/comment/:id", middleware, articleCtrl.addComment);
router.put("/favorite/:id", middleware, articleCtrl.addFavorite);

module.exports = router;
