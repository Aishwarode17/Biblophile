const mongoose = require("mongoose");
const validator = require('validator');              // importing validator
const encryptPsw = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const crypto = require("crypto");          //using built in cyrpto package,to generate hashcode for security

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Enter name"],
      maxLength: [20, "Name should not have more than 30 characters"],
      minLength: [3, "Name must have more than 4 characters"],
    },
    email: {
      type: String, 
      required: [true, "Enter email"],
      unique: true,
      validate: [validator.isEmail, "Invalid email"],  // to check if the entered email is email
    },
    password: {         
      type: String,
      required: [true, "Enter the password"],
      minLength: [7, "Please enter a password having atleast 7 characters"],
      select: false,
    },
    profilePic: [{
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    }],

    designation: {                       // to check user is user or admin.
      type: String,
      default: "user",
    },
    createdAt: {                    // time of creation
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });

  //converting password to hash codes so that even the owner of database can't read 
  // password. WE are converting password into hash at the time of registering the user
  // in the database or saving the user.

  userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
      next();
    }
    this.password = await encryptPsw.hash(this.password, 10);
  });


// Jwt token generation and storing it in cookie. So that to specify which user can access
// route, i.e. user with designation of admin. ALso this will allow user to login right
// after registering  without the need to login after registering.

userSchema.methods.getToken =  () => {   // JWT_SECRET key must stay with the owner so that only owner can create admin accounts and control the site.
 
  return jwt.sign({"id":this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,        // In JWT_expire , the time after automatically logging out the user in its device is defined.

  }); 
};

// to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await encryptPsw.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");  //convertin random hex bytes to string

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")                // using sha256 algorithm desined by USA ,to genarate hash codes     
    .update(resetToken)        // we gonna update on sha256
    .digest("hex");            // to convert the resultant into string ,from the default returned object.

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;    // we will have 15 minutes to reset the password by clicking on token link

  return resetToken;
};



module.exports = mongoose.model("user",userSchema);
