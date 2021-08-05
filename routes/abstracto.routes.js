const { authJwt } = require("../middleware");
const controller = require("../controllers/abstracto.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/abstracto/findbyid/:id",
    [authJwt.verifyToken],
    controller.convertxml
  );

  app.get(
    "/api/abstracto/journals/",
    // [authJwt.verifyToken],
    controller.getJournals
  );
  
  app.post(
    "/api/abstracto/journals/",
    [authJwt.verifyToken],
    controller.saveJournal)
};
