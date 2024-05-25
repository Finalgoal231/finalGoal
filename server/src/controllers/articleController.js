const mongoose = require("mongoose");

const Article = require("../models/articleModel");

// make a controller for create a article
exports.createArticle = (req, res) => {
  const newArticle = new Article(req.body);
  newArticle.save((err) => {
    if (err === null) {
      res.status(500).json({ msg: err.message });
    } else res.status(201).json({ msg: "create article successfully." });
  });
};

// make a controller for update a article
exports.updateArticle = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Article.findByIdAndUpdate(id, data, (err) => {
    if (err) {
      res.status(500).json({ msg: err.message });
    } else {
      res.status(201).json({ msg: "Updated successfully." });
    }
  });
};

// make a controller for deletea article
exports.deleteArticle = (req, res) => {
  let id = req.params.id;
  Article
    .findById(id)
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
  let searchData = req.body;
  let query = {};
  if (searchData.title) {
    query["title"] = { $regex: new RegExp(searchData.title, "i") };
  }
  Article.find(query)
    .sort({ createdAt: -1 })
    .exec((err, result) => {
      if (err) {
        res.status(500).json({ msg: err.message });
      } else {
        res.status(201).json({ result: result });
      }
    });
};

// make a controller for get all article
exports.getAArticle = (req, res) => {
  let id = req.params.id;
  Article.findById(id).exec((err, article) => {
    if (err) {
      res.status(500).json({ msg: err.message });
    } else {
      res.status(201).json({ article: article });
    }
  });
};

// make a controller for get all article
exports.addComment = (req, res) => {
  let id = req.params.id;
  Article.findById(id).exec((err, article) => {
    if (err) {
      res.status(500).json({ msg: err.message });
    } else {
      article.comment.push(req.body);
      article
        .save()
        .then(res.status(201).json({ msg: "article" }))
        .catch((err) => {
          res.status(500).json({ msg: err.message });
        });
    }
  });
};

// make a controller for get all article
exports.addFavorite = (req, res) => {
  let id = req.params.id;
  Article.findById(id).exec((err, article) => {
    if (err) {
      res.status(500).json({ msg: err.message });
    } else {
      article.favorite.push(req.body);
      article
        .save()
        .then(res.status(201).json({ msg: "article" }))
        .catch((err) => {
          res.status(500).json({ msg: err.message });
        });
    }
  });
};
