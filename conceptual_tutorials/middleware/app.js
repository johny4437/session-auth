const express = require('express');

const app = express();

app.use(middleware2);
app.use(middleware1);

function middleware1(req, res, next){
    console.log(' I am middleware #1');
    
    next();
}
function middleware2(req, res, next){
    console.log('I am middleware #2');
    
    next();
}



app.get('/',(request, response, next)=>{
    console.log('standard middleware')
    response.send('<h1>Hello  World</h1>');
});

app.listen(3000);