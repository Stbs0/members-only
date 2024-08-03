const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");
const { validate, ...rules } = require("../utils/validation");
const { isAuthenticated } = require("../utils/middlewares");

router.post(
  "/:clubId/join",
  isAuthenticated,
  rules.joinClub(),
  validate,
  clubsController.joinClub,
);
router.get("/", clubsController.getClubs);

router.get("/:clubId", rules.paramsToInt(), clubsController.getClub);

router.post(
  "/",
  isAuthenticated,
  rules.createClub(),
  validate,
  clubsController.createClub,
);
router.delete(
  "/:clubId",
  isAuthenticated,
  rules.deleteClub(),
  validate,
  clubsController.deleteClub,
);

router.get(
  "/:clubId/users",
  isAuthenticated,
  rules.isClubMember(),
  validate,
  clubsController.getClubMembers,
);

module.exports = router;
