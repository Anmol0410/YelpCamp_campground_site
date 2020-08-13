var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareobj = {};

middlewareobj.check = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundcampground){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundcampground.author.id.equals(req.user.id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}

middlewareobj.checkcomment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundcomment){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundcomment.author.id.equals(req.user.id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}

middlewareobj.isloggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = middlewareobj;