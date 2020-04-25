const express = require('express');
const mongoose = require('mongoose');
const session= require('express-session'); 

const MongoStore = require('connect-mongo')(session);

var app = express();

const dbString = "mongodb+srv://ecommerce:vanhelsing123@cluster0-hyyla.mongodb.net/tutorial_db?retryWrites=true&w=majority";
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection =  mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const storeSession = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(session({
    secret:'my secret',
    resave: true, 
    saveUninitialized: true,
    store: storeSession,
    cookie:{
        maxAge: 1000 * 60 * 60 *24
    }
}));

app.get('/', function(request, response, next){
    if(request.session.viewCount){
        request.session.viewCount = request.session.viewCount + 1;
    }else{
        request.session.viewCount = 1;
    }

    response.send(`<h1>You have visited this page ${request.session.viewCount} times</h1>`)
});

app.listen(3000, ()=>{
    console.log("SERVER IS ON--->>")
});