import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import { Link } from 'react-router-dom';
import Password from '../components/shared/Password';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {makeUnAuthenticatedpostRequest} from '../util/serverHelper';
import  {useNavigate}  from 'react-router-dom';
function Login() {


    //Using the hooks to change  the present state 
    const[email,setEmail]= useState("");
    const[password,setPassword]= useState("");
    
    const[cookie,setCookie]= useCookies(["token"])

    const navigate=useNavigate();

   async function logIn (){
   
    const data={
        email:email,
        pwd:password,
       
    };
    
   const response=await makeUnAuthenticatedpostRequest("/auth/login",data)
   if(response && !response.err){
    const token=response.token;
    const date= new Date();
    date.setDate(date.getDate()+30);
    // addding cookie with the help of useCookie from react-dom so that our cookie valid upto 30 days
    setCookie("token",token,{path:"/",expires:date}) //we can use setCookie after importiing a hooks name useCookies
    console.log(response);
    alert("sucess");
    navigate("/home")
   }
   else{
    console.log(response);
    console.log("Failure");
   }
}

 
    return ( 
        <div className="login w-full h-full flex flex-col items-center">

        {/* Logo Section */}
        <div className="logo bg-neutral-200 p-5 w-full flex justify-center items-center">
            <Icon icon="fxemoji:musicalnote" width={40} />
            <h1 className="ml-2 font-bold text-2xl md:text-3xl">Musicify</h1>
        </div>
    
        {/* Form Section */}
        <div className="TextInput w-full max-w-xs md:max-w-md py-8 flex flex-col items-center justify-center">
            <div className="font-bold mb-5 text-base md:text-lg text-center">
                To continue, please Login!
            </div>
    
            {/* Email Input */}
            <TextInput
                label="Email address or username"
                placeholderName="Email address or username"
                value={email}
                setValue={setEmail}
            />
    
            {/* Password Input */}
            <Password
                label="Password"
                placeholderName="Password"
                value={password}
                setValue={setPassword}
            />
    
            {/* Login Button */}
            <div className="Button w-full flex justify-end mb-2">
                <button
                    className="button bg-emerald-300 font-semibold py-2 px-4 rounded-full w-full md:w-auto"
                    onClick={(e) => {
                        e.preventDefault();
                        logIn();
                    }}
                >
                    Log In
                </button>
            </div>
    
            {/* Divider */}
            <div className="my-2 w-full border-b border-solid border-gray-400"></div>
    
            {/* Signup Section */}
            <div className="my-2 font-semibold text-xs md:text-sm">
                Don't have an account?
            </div>
    
            <div className="SignUp w-full border border-black rounded-full flex justify-center items-center p-2 hover:underline">
                <Link to="/signup">SIGN UP FOR MUSIC</Link>
            </div>
        </div>
    </div>
    
    );

}

export default Login;