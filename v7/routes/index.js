var exp = require("express");
var router = exp.Router();
var passport = require("passport");
var user = require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});

//============
//Auth Routes
//============

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req,res){
});

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});


function isloggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;