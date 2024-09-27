const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const getToken = require('../utils/helper.js');


const router = express.Router(); // We didn't use only Express as we do not need all the function like listen, use, we just need router
router.use(bodyParser.urlencoded({extended:true}));






router.post("/register",async (req,res)=>{
    

    // my req.body format ( email,password, firstName, lastName)
  //  const { email, pwd, firstName,lastName,userName}=req.body;

    const email= req.body.email;
    const pwd= req.body.pwd;
    const firstName= req.body.firstName;
    const lastName= req.body.lastName;
    const userName= req.body.userName;




    //if user already exist with same email then error;
    const user= await User.findOne({email: email })
    if(user){
        // in general res.json gives 200 that means api worked well but we manually change the status 
         res.status(403).json({error:"A user with this email already exist"});
    }else{

        // valid case when no email is there
        // Create a new user in DB

        //hash the password

        const salt=10;
        // const hashPwd= bcrypt.hash(pwd,salt);

        bcrypt.hash(pwd, salt, async function(err, hash) {
            const newUserData =new User({
                email: email,
                password:hash,           // md5(req.body.password)  // hash function
                firstName: firstName,
                lastName: lastName,
                userName: userName
            
            });
           // userDetails.save();

           const newUser= await User.create(newUserData) // create a new user  
       

            //jwt
            const token= await getToken(email,newUser);
            const userToReturn={...newUser.toJSON(),token};
            // delete the user password as we donot want to return the password



            delete userToReturn.password;

            res.json(userToReturn);// by default status is 200



            // .then(()=>{
            //   res.render("sucess.ejs",{
            //     sucess:"Account created"
            //   });
            // }).catch((err)=>{
            //     console.log(err);
            // })
           
        });




        // const newUserData={
        //     email: email,          
        //    password: hashPwd,
        //     firstName: firstName,
        //     lastName: lastName,
        //     userName: userName
        // }
        // const newUser= await User.create(newUserData);// create a new user

        // //jwt
        // const token=await getToken(email,newUser);

        // const userToReturn={...newUser.toJSON(),token};

        // // delete the user password as we donot want to return the password
        // delete userToReturn.password;

        // res.json(userToReturn);// by default status is 200

    }
})

// login page


router.post("/login",async (req,res)=>{

    const Email= req.body.email;
    const pwd= req.body.pwd;


    //check that email exist;
    const user= await User.findOne({
        email: Email
    });

    if(user){

       
         bcrypt.compare(pwd,user.password,async function(err,isPasswordValid){
            if(isPasswordValid){
            const token = await getToken(user.email, user);
            const userToReturn={...user.toJSON(),token};
            // delete the user password as we donot want to return the password
            delete userToReturn.password;
            res.json(userToReturn);// by default status is 200
            }else{
          
                res.status(403).json("Invalid credentials1");
            }

        });
    }else{
        res.status(403).json("Invalid credentials2");
    }

})

















module.exports = router;










