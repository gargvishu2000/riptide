import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Login = () => {
  const [currentState,setCurrentState]= useState('Login');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const {token,setToken,navigate,backendUrl } = useContext(ShopContext)
  
  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    try {
      if(currentState=="Sign Up"){
        const resposne = await axios.post(backendUrl+"/api/user/register",{name,email,password})
        if(resposne.data.success){
          setToken(resposne.data.token);
          localStorage.setItem('token', resposne.data.token)
        }else{
          toast.error(resposne.data.message)
        }
      }else{
        const response = await axios.post(backendUrl+"/api/user/login",{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
   
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-400'>
      <div className='inline-flex items-center gap-4 mb-2 mt-10'>
        <p className='prata-regular text-3xl text-gray-700'>{currentState}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-'/>
      </div>
      {currentState==='Login'? '':<input onChange={(e)=> setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input type="email" onChange={(e)=> setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>

      <div className=' w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-gray-700'>Forgot Your Password</p>
        {
          currentState=== 'Login'
          ? <p className='cursor-pointer' onClick={()=> setCurrentState('Sign Up')}>Create Account</p>
          : <p className='cursor-pointer' onClick={()=> setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white px-12 py-2 mt-4 font-light'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}
export default Login
