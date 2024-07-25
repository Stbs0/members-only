const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("erro medil",err)
    if (typeof err === "array") {
        res.status(400).send({errors: err.map((e) => e.msg)});
    }
    next(err)
};
module.exports = errorHandlerMiddleware