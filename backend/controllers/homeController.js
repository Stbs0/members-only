const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const homeController = asyncHandler( async (req, res,next) => {
    const messages = await db.getAllMessages()

    res.render("index", {messages,user:req.user})
    
})

module.exports = homeController