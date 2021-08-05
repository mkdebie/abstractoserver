const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/test/contacts/:username",
  [authJwt.verifyToken],
  controller.contactBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/users",
    [authJwt.verifyToken],
    controller.getUsers
  );

  app.get(
    "/api/test/invite/:username/:user",
    [authJwt.verifyToken],
    controller.inviteUser
  );

  app.get(
    "/api/test/acceptinvite/:username/:user",
    [authJwt.verifyToken],
    controller.acceptinvite
  )

  app.get(
    "/api/test/rejectinvite/:username/:user",
    [authJwt.verifyToken],
    controller.rejectInvite
  )

};