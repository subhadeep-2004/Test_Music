import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import { makeAuthenticatedgetRequest } from '../util/serverHelper';
import { useEffect ,useState} from 'react';
import { useContext } from 'react';
import songContext from '../contexts/songContext';
import React from 'react';
import { Link } from 'react-router-dom'
function  Home(){
    // h full means it will take the full screen of the parent

    // Temporay card details for only one list which contains 5
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    
const FirstcardDetails=[
    {
        title:"Peaceful Piano",
        description:"Relax and indulge with beautiful piano pieces",
        imgUrl:"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        title:"Peacuful Guitar",
        description:"Relax and snoothing tunning of guitar",
        imgUrl:"https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        title:"Deep Focus",
        description:"Keep calm and focus on your goal",
        imgUrl:"https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        title:"Instrumental Study",
        description:"Focus with soft study for long time",
        imgUrl:"https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    // {
    //     title:"Lofi to Focus",
    //     description:"Lofi Song to focus for long time",
    //     imgUrl:"https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // }



]

function PlayListView(props) {
    return (
        <div  className='sm:pl-11'>
            <div className='text-white p-4 font-semibold text-xl'>{props.title}</div>

            <div className='flex flex-col md:flex-row md:flex-wrap gap-7 p-4'>
                {
                    props.cardDetails.map((item) => (
                        <Card
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            imgUrl={item.imgUrl}
                        />
                    ))
                }
            </div>
        </div>
    );
}



    // https://cdn.pixabay.com/photo/2017/10/08/17/22/cello-2830670_1280.jpg

    function  Card(props) {
     

    return <div className='card w-full md:w-60 p-3 rounded-lg flex-shrink-0'>

            <div className=' pb-2'>
                 <img className=' img w-full rounded-md' src={props.imgUrl} alt="" />
            </div>
            <div className='title text-white font-bold py-4'>{props.title}</div>
            <div className='description text-gray-500 '>{props.description}</div>
            </div>
}

    return <div className="h-full w-full flex">

         
            <div className="content h-full w-full overflow-auto">
                <div className='NavBar w-full text-gray-400 flex justify-end items-center'>
                 
                    <div className='h-1/2 border-r flex items-center m-2'>

                    </div>
                    <button className='button h-1/2 bg-emerald-300 font-semibold rounded-full text-black sm:text-sm flex text-xs justify-center items-center p-2'>
  <Link to="/login" className="w-full h-full flex justify-center items-center">
    Log In
  </Link>
</button>

<button className='button h-1/2 bg-emerald-300 font-semibold rounded-full text-black sm:text-sm flex text-xs flex justify-center items-center mx-2 p-2'>
  <Link to="/signup" className="w-full h-full flex justify-center items-center">
    Sign Up
  </Link>
</button>


                </div>
                {/* right panel */}

                <div className='w-full p-5 pt-0'>
                    {/* sending the card details in the form of props different List should have different card detailss */}
                   < PlayListView title="Focus" 
                        cardDetails={FirstcardDetails}
                   
                   />
                   < PlayListView title="Sound of India"
                        cardDetails={FirstcardDetails}
                   />
                   < PlayListView title="Rock" 
                        cardDetails={FirstcardDetails}
                   />
                </div>
            </div>
         </div>
}




export default  Home