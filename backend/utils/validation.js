const { body, validationResult, oneOf, param } = require("express-validator");
const db = require("../db/index");
const CustomError = require("./ErrorClass");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(400, "invalid input", errors.array());
  }
  next();
};

const signUp = () => [
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
    .custom(async (value, { req }) => {
      if (req?.user) {
        throw new CustomError(400, "already logged in");
      }
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new CustomError(400, "username already exists");
      }
      return true;
    })
    .escape(),
  body("password").isLength({ min: 5 }),
  body("confirmPassword")
    .custom((value, { req }) => (value === req.body.password ? true : false))
    .withMessage("Passwords do not match"),
];

const logIn = () => [
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("must have username and at least 5 characters")
    .custom((value, { req }) => {
      if (req?.user) {
        throw new CustomError(400, "already logged in");
      }
      const user = db.getUserByUsername(value);
      if (!user) {
        throw new CustomError(400, "user not found");
      }

      return true;
    })
    .escape(),
  body("password").isLength({ min: 5 }),
];

const joinClub = () => [
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
  param("clubId")
    .isNumeric()
    .custom((value, { req }) => {
      if (!req.user.clubs.includes(value)) {
        throw new CustomError(400, "you are already joined");
      }
      return true;
    }),
];
const createMessage = () => [
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

  body("clubId")
    .isNumeric()
    .custom((value, { req }) => {
      if (!req.user.clubs.includes(value) || req.user.clubs.length === 0) {
        throw new CustomError(
          400,
          "you dont have permission to access this club",
        );
      }
      const clubExists = db.getClubById(value);
      if (!clubExists) {
        throw new CustomError(500, "club not found");
      }
      return true;
    }),
];

const updateUser = () => [
  body("firstName")
    .trim()
    .optional().notEmpty()
    .isString()
    .withMessage("must be a text")
    .escape(),
  body("lastName")
    .trim()
    .optional().notEmpty()
    .isString()
    .withMessage("must be a text")
    .escape(),
  body("username")
    .trim()
    .optional().notEmpty()
    .isLength({ min: 5 })
    .withMessage("must have username and at least 5 characters")
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new CustomError(400, "username already exists");
      }
      return true;
    }),
  param("id")
    .isNumeric()
    .custom(async (value, { req }) => {
      if (value !== req.user.id) {
        throw new CustomError(400, "cannot update others profile");
      }
      const user = await db.getUserById(value);
      if (!user) {
        throw new CustomError(400, "user not found");
      }
      return true;
    }),
];

module.exports = {
  validate,
  signUp,
  logIn,
  joinClub,
  createMessage,
  updateUser,
};
