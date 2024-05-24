const mongoose = require("mongoose");

const Category = require("../../models/adminModel/categoryModel");

// make a controller for create a category
exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((err) => {
    if (err === null) {
      res.status(500).json({ msg: err.message });
    } else res.status(201).json({ msg: "create category successfully." });
  });
};

// make a controller for update a category
exports.updateCategory = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Category.findByIdAndUpdate(id, data, (err) => {
    if (err) {
      res.status(500).json({ msg: err.message });
    } else {
      res.status(201).json({ msg: "Updated successfully." });
    }
  });
};

// make a controller for deletea category
exports.deleteCategory = (req, res) => {
  let id = req.params.id;
  Category.findByIdAndDelete(id, (err) => {
    if (err) {
      res.status(500).json({ msg: err.message });
    } else {
      res.status(201).json({ msg: "deleted successfully." });
    }
  });
};

// make a controller for get all category
exports.getAllCategory = (req, res) => {
  let searchData = req.body;
  let query = {};
  if (searchData.title) {
    query["title"] = { $regex: new RegExp(searchData.title, "i") };
  }
  Category.find(query)
    .sort({ createdAt: -1 })
    .exec((err, result) => {
      if (err) {
        res.status(500).json({ msg: err.message });
      } else {
        res.status(201).json({ result: result });
      }
    });
};
