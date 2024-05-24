const router = require("express").Router();

// init controller
const articleCtrl = require("../controllers/articleController");

// routers //
router.post("/article/create", articleCtrl.createArticle);
router.put("/article/:id", articleCtrl.updateArticle);
router.delete("/article/:id", articleCtrl.deleteArticle);
router.get("/articles/home", articleCtrl.getAllArticles);
router.get("/article/:id", articleCtrl.getAArticle);
router.put("/article/comment/:id", articleCtrl.addComment);
router.put("/article/favorite/:id", articleCtrl.addFavorite);

module.exports = router;
