const jwt= require('jsonwebtoken')


const getToken = async (email,user)=>{

    const token= jwt.sign({
        identifier:user._id
        },'secret')

    return  token;
};




module.exports = getToken;





















