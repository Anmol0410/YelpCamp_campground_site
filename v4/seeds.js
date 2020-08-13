var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507440742e78d3974dc3_340.jpg",
        description: "Blah Blah Blah Blah"
    },
    {
        name: "Camping", 
        image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547848742c7cd4974b_340.jpg",
        description: "Blah Blah Blah Blah"
    },
    {
        name: "Treking night",
        image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440742e78d3974dc3_340.jpg",
        description: "Blah Blah Blah Blah"
    }    
];

function seeddb(){
    //Remove all campgrounds
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        else{
        console.log("removed campgrounds");
        //Add a new campground
        data.forEach(function(seed){
        Campground.create(seed, function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added a campground");
                    //Add a few comments
                    Comment.create(
                        {
                            text: "This is a great place,but i wish there was internet",
                            author: "Homer"
                        },function(err, cmnt){
                            if(err){
                                console,log(err);
                            }
                            else{
                                data.comments.push(cmnt);
                                data.save();
                                console.log("created new comment");
                            }
                        });
                    }               
                });
            });
        }
    });
}
module.exports = seeddb;