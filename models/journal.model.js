const mongoose = require("mongoose");

const Journal = mongoose.model(
  "Journal",
  new mongoose.Schema({
    journal: String,
    issn: String,
  })
);

module.exports = Journal;