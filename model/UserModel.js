let mongoose=require('mongoose');

let userMovieSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    likedMovies:  Array
})
module.exports=mongoose.model("userMovie",userMovieSchema)
