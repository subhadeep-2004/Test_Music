// const express= require ('express');
// const passport= require('passport');
// const Song = require('../models/Song.js');

// var session = require('express-session');

// // How to create  a song 

// const router = express.Router();

// // before excecuting the function there is a middle-ware which will be excuted that the user is authenticate by passport
// router.post("/create",passport.authenticate('jwt'), async (req,res)=>{
//     const name= req.body.name;
//     const thumbnail= req.body.thumbnail;
//     const track= req.body.track;

//     if(!name || !thumbnail || !track){
//         res.status(301).json({err:"Insuffienet details to create song"})
//     }

//     else{
//     const artist= req.body._id;
//     const songDetails={
//         name: name,
//         thumbnail: thumbnail,
//         track: track,
//         artist: artist,
//     }
    
//     const createdSong= await Song.create(songDetails);
//     res.json(createdSong);      // to json
//     }

// })


// router.get("/get/mysong",passport.authenticate("jwt",{session:false}),async (req,res)=>{

//     const currentUser= req.user;


//     const songs= await Song.find({artist:currentUser._id});// find out which artist is equal to the currentUser
//     res.json(songs);
    




// })
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song.js");
const User = require("../models/User.js");
const bodyparser= require("body-parser");
const Songs = require("../models/Song.js");

const path = require('path')


//adding the body-parser middleware
router.use(bodyparser.urlencoded({ extended: true }))
router.use(bodyparser.json())



//session is helped to maintain the login for the user
router.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // req.user getss the user because of passport.authenticate
       const name = req.body.name;
       const thumbnail= req.body.thumbnail;
        const track = req.body.track;
        const allowedExtensions = ['.mp3', '.wav', '.ogg'];
      //  console.log(name);
        if (!name || !thumbnail || !track) {



            return res
                .status(301)
                .json({err: "Insufficient details to create song."});
        }
        const trackExtension = path.extname(track); // Get the extension of the track file
        const a = allowedExtensions.includes(trackExtension)

        if (!a) {
            return res
                .status(301)
                .json({err: "Invalid track format. Only MP3, WAV, and OGG formats are supported."});
        }










        const artist = req.user._id;
        const songDetails = {name, thumbnail, track, artist};
        const createdSong = await Song.create(songDetails);
        return res.status(200).json(createdSong);
    }
);


// Get route to get all songs I have published.
router.get("/get/mysongs", passport.authenticate("jwt", {session: false}), async (req, res) => { // bydefault jwt
        // We need to get all songs where artist id == currentUser._id

        const currentUser=req.user;//artist is refered as user in the User model

        //populate extend the object where the id matches in the artist place it will add the whole object of the artist(user)
        const songs = await Song.find({artist: req.user._id});
        const artist = await User.findOne({_id: req.user._id});
        const artistFirstName= artist.firstName;
        const artistLastName=artist.lastName;
        const data={songs,artistFirstName,artistLastName};
        
         res.status(200).json(data);
    }
);


router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async(req,res)=>{

    const artist_id= req.params.artistId;

    // find the user where the artist id is same

    const artist = await User.find({_id:artist_id});

    // if no artist found
    if(!artist|| artist.length==0){
        res.status(301).json({err:"Artist doesnot exist"});
    }else{
        //artist exist so find the songs which have the same artist
        const songs = await Song.find({artist : artist_id});

        res.json({data:songs});

    }
})


router.get("/get/songname/:songName",passport.authenticate("jwt",{session:false}),async (req,res)=>{

    const song_name= req.params.songName;
    
    const songs=await Song.find({name:song_name}).populate("artist");

    // console.log(songs); songs is an array of object song
    res.json({data:songs})

})

router.get("/user",passport.authenticate("jwt",{session:false}),async(req,res)=>{

    const currentuser= req.user;

    if(currentuser){
        res.status(200).json(currentuser);
    }else{
        res.json("Invalid");
    }


})








module.exports=router