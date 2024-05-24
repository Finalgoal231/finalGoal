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
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  category: { type: mongoose.Schema.ObjectId },
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
  comment: [
    {
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
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
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
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleSchema);
