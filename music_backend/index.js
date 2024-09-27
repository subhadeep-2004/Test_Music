const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./models/User.js');

const authRoutes = require('./routes/auth.js');
const songRoutes = require('./routes/song.js');
const playlistRoutes= require('./routes/playlist.js');

const cors=require('cors');


const app= express();

app.use(cors());

app.use(express.json());





const connectionString="mongodb+srv://bhadrasubhadeep2004:"+process.env.MONGO_PASSWORD+"@cluster0.bdotbqq.mongodb.net/?retryWrites=true&w=majority"
// Not going to post the env files


try {
    // Parameters of the mongoose.connect is the url and the warnings to avoid not required now
    async function run(){
        await mongoose.connect(connectionString, 
            {  
            useNewUrlParser: true,
            useUnifiedTopology: true,}
            ).then(()=>{
            console.log("connect sucessfully");
        }) .catch((err)=>{
            console.log(err);
        });
    }
    run();    
} catch (err) {
    console.log(err);
}



// authoristaion passport
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey ='secret';
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({_id: jwt_payload.identifier})

            .then((user)=>{
                return done(null,user); 
            }) .catch((err)=>{
                return done(err,false);

            })

            // done(error, doesTheUserExist)



            // if (err) {
            //     return done(err, false);
            // }
            // if (user) {
            //     return done(null, user);
            // } else {
            //     return done(null, false);
            //     // or you could create a new account
            // }
        
    })
);



// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({_id: jwt_payload.identifier})
//     .then((err,user)=>{
//         if(err){
//             return done(err, false);
//         }
//         if (user) {
//              return done(null, user);
//         }else{
//             return done(null, false);
//         }
        
//     }) 
// }));


// async function verifyJwt(jwt_payload) {
//     try {
//       const user = await User.findOne({ _id: jwt_payload.sub });
//       if (!user) return null;
//       return user;
//     } catch (err) {
//       return null;
//     }
//   }
  
//   passport.use(new JwtStrategy(opts, verifyJwt));




app.get("/",(req,res)=>{
    res.send("HEllO");

});


app.use("/auth",authRoutes)// when /auth is called in the url the authRoutes start 
app.use("/song",songRoutes)
app.use("/playlist",playlistRoutes)




app.listen(8080,()=>{
    console.log("The server is running in the port 8080")
})