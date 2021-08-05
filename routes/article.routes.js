const { authJwt } = require("../middleware");
const controller = require("../controllers/article.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/article/:id", 
  [authJwt.verifyToken],
  controller.getAllArticles)


  app.get("/api/article/:id", 
  [authJwt.verifyToken],
  controller.getArticle)

  app.post(
    "/api/article/:id",
    [authJwt.verifyToken],
    controller.saveArticle
  );

  app.post(
    "/api/article/tag/:id",
    [authJwt.verifyToken],
    controller.saveTag
  );
};