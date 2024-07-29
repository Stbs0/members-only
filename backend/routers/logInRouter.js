const router  = require("express").Router()
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('log-in-form')
})
router.post('/',passport.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/' }))

module.exports = router
