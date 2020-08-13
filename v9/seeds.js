var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507440742d79d09e4ccc_340.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Camping", 
        image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440742d79d09e4ccc_340.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Treking night",
        image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440742d79d09e4ccc_340.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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