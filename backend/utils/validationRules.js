const { body } = require("express-validator");
const db = require("../db/index");
const CustomError = require("../utils/ErrorClass");

exports.signUp = () => [
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

exports.logIn = () => [
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("must have username and at least 5 characters")
    .escape(),
  body("password").isLength({ min: 5 }),
];

exports.joinClub = () => [
  body("passcode")
    .isLength({ min: 1 })
    .withMessage("must have a passcode")
    .custom(async (value, { req }) => {
      const isPresent = req.user.clubs.includes(Number(req.params.clubId));
      if (isPresent) {
        throw new CustomError(400, "already joined");
      }
      const passcode = await db.getClubPasscode(req.params.clubId);
      if (!passcode) {
        throw new CustomError(500, "club not found");
      }
      if (value !== passcode) {
        throw new CustomError(400, "wrong passcode");
      }
      return true;
    }),
];
exports.createMessage = () => [
  body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("must have a message")
    .escape(),
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("must have a title")
    .escape(),
];
