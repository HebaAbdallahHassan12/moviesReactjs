import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import imageavater from './user.jpg'

export default function Home() {
  let [trandingMovie,serTrandingmovie]=useState([]);
  let [trandingtv,serTrandingtv]=useState([]);
  let [trandingpeople,serTrandingpeople]=useState([]);
  
 async function getMovies(mediatype,callback){
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediatype}/week?api_key=de9607d516fff03489625b9731085035`);
console.log(data);
callback(data.results);
  }
  useEffect(()=>{
getMovies('movie',serTrandingmovie);
getMovies('tv',serTrandingtv);
getMovies('person',serTrandingpeople);

  },[])
  return (
    <>
    <div className='container'>
      <div className="row">
        <div className="col-md-4">
          <div className="tranding d-flex align-items-center">
            </div>
          <div className="brdr w-25 mb-4"></div>
         <h2 className='h3'>Tranding<br/>Movies<br/>To Watch now</h2>
         <p className='text-muted'>Top Tranding Movies By Day</p>
         <div className="brdr mt-4 my-2"></div>
          
         
        </div>
        {
          trandingMovie.map((movie,i)=><div key={i} className='col-md-2'>
            <div className="movie">
               <Link to={`/moviedetails/ ${movie.id}`}><img src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} className='w-100' alt="" /> 

<h3 className='h6'>{movie.title}</h3></Link>     
          
           
            </div>
            
          </div>)
        }
      </div>


      <div className="row py-5">
        <div className="col-md-4">
          <div className="tranding d-flex align-items-center">
            </div>
          <div className="brdr w-25 mb-4"></div>
         <h2 className='h3'>Tranding<br/>Tv<br/>To Watch now</h2>
         <p className='text-muted'>Top Tranding Tv By Day</p>
         <div className="brdr mt-4 my-2"></div>
          
         
        </div>
        {
          trandingtv.map((tv,i)=><div key={i} className='col-md-2'>
            <div className="movie">
                    
          <img src={'https://image.tmdb.org/t/p/w500/'+tv.poster_path} className='w-100' alt="" /> 

            <h3 className='h6'>{tv.name}</h3>
           
            </div>
            
          </div>)
        }
      </div>
      <div className="row py-5">
        <div className="col-md-4">
          <div className="tranding d-flex align-items-center">
            </div>
          <div className="brdr w-25 mb-4"></div>
         <h2 className='h3'>Tranding<br/>People<br/>To Watch now</h2>
         <p className='text-muted'>Top Tranding People By Day</p>
         <div className="brdr mt-4 my-2"></div>
          
         
        </div>
        {
          trandingpeople.map((person,i)=><div key={i} className='col-md-2'>
            <div className="movie">
                  {
                    person.profile_path===null?<img src={imageavater} alt="" />:<img src={'https://image.tmdb.org/t/p/w500/'+person.profile_path} className='w-100' alt="" /> 

                  }  
          
            <h3 className='h6'>{person.name}</h3>
           
            </div>
            
          </div>)
        }
      </div>
      
     
</div>
</>
    
  )
}
