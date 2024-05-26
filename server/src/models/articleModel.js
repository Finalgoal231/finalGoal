const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  favorite: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  category: { type: String },
  tags: [
    {
      type: String,
    },
  ],
  delected: {
    type: Date,
    default: null,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  parent: { type: mongoose.Schema.ObjectId, ref: "Article", default: null },
  comment: [
    {
      ans: {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleSchema);
