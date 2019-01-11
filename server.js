var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set ('views','app/views'); //app.set (name.value)

const db= require('/');  //need to set path



app.listen(3000,function(){
    console.log('listening on port 3000..');
});

app.use(express.static('public'));