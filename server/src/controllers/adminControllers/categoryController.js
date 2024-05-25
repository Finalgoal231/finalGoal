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
  Category
    .findById(id)
    .then((category) => {
      category.delected = new Date();
      category
        .save()
        .then(res.status(201).json({ msg: "Category deleted successfully" }));
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

// make a controller for get all category
exports.getAllCategory = (req, res) => {
  userModel
    .find({ delected: null })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};
