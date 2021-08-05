const db = require("../models");
const Recommendation = db.Recommendation;
var mongoose = require('mongoose')

exports.saveRecommendation = (req,res) => {
    recommendation = new Recommendation ({
        recommendation: req.body.recommendation,
        guideline: req.body.guideline,
    })
    recommendation.save();
}