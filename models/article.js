const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  owner: {
    required: true,
    type: String,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
