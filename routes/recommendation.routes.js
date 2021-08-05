const { authJwt } = require("../middleware");
const controller = require("../controllers/recommendation.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/recommendation",
    [authJwt.verifyToken],
    controller.saveRecommendation
  );
};
