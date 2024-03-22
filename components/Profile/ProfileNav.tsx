'use client'

import { useEffect, useState } from 'react';

import { BiSolidFridge } from 'react-icons/bi'
import { IoAddCircleSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router';

const ProfileNav = () => {
  const path = usePathname();
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    // Update state with the URL after the last '/'
    setCurrentURL(path);
  }, [path]); // Run effect when the route changes

  return (
    <div className='sm:mx-4 min-h-[70px] flex flex-col justify-center items-center rounded-b-xl px-4 py-2 bg-[#2696c2a3]'>
      <ul className='w-full flex flex-wrap flex-col xs:flex-row justify-evenly items-center'>

        <li className='text-center group transition-all duration-200 ease-in-out h-[40px] xs:h-full px-2 flex flex-col justify-center items-center hover:bg-gray-300/50 rounded-lg xs:hover:bg-gray-300/0 border-gray-300 w-full xs:w-fit'>
          <a href='/profile/appliances' className='flex flex-row xs:flex-col justify-center items-center'>
            <div className='w-[29px] h-[29px] hidden xxxs:block'>
              <BiSolidFridge className={` ${currentURL === '/profile/appliances' && 'text-blue-500'}  w-full h-full object-cover group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            </div>
            <p>
              All Appliances
            </p>
          </a>
        </li>

        <li className='text-center group transition-all duration-200 ease-in-out h-[40px] xs:h-full px-2 flex flex-col justify-center items-center hover:bg-gray-300/50 rounded-lg xs:hover:bg-gray-300/0 border-gray-300 w-full xs:w-fit'>
          <a href='/profile/add-appliance' className='flex flex-row xs:flex-col justify-center items-center'>
            <div className='w-[29px] h-[29px] hidden xxxs:block'>
              <IoAddCircleSharp className={` ${currentURL === '/profile/add-appliance' && 'text-blue-500'}  w-full h-full object-cover group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            </div>
            <p>
              Add Appliance
            </p>
          </a>
        </li>

        <li className='text-center group transition-all duration-200 ease-in-out h-[40px] xs:h-full px-2 flex flex-col justify-center items-center hover:bg-gray-300/50 rounded-lg xs:hover:bg-gray-300/0 border-gray-300 w-full xs:w-fit'>
          <a href='/profile/account' className='flex flex-row xs:flex-col justify-center items-center my-2'>
            <div className='w-[29px] h-[29px] hidden xxxs:block'>
              <MdAccountCircle className={` ${currentURL === '/profile/account' && 'text-blue-500'}  w-full h-full object-cover group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            </div>
            <p>
              Your Account
            </p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default ProfileNav