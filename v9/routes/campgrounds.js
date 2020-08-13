var exp = require("express");
var router = exp.Router();
var Campground = require("../models/campground");
//INDEX ROUTE
router.get("/campgrounds",function(req,res){
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{camp: allcampgrounds, currentuser: req.user});
        }
    });
});

//NEW ROUTE
router.get("/campgrounds/new", isloggedin, function(req,res){
    res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/campgrounds/:id",function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground: foundcampground});
        }
    });
});

//CREATE ROUTE
router.post("/campgrounds", isloggedin, function(req,res){
    var name = req.body.name;
    var imag = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newcamp = {name: name, image: imag, description: desc, author: author};
    Campground.create(newcamp, function(err, newly){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

//middleware
function isloggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;