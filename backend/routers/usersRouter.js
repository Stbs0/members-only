const router = require("express").Router();
const usersController = require("../controllers/usersController");
const { validate, ...rules } = require("../utils/validation");

const { isAuthenticated } = require("../utils/middlewares");

router.get("/:userId/clubs", isAuthenticated, usersController.getUserClubs);

router.get("/:id", isAuthenticated, usersController.getUserInfo);

router.put(
  "/:id",
  rules.updateUser(),
  validate,
  usersController.updateUserInfo,
);
router.delete("/:id",rules.deleteUser(), isAuthenticated, usersController.deleteUser);

module.exports = router;
