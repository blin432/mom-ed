const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


const db= require('./config/db.config.js'); 
const app = express();

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));
app.use(session({secret:'password'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set ('views','views/pages'); 

//EJS templating beings here//////////
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

app.get('/dashboard', function(req, res) {
    res.render('dashboard', {
        title : "Dashboard"
    });
});

 
//EJS templating stops here/////////

//passport usage begins here /////
passport.use(new LocalStrategy({usernameField:'email'},function(email,password,done){
    db.users.findAll({where:{email:email}}) //finding artist ID to print to console
        .then(function(results){
            var fetchedPw= results[0].dataValues.password;//console log results to see how to get password
            console.log(results[0].dataValues.password);
            var isPwMatch = bcrypt.compareSync(password,fetchedPw)//takes hash and compares it to password
            if (isPwMatch){
            console.log('match');
            done(null,results)
            }else{
            console.log("did not");
            done(null,false);
            }
            }).catch(function(err){
            console.log(err);
            done(null, false)//passing in false means "note a succsefull login"
            });  
}));

passport.serializeUser(function(user,done){
    done(null,{
        id: user.id,
        email:user.email
    });
});

passport.deserializeUser(function(cookie,done){
    db.users.findAll({where:{id:cookie.id}})
        .then(function(user){
            console.log(user);
            done(null,user)
        });
});

app.post('/auth/register',function(req,res,next){ //registers the user to database
    console.log(req.body);
        // req.isAuthenticated();  uses cookie and session to see if logged in or authenticated see function isAuthenticated
        var hashedPw=bcrypt.hashSync(req.body.password,10);
        db.users.create({username:req.body.username,email:req.body.email,password:hashedPw})
        .then(function(user){
            console.log(user);
            res.json({username:req.body.username,URL:'dashboard'}); ///res.json sends it back to front end 
        }).catch(function(err){
            console.log(err);
        });
    
});
// passport.authenticate('local'); endpoint will only run if logged in
app.post('/auth/login',passport.authenticate('local'),function(req,res,next){
    res.json({URL:'dashboard'});
});

// app.get('/auth/logout',function(req,res,next){
//     req.logout();
// });
// to check if people are logging in and show email on screen
// if not logged in will respond with null
// app.get('/auth/user',function(req,res,next){
//     res.json(req.user.email);

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.json({status:"no"})
    }
}
////passport usage ends here////



///dashboard "writing and pulling from database" to render schedules start here//////
 
app.put('/schedule/edit/:editTask/edit/:id',function(req,res,next){
    
    console.log(req.params);
    db.schedule.update(
        {name:req.params.editTask},
        {where:req.params.id}
    )
    .then(function(rowsUpdate){
        res.json(rowsUpdate)
    })
    .catch(next);
});

app.get('/schedule/get',function(req, res,next){
    db.schedule.findAll() 
        .then(function(results){
            res.json(results);
                
 });  
});

app.post('/schedule/post',function(req, res,next){

   
console.log(req.body);
    db.schedule.create({name:req.body.name,event:req.body.event,date:req.body.date})
        .then(function(user){
            console.log(user);
            res.json({username:req.body.name});
            return next(); ///res.json sends it back to front end 
        }).catch(function(err){
            console.log(err);
        });
});




app.delete('/schedule/delete/:id',function(req,res,next){ //registers the user to database
    console.log(req);
    console.log(req.body);
    console.log(req.params);
       
        db.schedule.destroy({
            where: {
               id: req.body.id //this will be your id that you want to delete
            }
            }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
            if(rowDeleted === 1){
              console.log('Deleted successfully');
            }
            }, function(err){
             console.log(err);

            });
});


//running the server to listen on "PORT"
var PORT = process.env.PORT || 3000;

db.sequelize.sync().then(function(){
    app.listen(PORT,function(){ 
        // console.log(`listening on port ${PORT}..`);
    });
});
