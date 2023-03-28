import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Movies() {
  let [tranding,settranding]=useState([])
 async function getmovies(){
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=de9607d516fff03489625b9731085035`)
settranding(data.results)
console.log(data.results);
  }
  useEffect(()=>{
    getmovies()
  },[])
  return (
   
    <div className='container'>
       <div className="test">
      movie
    </div>
<div className="row">
  {tranding.length>0?
tranding.map((movie,i)=><div key={i} className='col-xl-3'>
<img className='w-100' src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path
} alt="" />
<h3>{movie.title}</h3>
<p>{movie.overview}</p>
</div>)
:<i className='fa-spinner fas fa-spin fw-bolder text-center  fa-10x my-5'></i>
  }
</div>

    </div>
  )
}
