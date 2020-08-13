var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareobj = {};

middlewareobj.check = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundcampground){
            if(err || !foundcampground){
                req.flash("error", "Campground Not Found");
                res.redirect("back");
            }
            else{
                if(foundcampground.author.id.equals(req.user.id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareobj.checkcomment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundcomment){
            if(err || !foundcomment){
                req.flash("error", "Comment Not Found");
                res.redirect("back");
            }
            else{
                if(foundcomment.author.id.equals(req.user.id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareobj.isloggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "You Need to LogIn First!!");
        res.redirect("/login");
    }
}

module.exports = middlewareobj;