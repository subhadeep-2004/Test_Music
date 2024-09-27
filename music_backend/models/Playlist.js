const mongoose = require("mongoose") ;


const Schema = mongoose.Schema;
const PlaylistsSchema = new Schema({

   name:{
    type: String,
    reuired: true

   },

   thumbnail:{
    type : String,
    required: true
   },

   owner:{ // owner is also a user
    type: mongoose.Types.ObjectId, // Type of the ID of User
    ref:"User"    
   },

   songs:[   // Array of songs
    {
        type: mongoose.Types.ObjectId, //  type of the id of that paticular song
        ref: "Song",      // making releationship with the song 
    }
   ],
   
   artist:{
    type: mongoose.Types.ObjectId,
    ref: "User"   // artist is also a user this is creating a relationship with the different schema
   },

   collaborators:[{

    type: mongoose.Types.ObjectId,
    ref:"User"    // collaborators is also a user

   }]




  });


  const Playlists = mongoose.model("Playlist", PlaylistsSchema);

module.exports=Playlists;
