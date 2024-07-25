const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')

signUpValidationRules = [
    body("first name").trim().isLength({min: 1}).escape(),
    body("last name").trim().isLength({min: 1}).escape(),
    body("username").trim().isLength({min: 5}).escape(),
    body("password").isLength({min: 5}),
]
const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return next(errors.array())
    }
    
}