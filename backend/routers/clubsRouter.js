const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");
const { validate, ...rules } = require("../utils/validation");
const { isAuthenticated } = require("../utils/middlewares");

router.post(
  "/:clubId/join",
  isAuthenticated(["site_admin", "club-admin"]),
  rules.joinClub(),
  validate,
  clubsController.joinClub,
);
router.get("/", clubsController.getClubs);

router.get("/:clubId", rules.paramsToInt(), clubsController.getClub);

router.post(
  "/",
  isAuthenticated(["site_admin", "user", "club-admin"]),
  rules.createClub(),
  validate,
  clubsController.createClub,
);
router.delete(
  "/:clubId",
  isAuthenticated(["site_admin", "club-admin"]),
  rules.deleteClub(),
  validate,
  clubsController.deleteClub,
);

router.get(
  "/:clubId/users",
  isAuthenticated(["site_admin", "club-admin"]),
  rules.isClubMember(),
  validate,
  clubsController.getClubMembers,
);

module.exports = router;
