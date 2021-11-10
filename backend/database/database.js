const mongoose = require("mongoose");                       //importing mongoose

//creating a function to connect to the mogoDB database

const connectDB = ()=>{       
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,
        useUnifiedTopology:true}).then((data)=>{
            console.log(`mongodb is connected with server ${data.connection.host}`);
        })
} 

module.exports = connectDB;