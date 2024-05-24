const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  detail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Category', categorySchema);
