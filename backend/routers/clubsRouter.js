const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");
const validation = require("../utils/validation");
const middlewares = require("../utils/middlewares");

router.post(
  "/:clubId/join",
  middlewares.isAuthenticated,
  validation.joinClub(),
  validation.validate,
  clubsController.joinClub,
);

module.exports = router;
