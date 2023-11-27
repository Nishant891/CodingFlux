import React from 'react'
import {BsFillPersonCheckFill} from "react-icons/bs";

//Client component to display client in Editor Sidebar. 

const Client = ({username}) => {
  return (
    <>
        <span className="text-white flex items-center justify-evenly py-1 px-2">
          <div className='w-1/4'>
            <BsFillPersonCheckFill className="rounded text-[#ffffff]" />{" "}
          </div>
          <div className='w-3/4 flex flex-row justify-start items-start'>
            <p className='text-[#0054C6]'>{username}</p>
          </div>
        </span>
    </>
  )
}

export default Client
