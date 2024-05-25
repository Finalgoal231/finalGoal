const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  delected: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Category', categorySchema);
