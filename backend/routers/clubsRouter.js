const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");
const { validate, ...rules } = require("../utils/validation");
const middlewares = require("../utils/middlewares");

router.post(
  "/:clubId/join",
  middlewares.isAuthenticated,
  rules.joinClub(),
  validate,
  clubsController.joinClub,
);
router.get("/", clubsController.getClubs);

router.get("/:clubId",rules.paramsToInt(),  clubsController.getClub);
module.exports = router;
