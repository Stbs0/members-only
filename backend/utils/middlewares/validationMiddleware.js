const { body, validationResult } = require("express-validator");

const signUpValidationRules = () => [
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
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors.array());
  }
  next();
};

module.exports = { signUpValidationRules, validate };
