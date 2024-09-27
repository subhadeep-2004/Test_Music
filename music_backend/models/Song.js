const mongoose = require("mongoose") ;


const Schema = mongoose.Schema;
const SongsSchema = new Schema({

   name:{
    type: String,
    reuired: true

   },

   thumbnail:{
    type : String,
    required: true
   },

   track:{
    type: String,
    reuired: true,

   },

   
   artist:{
    type: mongoose.Types.ObjectId,
    ref: "User" // to make relationship between to diffrent schema

    


}




  });


  const Songs = mongoose.model("Song", SongsSchema);


module.exports = Songs;
