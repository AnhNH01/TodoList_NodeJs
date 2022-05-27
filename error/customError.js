
class CustomError extends Error {
    constructor (message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createNewCustomError = (msg, statCode) => {
    return new CustomError(msg, statCode)
}

module.exports = {CustomError, createNewCustomError}