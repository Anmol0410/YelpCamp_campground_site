var exp = require("express");
var router = exp.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
//NEW ROUTE FOR COMMENTS
router.get("/campgrounds/:id/comments/new", isloggedin, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", isloggedin, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to the comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground.id);
                }
            });
        }
    });
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