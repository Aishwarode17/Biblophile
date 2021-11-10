const app = require("./app");
const dotenv = require("dotenv");                 // importing dotenv
const connectDB = require('./database/database');

// To handle uncaught errors 

process.on("uncaughtException",(err)=>{
     console.log(`error : ${err}`);
     console.log("Closing the server coz of uncaught error");
     process.exit(1);
})


//config

dotenv.config({path:"backend/essentials/essentials.env"});       // Using essentials.env
                                                                // file using dotenv

//Database connection

connectDB();                 // to connect to database

// to listen or run the server at PORT

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running at port http://localhost:${process.env.PORT}`);
})

// To close the server when unhandled promise rejection error occurs

process.on("unhandledRejection", (error) =>{
    console.log(`Error: ${error.message}`); 
    console.log(`Closing the server coz of Unhandled Promise Rejection`);
  
    server.close(() => {
        process.exit(1);
      }); 
  });
  