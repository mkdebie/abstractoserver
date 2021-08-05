const mongoose = require("mongoose");

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    pubId: Number,
    title: String,
    journal: String,
    pubDate: Date,
    firstAuth: String,
    userBookmarks: [],
    tags: [],
    abstract: String,
  })
);

module.exports = Article;