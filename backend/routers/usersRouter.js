const router = require("express").Router();
const usersController = require("../controllers/usersController");
const middleware = require('../utils/middlewares')


router.get('/',(req,res)=>{
    res.render('update-user')
})
router.get('/:id',middleware.isAuthenticated ,usersController.getUserInfo)
router.put('/:id',middleware.isAuthenticated ,usersController.updateUserInfo)
router.delete('/:id',middleware.isAuthenticated,usersController.deleteUser)


module.exports = router