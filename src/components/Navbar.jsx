import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import '../index.css';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { setShowSearch } = useContext(ShopContext);

    return (
        <div className='flex items-center justify-between font-medium'>
            <Link to='/' className='w-48 overflow-hidden'>
                <img
                    src={assets.logo}
                    className="w-48 animate-logo-colors hover:scale-110 transition-all duration-300"
                    alt="logo"
                />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p className='font-semibold text-lg'>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
                    <p className='font-semibold text-lg'>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 '>
                    <p className='font-semibold text-lg'>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
                    <p className='font-semibold text-lg'>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <Link to="/admin" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Admin Login
            </Link>
            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} onClick={() => setShowSearch(true)} className='w-4 cursor-pointer' alt="" />


                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>3</p>
                </Link>
                <img onClick={() => { setVisible(true) }} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {/* Sidebar menu for small screen less then 640px */}
            {/* As soon as setVisible(true), it will call the below div and rest respectively*/}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0 '}`}>

                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>
                        Home
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>
                        Collection
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/About'>
                        About
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/Contact'>
                        Contact
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
