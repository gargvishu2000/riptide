import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="px-4 sm:px-10 py-5">
      <hr />
      {/* Footer Content */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-6 sm:gap-14 my-2 text-sm text-center sm:text-left">
        {/* Logo & Description */}
        <div>
          <img src={assets.logo} className="mb-2 w-32 mx-auto sm:mx-0" alt="Logo" />
          <p className="w-full sm:w-2/3 text-gray-700 mx-auto sm:mx-0">
           All time in Fashion.
          </p>
        </div>

        {/* Company Links */}
        <div>

          <ul className="flex flex-col gap-1 py-12 text-gray-500 items-center sm:items-start">
            <Link to="/">Home</Link>
            <Link to="/About">About Us</Link>
          </ul>

        </div>

        {/* Contact Info */}
        <div className='py-8'>
          <p className="text-xl font-medium">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-500 items-center sm:items-start">
            <li>+91 9999237843</li>
            <li>customercare@riptide.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div>
        <hr />
        <p className="text-center text-sm mt-4">
          Copyright 2024 @ riptide.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
