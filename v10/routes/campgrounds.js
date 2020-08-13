var exp = require("express");
var router = exp.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");
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
router.get("/campgrounds/new", middleware.isloggedin, function(req,res){
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
router.post("/campgrounds", middleware.isloggedin, function(req,res){
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

//Edit Campground Route
router.get("/campgrounds/:id/edit", middleware.check, function(req,res){
        Campground.findById(req.params.id,function(err, foundcampground){
                    res.render("campgrounds/edit",{campground: foundcampground});
        });
});

//UPDATE Campground Route
router.put("/campgrounds/:id", middleware.check, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Delete Campground Route
router.delete("/campgrounds/:id", middleware.check, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;