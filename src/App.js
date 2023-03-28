import React, { useEffect, useState } from 'react'
import { Routes,Route,Navigate,useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import Movies from './Movies';
import Tv from './Tv';
import People from './People';
import Login from './Login';
import Register from './Register';
import Notfound from './Notfound';
import Home from './Home';
import jwtDecode from 'jwt-decode';
import Moviedetails from './Moviedetails';
// import Network from './Network';


export default function App (){
  useEffect(()=>{
if(localStorage.getItem('userToken')){
saveData();
}

  },[])
  function logout(){
    saveData(null);
    localStorage.removeItem('userToken');
   navigate('/login')

  }
  let[userData,setUserData]=useState(null)
  let navigate=useNavigate();
  function saveData(){
    let encode=localStorage.getItem('userToken');
    let decode=jwtDecode(encode);
    setUserData(decode);
    console.log(decode);
  }
  function ProtectedRoute(props){
    console.log(props);
    if(localStorage.getItem('userToken')===null){
      return <Navigate to='/login'/>
    }
    else{
return props.children;
    }
  }
    return (<div>
  <Navbar logout={logout} userData={userData}/>
  <div className="container">


  <Routes>
    <Route path='' element={ <ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
    <Route path='tv' element={<ProtectedRoute><Tv/></ProtectedRoute>}/>
    <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}/>
    {/* <Route path='network' element={<ProtectedRoute><Network/></ProtectedRoute>}/> */}
    <Route path='moviedetails' element={<ProtectedRoute><Moviedetails/></ProtectedRoute>}>

      <Route path=':id' element={<ProtectedRoute><Moviedetails/></ProtectedRoute>}/>
      </Route>
    <Route path='login' element={<Login data={saveData}/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path='*' element={<ProtectedRoute><Notfound/></ProtectedRoute>}/>
  </Routes>
  </div>
      </div>
    )
  }

