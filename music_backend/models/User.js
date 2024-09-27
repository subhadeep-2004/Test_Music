const mongoose = require("mongoose") ;


const Schema = mongoose.Schema;
const UsersSchema = new Schema({

    firstName:{
      type:  String,
      required: true
    },

    lastName:{
        type: String,
        required: false
    },

    email:{
        type: String,
        required: true
    },

    userName:{
        type: String,
        required: true,
    },

    likedSongs:{
        type: String,
        default: ""
    },

    likedPlaylists:{
        type: String,
        default: ""
    },

    subscribeArtists:{
        type: String,
        default: ""
    },

    password:{
        type: String,
        required: true,
        // Make it private so that no one can able to change it after creating
        private:true
    }


  });


  const Users = mongoose.model("User", UsersSchema);


module.exports = Users;

