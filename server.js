const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


const db= require('./models'); 
var app = express();

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));
app.use(session({secret:'password'}));
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.set ('views','views/pages'); 
app.use(express.static('views'));

app.get('/login', function(req,res){
    
    
}); 


app.get('/', function(req, res) {
    res.render('home',{
        title: "Home"
    });
}); 




passport.use(new LocalStrategy({usernameField:'email'},function(email,password,done){
    console.log('hi');
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
            res.json({status:'ok'});
        }).catch(function(err){
            console.log(err);
        });
    
});
// passport.authenticate('local'); endpoint will only run if logged in
app.post('/auth/login',passport.authenticate('local'),function(req,res,next){
    res.json({status:'okay'});
});


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


app.get('/auth/logout',function(req,res,next){
    req.logout();
})


 
app.put('/schedule/edit',function(req,res,next){
    console.log(req.body);
    users.update(
        {username:req.body.username},
        {where:req.params.edit}
    )
    .then(function(rowsUpdate){
        res.json(rowsUpdate)
    })
    .catch(next);

})





var PORT = process.env.PORT || 3000;
db.sequelize.sync().then(function(){
    app.listen(PORT,function(){ console.log('listening on port 3000');
    })
});






