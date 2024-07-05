'use client'

import { BiSolidFridge } from 'react-icons/bi'
import { FaHouse } from "react-icons/fa6";
import { FaPlusSquare } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { RiHome2Fill } from "react-icons/ri";

const ProfileNav = ({ path }: { path: string }) => {




  return (
    <div className='sm:mx-4 min-h-[70px] flex flex-col justify-center items-center rounded-b-xl px-4 py-2 bg-[#2696c2a3]'>
      <ul className='flex flex-row items-center w-full gap-2 justify-evenly'>

        <li className={`text-center group transition-all duration-200 ease-in-out h-[40px] xs:h-full active:bg-gray-300/80 active:sm:bg-gray-300/0 flex flex-col justify-center items-center bg-gray-300/50 hover:bg-gray-200/50 cursor-pointer hover:xs:bg-gray-300/0 rounded-lg xs:bg-gray-300/0 border-gray-300 w-full xs:w-fit ${path === '/profile' && 'bg-gray-200/50'}`}>
          <a href='/profile' className='flex flex-row items-center justify-center w-full h-full'>
            <div className='w-[29px] h-auto'>
              <RiHome2Fill className={` ${path === '/profile' && 'text-blue-500'}  w-full h-full object-cover group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            </div>
            <p className='hidden sm:inline ml-[2px] font-normal'>
              Home
            </p>
          </a>
        </li>

        <li className={`text-center group transition-all duration-200 ease-in-out h-[40px] xs:h-full active:bg-gray-300/80 active:sm:bg-gray-300/0 flex flex-col justify-center items-center bg-gray-300/50 ${path === '/profile/appliances' && 'bg-gray-200/50'} hover:bg-gray-200/50 cursor-pointer hover:xs:bg-gray-300/0 rounded-lg xs:bg-gray-300/0 border-gray-300 w-full xs:w-fit`}>
          <a href='/profile/appliances' className='flex flex-row items-center justify-center w-full h-full'>
            <div className='w-[29px] h-auto'>
              <BiSolidFridge className={`${path === '/profile/appliances' && 'text-blue-500'}  w-full h-full object-cover group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            </div>
            <p className='hidden sm:inline ml-[2px] font-normal'>
              All Appliances
            </p>
          </a>
        </li>

        <li className={`text-center group transition-all duration-200 ease-in-out h-[40px] xs:h-full active:bg-gray-300/80 active:sm:bg-gray-300/0 flex flex-col justify-center items-center bg-gray-300/50 hover:bg-gray-200/50 cursor-pointer hover:xs:bg-gray-300/0 rounded-lg xs:bg-gray-300/0 border-gray-300 w-full xs:w-fit ${path === '/profile/add-appliance' && 'bg-gray-200/50'}`}>
          <a href='/profile/add-appliance' className='flex flex-row items-center justify-center w-full h-full'>
            <div className='w-[26px] h-auto'>
              <FaPlusSquare className={` ${path === '/profile/add-appliance' && 'text-blue-500'}  w-full h-full object-cover group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            </div>
            <p className='hidden sm:inline ml-[2px] font-normal'>
              Add Appliance
            </p>
          </a>
        </li>

        <li className={`text-center group transition-all duration-200 ease-in-out h-[40px] xs:h-full active:bg-gray-300/80 active:sm:bg-gray-300/0 flex flex-col justify-center items-center bg-gray-300/50 hover:bg-gray-200/50 cursor-pointer hover:xs:bg-gray-300/0 rounded-lg xs:bg-gray-300/0 border-gray-300 w-full xs:w-fit ${path === '/profile/account' && 'bg-gray-200/50'}`}>
          <a href='/profile/account' className='flex flex-row items-center justify-center w-full h-full my-2'>
            <div className='w-[30px] h-auto'>
              <MdAccountBox className={` ${path === '/profile/account' && 'text-blue-500'}  w-full h-full object-cover group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            </div>
            <p className='hidden sm:inline ml-[2px] font-normal'>
              Your Account
            </p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default ProfileNav