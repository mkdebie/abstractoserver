const mongoose = require("mongoose");

const Recommendation = mongoose.model(
    "Recommendation",
    new mongoose.Schema({
        recommendation: String,
        guideline: String,
    })
);

module.exports = Recommendation;
