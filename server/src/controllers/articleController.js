const Article = require("../models/articleModel");
const User = require("../models/userModel");

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
      article
        .save()
        .then(res.status(201).json({ msg: "Article deleted successfully" }));
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

// make a controller for get all article
exports.getAllArticles = (req, res) => {
  console.log("getAllArticles", req.query);
  Article.find({ delected: null, complete: true })
    .populate([
      {
        path: "from",
        select:
          "role avatar category delected complete _id name username followers following createdAt",
      },
      {
        path: "favorite.user",
        select:
          "role avatar category delected complete _id name username follower createdAt",
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
exports.getMyArticles = (req, res) => {
  console.log("getMyArticles", req.query);
  const { from } = req.query;
  Article.find({ delected: null, complete: true, from: from })
    .populate([
      {
        path: "from",
        select:
          "role avatar category delected complete _id name username followers following createdAt",
      },
      {
        path: "favorite.user",
        select:
          "role avatar category delected complete _id name username follower createdAt",
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
exports.getDraftArticles = (req, res) => {
  console.log("getDraftArticles", req.query);
  const { from } = req.query;
  Article.find({ delected: null, complete: false, from: from })
    .populate([
      {
        path: "from",
        select:
          "role avatar category delected complete _id name username followers following createdAt",
      },
      {
        path: "favorite.user",
        select:
          "role avatar category delected complete _id name username follower createdAt",
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
exports.getFavoriteArticles = async (req, res) => {
  console.log("getFavoriteArticles", req.query);
  const { favorite } = req.query;
  const following = await User.findById(favorite);
  console.log(following);
  Article.find({ delected: null, complete: false })
    .populate([
      {
        path: "from",
        select:
          "role avatar category delected complete _id name username followers following createdAt",
      },
      {
        path: "favorite.user",
        select:
          "role avatar category delected complete _id name username follower createdAt",
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
      { path: "from" },
      { path: "favorite.user" },
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
    .populate([
      { path: "from" },
      { path: "favorite.user" },
      { path: "comment.ans" },
    ])
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
  console.log({ ...req.body, parent: id });
  console.log();
  console.log(newArticle);
  console.log();
  newArticle
    .save()
    .then(() => {
      Article.findById(id).then((article) => {
        article.comment.push({ ans: newArticle._id });
        article
          .save()
          .then(res.status(201).json({ msg: "article" }))
          .catch((err) => {
            res.status(500).json({ msg: "Can't do action article" });
          });
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
      let flag = false;
      article.favorite.map((item, index) => {
        if (item.user == req.body.from) {
          flag = true;
        }
      });
      if (flag) res.status(201).json({ msg: "Already like this article" });
      else {
        article.favorite.push({ user: req.body.from });
        article.save().then(res.status(201).json({ msg: "Success" }));
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Can not do action at this article" });
    });
};
