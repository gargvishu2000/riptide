import React from 'react'
import { useState } from 'react'
import Title from '../components/Title'

const Login = () => {
  const [currentState,setCurrentState]= useState('Login');
  
  const onSubmitHandler = async(event)=>{
    event.preventDefault();
  }
   
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-400'>
      <div className='inline-flex items-center gap-4 mb-2 mt-10'>
        <p className='prata-regular text-3xl text-gray-700'>{currentState}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-'/>
      </div>
      {currentState==='Login'? '':<input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>

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
