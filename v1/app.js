var exp = require("express");
var app = exp();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

var camp = [
    {name: "Salmon Creek" , image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e50744075277bd4964fc3_340.jpg"},
    {name: "Granite Hill" , image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf8525478497d2f7bd5954b_340.jpg"},
    {name: "Mountain Goat's Rest" , image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744075277bd4964fc3_340.jpg"}
];

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    res.render("campground",{camp: camp});
});

app.listen(6000,function(){
    console.log("Server YelpCamp has started!!");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var imag = req.body.image;
    var newcamp = {name: name, image: imag};
    camp.push(newcamp);
    res.redirect("/campgrounds");
});