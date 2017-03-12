var app = angular.module("myApp", ["ui.router"]);

var path = require('path');
var mongoose = require('mongoose');
var express = require('express');

var app = express();

//all environments
//app.set('port',process.env.PORT || 8081);
app.use(express.static(__dirname + '/static'));
app.set('view engine','jade');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://localhost/Flowers');

var Schema = mongoose.Schema({
    name   : String,
	pwd    : String,
	email  : String,
	address: String,
	contact: Number
});
 
 var user = mongoose.model('users',Schema);
 
 app.post('/new',function(req,res){
  new user({
     name   : req.body.name,
	 pwd    : req.body.pwd,
	 email  : req.body.email,
	 address: req.body.address,
	 contact: req.body.contact
  }).save(function(err,doc){
       if(err) res.json(err);
	   else {
	   	var que = 'Succesfully signed up';
        app.config(function($stateProvider, $urlRouterProvider){
         $stateProvider
         .state("signup", {
          url: "/main",
          templateUrl: "./main.html"
  })
         .state("login", {
           url: "/main",
           templateUrl: "./main.html"
  })
});

	   }
	   //	res.send('Successfully signed up');

  })
 });

var server = app.listen(8081)
