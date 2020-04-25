const express = require('express');
const routes = require('./routes/index');
const session = require('express-session');
const passport = require('passport');
const connection = require('./config/database');

const app = express();

const MongoStore = require('connect-mongo')(session);

require('./config/passport');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**-------SESSION SETUP---------------- */

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection:'sessions'
});
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}));





app.listen(3000, ()=>{
    console.log("SERVER IS RUNNING");
});