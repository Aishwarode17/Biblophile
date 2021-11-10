const mongoose = require("mongoose");                  // importing mongoose
                                           
const itemSchema = new mongoose.Schema({               // defining database

    name:{
        type: String,
        required:[true,"Enter, the book name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Describe, the book"]
    },
    price:{
        type:Number,
        required:[true,"Please, enter the price"],
        maxlength:[6,"We cannot sell book worth more than 6 figures"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[{
        public_id: {
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
        
    }],
    category:{
        type:String,
        required:[true,"Enter, book category"],
    },
    stock:{
        type:Number,
        required:[true, "Please enter product stock"],
        maxlength:[4,"We must store less than ten thousand copies of a certain book"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    timeCreated:{
        type:Date,
        default:Date.now
    }
})


module.exports= mongoose.model("items",itemSchema);


