const express = require("express");          // importing express
const app = express();
const cookieParser = require('cookie-parser');

const errorMiddleware = require("./middleware/error");     // importing error middleware

app.use(express.json());
app.use(cookieParser());

// ROute imports

const items = require("./route/itemRoute");
const user = require('./route/userRoute')

app.use('/api/v1',items);
app.use('/api/v1',user);

// Error middleware

app.use(errorMiddleware);    

module.exports = app;