import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import { Howl } from 'howler';
import React, { Children, useContext, useLayoutEffect,useRef } from 'react';
import { useState } from 'react';
import songContext from '../contexts/songContext';
import artistFirstNameContext from '../contexts/artistFirstName';
import artistLastNameContext from '../contexts/artistLastName';
// import Icon  from '@iconify/react';
import { useEffect } from 'react';
import CreatePlayListModals from '../modals/CreatePlayListModals';
// using children props to send the middle content  in react to more generalize our logged in screen which includes the nav bar,top bar and bottom bar 
import AddtoPlayListModal from '../modals/AddtoPlayListModal';
import { makeAuthenticatedpostRequest } from '../util/serverHelper';
import { makeAuthenticatedgetRequest } from '../util/serverHelper';
import user from '../imageFolder/user.png'
import { FaRegUserCircle } from "react-icons/fa";

 import '../App.css'

function  LoggedInContainer({children,currActiveScreen,songData}){
    // h full means it will take the full screen of the parent
    // const[isPause,SetIsPause]= useState(true)
    

    // const[songPlayed, setSongPlayed]= useState(null)


    //for create playList popup
    const [createPlayListModalOccur,setCreatePlayListModalOccur]=useState(false);

    // for add PlayList popup
    const [addPlayListModalOccur,setAddPlayListModalOccur]=useState(false);


    const {currentSong,setCurrSong,songPlayed,setSongPlayed,isPause,SetIsPause,currIndex,setCurrIndex,username,setUserName}= useContext(songContext);

    const{currentartistFirstName, setartistFirstName}=useContext(artistFirstNameContext);
    const{currentartistLastName, setartistLastName}= useContext(artistLastNameContext);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // console.log(currentSong);

    // console.log(currSong);



    // console.log(currIndex);

    const firstUpdate = useRef(true);
    
    useLayoutEffect(()=>{

        // the following if statement will prevent the useEffect from the first render
        //prevent for multiple rendering of the changeSong
        if(firstUpdate.current){
            firstUpdate.current=false;
            return;
        }
        if(!currentSong){
            return;
        }
        
            
    //     }
    //     userDetails()
        if(currentSong!==null){
            function findIndexById(data, targetId) {
                if(data)
                return data.findIndex(element => element._id === targetId);
                
            }
            // const idx=findIndexById(props.songData,currentSong._id);
            console.log(songData);
            // const idx=songData.findIndex(currentSong._id);
            const idx=findIndexById(songData,currentSong._id)
            setCurrIndex(idx);
            
       }
        changeSong(currentSong.track);
    },[currentSong &&currentSong.track ] )// dependancies is there for useEffect


    // console.log(currIndex);
    
    //Handle Click for the next click
    const handleNextClick = () => {
        // Ensure currIndex is defined and not exceeding the array bounds
        console.log(songData);
        if (currIndex !== undefined && currIndex!=-1 && currIndex < songData.length - 1) {
            const nextIndex = currIndex + 1;
            setCurrIndex(nextIndex);
            const nextSong = songData[nextIndex];
            changeSong(nextSong.track);
            setCurrSong(nextSong);

        }
    };

    // Previous song click 
    const handlePreviousClick = () => {
        // Ensure currIndex is defined and not less than 0
        if (currIndex !== undefined && currIndex > 0) {
            const previousIndex = currIndex - 1;
            setCurrIndex(previousIndex);
            const previousSong = songData[previousIndex];
            if(previousSong.track!==undefined){
            changeSong(previousSong.track);
            setCurrSong(previousSong);
            }
        }
    };

    // Handle repeat

    function repeat() {
        changeSong(currentSong.track)
    }
    



    //add song to the playList
    async function addSongtoPlayList(playlistId) {
        const song_id= currentSong._id;
        const data={
            playlistId:playlistId,
            songId:song_id

        }
       const response = await makeAuthenticatedpostRequest("/playlist/add/song",data);
       if(response._id && !response.err){
        console.log("Song added to the Playlist");
        console.log(response);
        setAddPlayListModalOccur(false)
       }else{
        console.log("err");
       }
    }


    //Where the song is pause from there it will continue again till the song is changed
    const playSound= ()=>{
        if(!songPlayed){
            return;
        }
        songPlayed.play();
    }
    
    
    const changeSong=(Songsrc)=>{

        // when the one card is clicked if the previous  song is already playing then stop it and play the new song 
        if(songPlayed){            
            songPlayed.stop()
          }

        var sound = new Howl({
            src: [Songsrc],

            html5: true
          });
        setSongPlayed(sound)
       
        sound.play()
        SetIsPause(false)
     
       
    }

    function pauseSong() {
        songPlayed.pause()
    }

    function togglePlayPause() {
        if(isPause){
           playSound(currentSong.track) 
            SetIsPause(false)
        }else{
            SetIsPause(true)
            pauseSong()
        }

    }
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };
      
    


    return (
            <div className=" h-full w-full bg-black">
                {/* condtion rendering the Create the playModal*/}
              { createPlayListModalOccur &&
               <CreatePlayListModals 
              closeModal={
                ()=>{setCreatePlayListModalOccur(false) // When again taking the 
                }
                }/> }
                {addPlayListModalOccur&&
                
                <AddtoPlayListModal
                    closeModal={()=>{setAddPlayListModalOccur(false)}}
                    addSong= {addSongtoPlayList}
                    />
                    
                }
          <div className={`loginHomepage ${currentSong ? "" : "h-full"} w-full flex`}>
            <div className="absolute top-3 left-4 sm:hidden">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className=''>
                    <Icon icon={isSidebarOpen ? "heroicons-outline:x" : "heroicons-outline:menu"} width={30} className="text-white" />
                </button>
            </div>

            <div className={`side-bar h-full w-4/5 sm:w-1/5 bg-black flex flex-col justify-between ${isSidebarOpen ? "flex" : "hidden"} sm:flex`}>
                {/* Sidebar content */}
                <div className='mt-10 sm:mt-0'>
                    {/* p-5  my-4 */}
                    <div className="w-full hidden sm:block">
                        <div className='icon border border-emerald-500 rounded-full flex justify-center m-4 p-4'>
                            <Icon className='logo-icon' icon="fxemoji:musicalnote" width={40} />
                            <h1 className='login-text ml-2 font-bold text-xs sm:text-2xl text-white'>
                                Musicify
                                </h1>
                        </div>
                    </div>
                    <div className='flex p-4 items-center justify-center '>
                    <FaRegUserCircle color='white' size={20} />
                        <div className='text-white px-2 text-sm '>{username}</div>
                    </div>
                    <div>
                        <IconText name="mingcute:search-fill"
                            text="Search"
                            active={currActiveScreen === 'search'}
                            targetLink='/search'
                        />

                        <IconText name="material-symbols:home"
                            text="Home"
                            active={currActiveScreen === 'home'}
                            targetLink="/home"
                        />

                        <IconText name="bi:stack"
                            text="Library"
                            active={currActiveScreen === 'library'}
                            targetLink="/library"
                        />
                    </div>

                    <div className='mt-10'>
                        <IconText name="gala:add"
                            text="Create Playlist"
                            active={currActiveScreen === 'createPlayList'}
                            onClick={() => { setCreatePlayListModalOccur(true) }}
                        />

                        <IconText name="iconamoon:heart"
                            text="Liked Songs"
                            active={currActiveScreen === 'LikedSongs'}
                        />

                        <IconText name="vaadin:music"
                            text="My Song"
                            active={currActiveScreen === 'mySong'}
                            targetLink="/mySong"
                        />
                    </div>

                    <IconText name="streamline:music-folder-song-solid"
                        text="Upload Song"
                        active={currActiveScreen == 'uploadSong'}
                        targetLink="/uploadSong"
                    />
                </div>

                <div className='text-xs text-gray-700 p-5 hover:text-emerald-400'>
                    Language-English
                </div>
            </div>

            <div className="content h-full w-full sm:w-4/5 overflow-auto">
                <div className='NavBar w-full text-gray-400 flex justify-end items-center'>
                    <IconText name="bx:headphone"
                        text="Free Music"
                    />

                    <div className='h-1/2 border-r flex items-center m-2'>
                    </div>
                </div>

                <div className='w-full p-5 pt-0'>
                    {children}
                </div>
            </div>
        </div>
                


         
        { 
            // if current exist then only the song-bar will
            currentSong  && 
            
            <div className='songBar flex items-center justify-between p-2 sm:p-7 text-white w-full rounded-full border border-emerald-500 '>
                
            {/* divide the whole part into three  part that is in 4:2:4 */}
            <div className='w-1/4 flex items-center'>
            <img className='w-10 h-10 rounded-full' src={currentSong.thumbnail} alt="" />
            <div className='p-2 sm:p-4'>
                <div className='text-gray-400 hover:text-white text-xs sm:text-sm'>
                   {truncateText(currentSong.name, 10)}
                    </div>
                <div className='text-emerald-300 hover:text-emerald-500 text-xs'> {truncateText(currentartistFirstName, 10)}</div>
            </div>
            </div>
            {/* from-green-400 to-blue-500  */}
            <div className={` w-1/2 md:w-1/2 h-10 sm:h-12 flex flex-col sm:bg-gradient-to-r  justify-center items-center sm:bg-emerald-500 text-black rounded-full ${isPause?( "sm:from-green-400 sm:to-blue-500"):("sm:from-pink-500 sm:to-yellow-500")   }`}>
            <div className='flex items-center w-2/3 md:w-1/2 text-lg sm:text-xl justify-between px-3'>
        {/* Controls */}
        <Icon icon="fluent:previous-16-filled" fontSize={20} className='cursor-pointer text-white' onClick={handlePreviousClick} />
        
        {isPause ? (
            <Icon icon="solar:play-bold" fontSize={30} className='cursor-pointer text-white' onClick={togglePlayPause} />
        ) : (
            <Icon icon="zondicons:pause-solid" fontSize={30} className='cursor-pointer text-white' onClick={togglePlayPause} />
        )}
        
        <Icon icon="fluent:next-32-filled" fontSize={20} className='cursor-pointer text-white' onClick={handleNextClick} />
        <Icon icon="material-symbols:repeat" fontSize={20} className='cursor-pointer text-white' onClick={repeat} />
    </div>
                {/* <div className="w-1/2 border flex  " >
               
                </div> */}
         
            </div>
          
            <div className='flex w-1/4 justify-end items-center cursor-pointer'

            // click for the first time set the addPlayList to true
            onClick={()=>{
                setAddPlayListModalOccur(true)
            }}
            
            >
            <Icon icon="material-symbols:playlist-add" fontSize={25} 
                    
            />
            </div>

        </div>
  
            }
         </div>)

}

export default  LoggedInContainer