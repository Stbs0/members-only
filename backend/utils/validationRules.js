const { body } = require("express-validator");
const db = require("../db/queries");
exports.signUpValidationRules = () => [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("must have a first name")
    .escape(),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("must have last name")
    .escape(),
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("must have username and at least 5 characters")
    .escape(),
  body("password").isLength({ min: 5 }),
  body("confirmPassword")
    .custom((value, { req }) => (value === req.body.password ? true : false))
    .withMessage("Passwords do not match"),
];

exports.joinClubRules = () => [
  body("club")
    .trim()
    .isLength({ min: 1 })
    .withMessage("must have a club")
    .escape(),
  body("passcode")
    .isLength({ min: 1 })
    .escape()
    .withMessage("must have a passcode")
    .custom(async (value) => {
      const passcode = await db.getClubPasscode(value);
      if (value !== passcode.passcode) {
        throw new Error("wrong passcode");
      }
      return true;
    }),
];
