const router = require("express").Router();
const usersController = require("../controllers/usersController");
const middleware = require('../utils/middlewares')


router.get('/',(req,res)=>{
    res.render('update-user')
})
router.get('/:id' ,usersController.getUserInfo)
router.put('/:id' ,usersController.updateUserInfo)
router.delete('/:id',usersController.deleteUser)


module.exports = router