import React from 'react';
import { FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 px-4 sm:px-10 bg-[rgba(2,0,36,1)]'>
      <a href="http://codingflux.vercel.app/">
        <img src={logo} alt="Logo" className='w-18 h-12'/>
      </a>
      <a href="http://github.com/Nishant891/CodingFlux/">
        <FaGithub size={30} color='white'/>
      </a>
    </div>
  )
}

export default Header;
