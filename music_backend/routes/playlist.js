const express= require("express");
const Playlist= require("../models/Playlist.js");
const User= require("../models/User.js")
const passport= require("passport");
const Song = require("../models/Song");

const bodyparser= require("body-parser");


const router= express.Router();


router.use(bodyparser.urlencoded({ extended: true }))

// create a playlist
router.post("/create",passport.authenticate('jwt',{session:false}),async (req,res)=>{
    /*
    In this context, req.user is likely populated by Passport.js with the user information after 
    successful authentication. The user information typically contains details such as the user's ID, username, and other relevant information. 
    This information is then used to associate the authenticated user with the playlist being created. 
    */
    const currentUser= req.user;
    
    const{ name,thumbnail,songs}= req.body;


    if(!name || !thumbnail || !songs){
        res.json({err:"Insufficinet data"});

    }
    else{
        const playlistData={
            name:name,
            thumbnail:thumbnail,
            songs:songs,
            owner: currentUser._id,  // owner is the user who is creating the playlist
            collabroator: []
        };
        const playlist= await Playlist.create(playlistData);
        
        res.json({data:playlist});

    }
})

router.get("/get/me",passport.authenticate("jwt",{session: false}),async(req,res)=>{
    const artistId=req.user._id;

    const playlists = await Playlist.find({owner:artistId}).populate("owner");
    
    return res.json({data:playlists});
    
})














//:playlistId, playlistId is now a variable anything
router.get("/get/playlist/:playlistId",passport.authenticate("jwt",{session:false}),async(req,res)=>{

    const playlistId= req.params.playlistId;
    if (playlistId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        const playlist= await Playlist.findOne({_id:playlistId}).populate({path:"songs",populate:{path:"artist"}
    
    
    
    });

        if(!playlist){
            res.status(301).json({err:"Invalid"});
        }
        else{
            res.json({data:playlist});
            
        }
    }else{
        console.log("Not a objectId");
    }
   
})

//get all the playlist made by an artist
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async(req,res)=>{

    const artistId= req.params.artistId;
    const artist = await User.findOne({_id:artistId});
    if(artist){
       const playlist= await Playlist.find({owner: artistId});

        if(!playlist){
            res.json({err:"No playlist is made by the artist"});
        }
        else{
            res.json({data:playlist});
            
        }
    }else{
        res.json({err:"Invalid Artist ID"})
    }

})


//Add a song to a plalist take both the song id and playlist id 
router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currUser =req.user;
    const {playlistId,songId}=req.body;

    const playlist= await Playlist.findOne({_id:playlistId});
    if(!playlist){
        res.json({err:"Playlist doesnot exist"});
    }   
    
//   console.log(playlist.collaborators);
// !playlist.collaborators.includes(currUser._id)
    //current user is not a owner or a collaborator
    if( !playlist.owner.equals(currUser._id) ){ //
        res.json({err:"Not allowed"});
    }
    else{
        //check if the song is valid;

        const song = await Song.findOne({_id:songId})// we can use if else in place of promises
        .then((song)=>{

            playlist.songs.push(songId); // songs is array
            playlist.save();

            res.json(playlist);
        }).catch((err)=>{
            res.json({err:"Song doesnot exist"});

        })
      


    }



})












module.exports=router;
