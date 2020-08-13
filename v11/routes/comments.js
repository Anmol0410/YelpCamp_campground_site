var exp = require("express");
var router = exp.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");
//NEW ROUTE FOR COMMENTS
router.get("/campgrounds/:id/comments/new", middleware.isloggedin, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isloggedin, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    req.flash("error", "Something Went Wrong");
                    console.log(err);
                }
                else{
                    //add username and id to the comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added Comment");
                    res.redirect("/campgrounds/" + campground.id);
                }
            });
        }
    });
});

//Edit Route for Comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkcomment, function(req,res){
    var x = req.params.id;
    Campground.findById(req.params.id, function(err, foundcampground){
        if(err || !foundcampground){
            req.flash("error", "No Campground Found");
            return res.redirect("back");
        }
        else{
            Comment.findById(req.params.comment_id, function(err, foundcomment){
                res.render("comments/edit",{campground_id: x, comment: foundcomment});
            });
        }
    });
});

//Update Route For Comment
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkcomment, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundcomment){
        if(err){
            req.flash("error", "Comment Not Found");
            res.redirect("back");
        }
        else{
            req.flash("success", "Comment Updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Delete Route for Comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkcomment, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Comment Not Found");
            res.redirect("back");
        }
        else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;