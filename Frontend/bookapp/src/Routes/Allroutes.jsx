import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import UserProfile from '../Components/UserProfile'

const Allroutes = () => {
  return (
    <div>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/profile' element={<UserProfile/>}/>
         <Route path='*' element={<p>404 page not found</p>}/>
      </Routes>
    </div>
  )
}

export default Allroutes