import React, { useEffect, useState } from 'react'
import NewNavbar from '../components/NewNavbar'
import Sidebar from '../components/Sidebar'
import { Routes, Route } from 'react-router-dom'

import Login from '../components/Login'
import { ToastContainer } from 'react-toastify';
import Add from './Add'
import List from './List'

export const backendURl = "http://localhost:3005";
export const currency= "$";

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=> {
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {
        token === ""
          ? <Login setToken={setToken}/>
          : <>
            <NewNavbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path="add" element={<Add token={token}/>} />
                  <Route path="list" element={<List token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Admin
