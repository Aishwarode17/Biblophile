class handlingError extends Error{
    
//class to handle errors

    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
    
}

module.exports = handlingError ;

