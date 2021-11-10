const handlingError = require("../utilities/handlingError.js");

// watching error

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
  
    // To catch database id error (aka CastError)

    if (err.name === "CastError") {
      const message = `Data not found, (wrong ID,etc.) ${err.path}`;
      err = new handlingError(message, 400);
    }


    // Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new handlingError(message, 400);
    }

    
  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new handlingError(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new handlingError(message, 400);
  }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
      });
    };
