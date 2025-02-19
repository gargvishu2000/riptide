
import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm '>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, eveniet!</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5 '>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-500'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-1 text-gray-500'>
                <li>+91 9999237843</li>
                <li>customercare@riptide.com</li>
            </ul>
        </div>
      </div>
      <div>
            <hr />
            <p className='text-center py-4 text-sm'>Copyright 2024@ riptide.com -All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer
