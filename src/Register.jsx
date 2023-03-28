import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate=useNavigate();
  let[isloading,setisloading]=useState(false)
  let[listerror,setlisterror]=useState([])
  let[error,seterror]=useState('')
  let [user,setuser]=useState({
    first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:'',
  })
  function getuserdata(e){
    let myuser={...user}
    myuser[e.target.name]=e.target.value
   setuser(myuser)
  }
  async function getsubmit(e){
    e.preventDefault()
    setisloading(true)
    let vaildateResult=Validationform();
    console.log(vaildateResult);
    if(vaildateResult.error){
      setlisterror(vaildateResult.error.details)
      setisloading(false)
    }
    else{
      let {data}=await axios.post(`https://sticky-note-fe.vercel.app/signup`,user)

if(data.message==='success'){
  console.log('sucess');
  setisloading(false);
  navigate('/login')
  
}
else{
  seterror(data.message);
  setisloading(false)
  }
    }

}
function Validationform(){
  let scheme=Joi.object({
first_name:Joi.string().alphanum().min(3).max(30).required(),
last_name:Joi.string().alphanum().min(3).max(30).required(),
age:Joi.number().min(3).max(30).required(),
email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
password:Joi.string().pattern(new RegExp('^[a-z-0-9]{3,30}$')).required()

  });
  return scheme.validate(user,{abortEarly:false});
}
  return (
    <>
    <div className='w-75 mx-auto my-5'>
    
    <h2>Register Now</h2>
    {
      listerror.map((error,i)=><div key={i} className='alert alert-danger'>{error.message}</div>
      
     )}
    {
      error?<div className='alert alert-danger'>{error}</div>:''
    }
    
    <form action=""  onSubmit={getsubmit}>
<label htmlFor="first_name">first_name:</label>
<input onChange={getuserdata} className='form-control mb-2' type="text" name="first_name" id="first_name" />
<label htmlFor="last_name">last_name:</label>
<input onChange={getuserdata} className='form-control mb-2' type="text" name="last_name" id="last_name" />
<label htmlFor="age">age:</label>
<input onChange={getuserdata} className='form-control mb-2' type="number" name="age" id="age" />
<label htmlFor="email">email:</label>
<input onChange={getuserdata} className='form-control mb-2' type="email" name="email" id="email" />
<label htmlFor="password">password:</label>
<input onChange={getuserdata} className='form-control mb-2' type="password" name="password" id="password" />

<button type='submit' className='btn btn-outline-info mt-2'>
{
  isloading===true?<i className='fas fa-spin fa-spinner'></i>:
  'Register'
}
</button>
    </form>
    </div>
    
    
    </>
  )
}
