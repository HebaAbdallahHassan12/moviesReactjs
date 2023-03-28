import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
  let navigate=useNavigate();
  let[isloading,setisloading]=useState(false)
  let[listerror,setlisterror]=useState([])
  let[error,seterror]=useState('')
  let [user,setuser]=useState({
   
    email:'',
    password:'',
  });
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
      let {data}=await axios.post(`https://sticky-note-fe.vercel.app/signin`,user)

if(data.message==='success'){
  console.log('sucess');
  setisloading(false);
  
  localStorage.setItem('userToken',data.token);
  props.data();
   navigate('/home')
  
}
else{
  seterror(data.message);
  setisloading(false)
  }
    }
}
function Validationform(){
  let scheme=Joi.object({

email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()

  });
  return scheme.validate(user,{abortEarly:false});
}
  return (
    <>
    <div className='w-75 mx-auto my-5'>
    
    <h2>Login Now</h2>
    {
      listerror.map((error,i)=> i===1?<div key={i} className='alert alert-danger py-2 '>password invalid</div>:
      <div className='alert alert-danger py-2'>{error.message}</div>
      
     )}
    {
      error?<div className='alert alert-danger'>{error}</div>:''
    }
    
    <form action="" onSubmit={getsubmit}>

<label htmlFor="email">email:</label>
<input onChange={getuserdata} className='form-control mb-2' type="email" name="email" id="email" />
<label htmlFor="password">password:</label>
<input onChange={getuserdata} className='form-control mb-2' type="password" name="password" id="password" />

<button type='submit' className='btn btn-outline-info mt-2'>
{
  isloading===true?<i className='fas fa-spin fa-spinner'></i>:
  'Login'
}
</button>
    </form>
    </div>
    
    
    </>
  )
}
