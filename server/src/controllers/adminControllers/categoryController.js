const mongoose = require("mongoose");

const Category = require("../../models/adminModel/categoryModel");

// make a controller for create a category
exports.create = (req, res) => {
  // let data = req.body;
  // Category.create(data, (err) => {
  //   if (err) {
  //     res.status(500).json({ msg: err.message });
  //   } else {
  //     res.status(201).json({ msg: "create category successfully." });
  //   }
  // });
};

// make a controller for get all category
exports.getAll = (req, res) => {
  // let searchData = req.body;
  // let query = {};
  // if (searchData.title) {
  //   query["title"] = { $regex: new RegExp(searchData.title, "i") };
  // }
  // Category.find(query)
  //   .sort({ createdAt: -1 })
  //   .exec((err, result) => {
  //     if (err) {
  //       res.status(500).json({ msg: err.message });
  //     } else {
  //       res.status(201).json({ result: result });
  //     }
  //   });
};

// make a controller for get a category
exports.Aget = (req, res) => {
  // let id = req.params.id;
  // Category.findById(id, (err, result) => {
  //   if (err) {
  //     res.status(500).json({ msg: err.message });
  //   } else {
  //     res.status(201).json({ result: result });
  //   }
  // });
};

// make a controller for update a category
exports.update = (req, res) => {
  // let id = req.params.id;
  // let data = req.body;
  // Category.findByIdAndUpdate(id, data, (err) => {
  //   if (err) {
  //     res.status(500).json({ msg: err.message });
  //   } else {
  //     res.status(201).json({ msg: "updated successfully." });
  //   }
  // });
};

// make a controller for deletea category
exports.deleteCate = (req, res) => {
  // let id = req.params.id;
  // Category.findByIdAndDelete(id, (err) => {
  //   if (err) {
  //     res.status(500).json({ msg: err.message });
  //   } else {
  //     res.status(201).json({ msg: "deleted successfully." });
  //   }
  // });
};
