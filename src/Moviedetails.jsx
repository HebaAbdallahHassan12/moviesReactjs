
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Moviedetails() {
    let params=useParams();
    let [moviedetails,setmoviesetails]=useState(null);
   
  async  function getmovivedetails(id){
        let{data} =await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=de9607d516fff03489625b9731085035&language=en-US`)
        setmoviesetails(data)
        console.log(data);
    }
    useEffect(()=>{
        getmovivedetails(params.id)
    },[])
  return (
    <>
    {
        moviedetails? <div className="row">
        <div className="col-md-3">
<img className='w-100' src={`https://image.tmdb.org/t/p/w500`+moviedetails.poster_path} alt="" />
        </div>
        <div className="col-md-9">
<h2>{moviedetails?.title}</h2>
<p className='py-3 text-muted'>{moviedetails.overview}</p>
<ul>
    <li>budget :{moviedetails.budget}</li>
    <li>vote_average:{moviedetails.vote_average}</li>
    <li>popularity :{moviedetails.popularity}</li>
    <li>vote_count :{moviedetails.vote_count}</li>
    <video src={moviedetails.video}></video>
</ul>
        </div>
    </div>:<div className='vh-100 d-flex justify-content-center align-items-center'>
        <i className='fas fa-3x text-danger fa-spin fa-spinner'>        
        </i>
    </div>
    }
    </>
  )
}
