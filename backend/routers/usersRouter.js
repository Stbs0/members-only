const router = require("express").Router();
const usersController = require("../controllers/usersController");
const validation = require("../utils/validation");

// router.get("/", (req, res) => {
//   res.render("update-user");
// });
router.get("/:id", usersController.getUserInfo);

router.put(
  "/:id",
  validation.updateUser(),
  validation.validate,
  usersController.updateUserInfo,
);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
