const {CustomError} = require('../error/customError')


const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    else return res.status(500).json({msg: `Something went wrong!`})
}

module.exports = errorHandlerMiddleware