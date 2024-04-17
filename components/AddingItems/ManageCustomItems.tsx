'use client'

import React, { useState } from 'react'

import { FaCircleArrowRight } from "react-icons/fa6";

const ManageCustomItems = () => {
  const [managementPane, setManagementPane] = useState(false)

  return (
    <div className='flex flex-col justify-start items-start w-full h-fit transition-all duration-300 ease bg-pink'>
      <p className={`font-semibold ${managementPane ? 'pb-2' : 'pb-0'}`}>Manage Your Custom Items <FaCircleArrowRight onClick={() => setManagementPane((prev) => !prev)} className={`${managementPane ? 'rotate-90' : 'rotate-0'} cursor-pointer w-[25px] h-[25px] inline transition-all duration-300 ease hover:text-blue-500  hover:scale-105`} /></p>
      {/* Area for Managing Items */}
      <div className={`${managementPane ? 'max-h-[1000px] py-2' : 'max-h-[0px] py-0'} bg-gray-400/30 w-full rounded-md overflow-hidden transition-all duration-300 ease px-2`}>
        <p>Oh Hi!</p>
      </div>
    </div>
  )
}

export default ManageCustomItems