var exp = require("express");
var app = exp();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp_v4",{ useNewUrlParser: true,  useUnifiedTopology: true});
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seeddb = require("./seeds");
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

app.get("/",function(req,res){
    res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{camp: allcampgrounds});
        }
    });
});

app.listen(9999,function(){
    console.log("Server YelpCamp has started!!");
});

//NEW ROUTE
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});

//SHOW ROUTE
app.get("/campgrounds/:id",function(req,res){
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
app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var imag = req.body.image;
    var desc = req.body.description;
    var newcamp = {name: name, image: imag, description: desc};
    Campground.create(newcamp, function(err, newly){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW ROUTE FOR COMMENTS
app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments",function(req,res){
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
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground.id);
                }
            });
        }
    });
});