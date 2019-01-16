const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const passport =require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('session');

var app = express();

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:false}));


// const db= require('./models');  //need to set path

// app.post('/api/username/:addUsername',function(req,res,next){
//     if(!user){
//         db.users.create({userName:'Eric',email:'blin432@gmail.com',password:'asdfasf'})
//         .then(function(user){
//             console.log(user);
//         });
//     } else{
//         res.send(err);
//     }; 
// });

 


app.get('/login', function(req,res){
    res.render('login', {
        title : 'Login page'
    });
});

app.get('/', function(req, res) {
    res.render('home', {
        title : "Home"
    });
    
    
});

app.set('view engine', 'ejs');
app.set ('views','views/pages'); //need to set when path is defined


app.listen(3000,function(){
    console.log('listening on port 3000..');
});

app.use(express.static('public'));