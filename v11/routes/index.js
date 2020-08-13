var exp = require("express");
var router = exp.Router();
var passport = require("passport");
var user = require("../models/user");
var middleware = require("../middleware/index");

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
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp : " + user.username);
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
    req.flash("success", "Successfully logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;