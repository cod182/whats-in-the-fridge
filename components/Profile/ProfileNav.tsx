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
    <div className='mx-2 min-h-[70px] flex flex-col justify-center items-center rounded-b-md px-4 py-2 bg-yellow-200/80'>
      <ul className='w-full flex flex-wrap flex-row justify-evenly items-center'>

        <li className='text-center group transition-all duration-200 ease-in-out'>
          <a href='/profile/appliances' className='flex flex-col justify-center items-center'>
            <BiSolidFridge className={` ${currentURL === '/profile/appliances' && 'text-blue-500'} h-[35px] w-[35px] group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            <p>
              All Appliances
            </p>
          </a>
        </li>

        <li className='text-center group transition-all duration-200 ease-in-out'>
          <a href='/profile/add-appliance' className='flex flex-col justify-center items-center'>
            <IoAddCircleSharp className={` ${currentURL === '/profile/add-appliance' && 'text-blue-500'} h-[35px] w-[35px] group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
            <p>
              Add Appliance
            </p>
          </a>
        </li>

        <li className='text-center group transition-all duration-200 ease-in-out'>
          <a href='/profile/account' className='flex flex-col justify-center items-center'>
            <MdAccountCircle className={` ${currentURL === '/profile/account' && 'text-blue-500'} h-[35px] w-[35px] group-hover:text-blue-500 transition-all duration-200 ease-in-out`} />
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