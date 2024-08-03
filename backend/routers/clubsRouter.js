const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");
const { validate, ...rules } = require("../utils/validation");
const { isAuthenticated } = require("../utils/middlewares");


router.get("/", clubsController.getClubs);

router.get("/:clubId", rules.paramsToInt(), clubsController.getClub);

router.get(
  "/:clubId/users",
  isAuthenticated,
  rules.isClubMember(),
  validate,
  clubsController.getClubMembers,
);

router.post(
  "/",
  isAuthenticated,
  rules.createClub(),
  validate,
  clubsController.createClub,
);

router.post(
  "/:clubId/join",
  isAuthenticated,
  rules.joinClub(),
  validate,
  clubsController.joinClub,
);
router.delete(
  "/:clubId",
  isAuthenticated,
  rules.deleteClub(),
  validate,
  clubsController.deleteClub,
);



module.exports = router;
