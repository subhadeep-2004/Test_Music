import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import TextInput from '../components/shared/TextInput';
import React from 'react';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from 'react';
import {makeAuthenticatedpostRequest} from '../util/serverHelper.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import  {upload_preset} from '../config_cloudinary.js';
import LoggedInContainer from '../containers/LoggedInContainer';
import { useEffect } from 'react';
import songContext from '../contexts/songContext.jsx';
import { useContext } from 'react';
import { makeAuthenticatedgetRequest } from '../util/serverHelper.jsx';


function  UploadSong(){
    // h full means it will take the full screen of the parent
    const [name,setName]= useState("")
    const[thumbnail,setThumbnail]= useState("")
    const[playlist,setPlayListUrl]=useState("")
    const [song,setSongUrl]= useState("")
    const[uploadedSongFileName,setUploadedSongFileName]= useState("");
    const [publicId, setPublicId] = useState("");
    const [cloudName] = useState("dekotpl63");

    const[inputFocused,setInputFocused]= useState(false);

    const{songData,setSongData,username,setUserName}=useContext(songContext)
    useEffect(()=>{

        async function getMySong() {

            const response= await makeAuthenticatedgetRequest("/song/get/Mysongs")
        
          // It helps yo set the SongData response.songs is a array of my songs
         
            // console.log(response.songs);
            // console.log(respons);
            setSongData(response.songs);           
            
        }

        //getting the userDetails 
        async function userDetails() {
            const response= await makeAuthenticatedgetRequest("/song/user");
            console.log(response);
            setUserName(response.userName)
    
               
            }
            userDetails()
        getMySong()
    },[])




    const navigate= useNavigate();


   async function submitSong() {
        // console.log(thumbnail);
        // console.log(name);
        // console.log(song);
        const data={
            name:name,
            thumbnail:thumbnail,
            track:song
        }

        const response = await makeAuthenticatedpostRequest('/song/create',data);
        if(response &&!response.err){
            alert("Song Created")
            console.log(response);
            navigate("/home")
        }else{
            alert("Song not created kindly fill the necessary details correctly");
        }

        
    }
    
  const [uwConfig] = useState({
    cloudName,
    upload_preset
  })
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });



    return (   <LoggedInContainer songData={songData} currActiveScreen="uploadSong">
        <div className="flex flex-col items-center justify-center min-h-screen  p-4 sm:p-8">
        <div className="mb-6 w-full flex items-center justify-center">
                    <img 
                        className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 rounded-lg shadow-lg" 
                        src="https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Centered Image" 
                    />
                </div>
            <div className="w-full max-w-md p-0 rounded-lg">
                <div className='text-white font-bold text-md sm:text-2xl mb-4 text-center'>Upload Song</div>
                <div className='flex flex-col space-y-4'>

                    <div>
                        <label htmlFor="name" className="block text-sm text-gray-300 pb-3">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter the name"
                            className="w-full p-2 border text-xs sm:text-sm border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                            value={name}
                            onFocus={() => setInputFocused(true)}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="Thumbnail" className="block text-sm text-gray-300 pb-3">Thumbnail</label>
                        <input
                            id="Thumbnail"
                            type="text"
                            placeholder="Enter the Thumbnail"
                            className="w-full p-2 border text-xs sm:text-sm border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                        />
                    </div>

                    {uploadedSongFileName ? (
                        <div className="upload-song bg-emerald-400 text-gray-900 my-5 flex items-center rounded-lg p-3 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36" className="flex-shrink-0">
                                <path fill="currentColor" d="M32.16 16.08L8.94 4.47A2.07 2.07 0 0 0 6 6.32v23.21a2.06 2.06 0 0 0 3 1.85l23.16-11.61a2.07 2.07 0 0 0 0-3.7Z" />
                                <path fill="none" d="M0 0h36v36H0z" />
                            </svg>
                            <div className="px-3 font-semibold truncate">
                                {uploadedSongFileName.substring(0, 20)}...
                            </div>
                        </div>
                    ) : (
                        <CloudinaryUpload
                            uwConfig={uwConfig}
                            setUrl={setSongUrl}
                            setPublicId={setPublicId}
                            setName={setUploadedSongFileName}
                        />
                    )}

                    {uploadedSongFileName && (
                        <div className="flex justify-end">
                            <button
                                id="upload_widget"
                                className="bg-emerald-400 hover:bg-emerald-500 text-xs font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
                                onClick={submitSong}
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </LoggedInContainer>
)   
       
       
}




export default  UploadSong