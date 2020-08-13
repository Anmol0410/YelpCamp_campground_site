var exp = require("express");
var app = exp();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp_v8",{ useNewUrlParser: true,  useUnifiedTopology: true});
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seeddb = require("./seeds");
var passport = require("passport");
var localstrategy = require("passport-local");
var user = require("./models/user");

var campgroundroutes = require("./routes/campgrounds");
var commentsroutes = require("./routes/comments");
var authroutes = require("./routes/index");
//Campground.create({
//    name: "Mountain Goat's Rest" , 
//    image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744075277bd4964fc3_340.jpg",
//    description: "This is a huge Granite hill"
//    },function(err,campground){
//        if(err){
//            console.log(err);
//        }
//        else{
//            console.log("newly created campground: ");
//            console.log(campground);
//        }
//});

//seeddb();
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(exp.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once Again Shraddha kapoor Won",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.currentuser = req.user;
    next();
});

app.use(campgroundroutes);
app.use(commentsroutes);
app.use(authroutes);

passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.listen(9999,function(){
    console.log("Server YelpCamp has started!!");
});

