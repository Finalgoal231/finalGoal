const Article = require("../models/articleModel");

// make a controller for create a article
exports.createArticle = (req, res) => {
  const newArticle = new Article(req.body);
  newArticle
    .save()
    .then(() => {
      res.status(201).json({ msg: "create article successfully." });
    })
    .catch(() => {
      res.status(400).json({ msg: "Can't create article" });
    });
};

// make a controller for update a article
exports.updateArticle = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Article.findByIdAndUpdate(id, data)
    .then(() => {
      res.status(201).json({ msg: "Updated successfully." });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't update article" });
    });
};

// make a controller for deletea article
exports.deleteArticle = (req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .then((article) => {
      article.delected = new Date();
      article.save().then(res.status(201).json({ msg: "Article deleted successfully" }));
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

// make a controller for get all article
exports.getAllArticles = (req, res) => {
  console.log(req.query);
  Article.find({ delected: null, complete: true })
    .populate([
      {
        path: "from",
        select: "role avatar category delected complete _id name username follower createdAt",
      },
      {
        path: "favorite.favoritor",
        select: "role avatar category delected complete _id name username follower createdAt",
      },
      { path: "comment.ans" },
    ])
    .sort({ createdAt: -1 })
    .then((articles) => {
      res.status(201).json({ article: articles });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't get article" });
    });
};

// make a controller for get all article
exports.getHomeArticles = (req, res) => {
  Article.find({ delected: null, complete: true })
    .populate([
      {
        path: "from",
        select: "role avatar category delected complete _id name username follower createdAt",
      },
      {
        path: "favorite.favoritor",
        select: "role avatar category delected complete _id name username follower createdAt",
      },
      { path: "comment.ans" },
    ])
    .sort({ createdAt: -1 })
    .then((articles) => {
      res.status(201).json({ article: articles });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't get article" });
    });
};
// make a controller for get all article
exports.getAArticle = (req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .then((article) => {
      res.status(201).json({ article: article });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't get article" });
    });
};

// make a controller for get all article
exports.addComment = (req, res) => {
  let id = req.params.id;
  const newArticle = new Article({ ...req.body, parent: id });
  newArticle
    .save()
    .then(() => {
      res.status(201).json({ msg: "Add comment successfully." });
    })
    .catch(() => {
      res.status(400).json({ msg: "Can't add comment" });
    });

  //================ Can be ERROR ====================//

  Article.findById(id)
    .then((article) => {
      article.comment.push({ article: newArticle._id });
      article
        .save()
        .then(res.status(201).json({ msg: "article" }))
        .catch((err) => {
          res.status(500).json({ msg: "Can't do action article" });
        });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't add comment to this article" });
    });
};

// make a controller for get all article
exports.addFavorite = (req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .then((article) => {
      article.favorite.push({ user: req.body.from });
      article
        .save()
        .then(res.status(201).json({ msg: "Success" }))
        .catch((err) => {
          res.status(500).json({ msg: "Can't do action" });
        });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't do action article" });
    });
};
