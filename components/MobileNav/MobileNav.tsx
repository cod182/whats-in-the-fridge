'use client';

import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { BiSolidFridge } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa6';
import Hamburger from 'hamburger-react';
import Image from 'next/image';
import { RiHome2Fill } from "react-icons/ri";
import logo from '@/public/assets/images/witf-logo.webp';
import { toggleBodyScrolling } from '@/utilities/functions';

const MobileNav = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
    if (isNavOpen) {
      toggleBodyScrolling(true);
    } else {
      toggleBodyScrolling(false);
    }
  };

  const { data: session, status } = useSession();



  return (
    <>
      <nav className="flex-row items-center justify-center w-full h-auto sm:items-end sm:hidden">
        <div className="flex flex-row items-center justify-between w-full sm:justify-around">
          <div className={`z-[900] sm:hidden flex flex-row justify-center items-center ${isNavOpen ? 'text-secondary hover:scale-105' : 'text-primary hover:text-secondary'}  hover:drop-shadow-2xl w-fit font-[calc(10px + 10vw)]`}>
            <Hamburger toggled={isNavOpen} toggle={toggleNav} />
          </div>

          <div className="flex items-center justify-center w-full">
            <Image priority src={logo} alt="Logo" className="w-[400px] h-auto" />
          </div>
        </div>
      </nav>
      <div
        className={`absolute top sm:hidden bg-gradient-to-b from-sky-400 to-indigo-600 z-[899] w-full transition-all ease-in duration-300 ${isNavOpen ? 'h-[100svh] overflow-scroll pt-10' : 'h-0 overflow-hidden pt-0'
          }`}
      >


        <ul className="py-4 mx-auto w-fit">
          <li className="w-fit">
            <a
              href="/"
              className="flex flex-row items-center justify-start my-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
            >
              <RiHome2Fill />
              <span className="text-[30px] inline">Home</span>
            </a>
          </li>
          {!session?.user ? (
            <li className="w-fit">
              <a
                href="/login"
                className="flex flex-row items-center justify-start my-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
              >
                <IoLogIn />
                <span className="text-[30px] inline">Login / Register</span>
              </a>
            </li>) : (
            <>
              <li className="w-fit">
                <a
                  href="/profile"
                  className="translate-x-[-3px] flex flex-row items-center justify-start w-full mt-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
                >
                  <BiSolidFridge />
                  <span className="text-[30px] inline">Account</span>
                </a>
              </li>
              <ul className='mx-auto w-fit'>
                <li className='my-[3px] w-fit pl-6'>
                  <a href="/profile/appliances" className="text-start mb-[3px] font-semibold text-black transition-all duration-200 ease-in border-black rounded text-md w-full hover:text-gray-800   hover:scale-105"
                  >Appliances <FaArrowRight className="ml-2 italic inline group-hover:translate-x-[5px] group-hover:scale-105 transition-all duration-300 ease" /></a>
                  {/* <hr className='border-gray-800 max-w-[150px] mx-auto mb-1' /> */}
                </li>
                <li className='my-[3px] w-fit pl-6'>
                  <a href="/profile/add-appliance" className="text-start mb-[3px] font-semibold text-black transition-all duration-200 ease-in border-black rounded text-md w-full hover:text-gray-800   hover:scale-105"
                  >Add New Appliance <FaArrowRight className="ml-2 italic inline group-hover:translate-x-[5px] group-hover:scale-105 transition-all duration-300 ease" /></a>
                  {/* <hr className='border-gray-800 max-w-[150px] mx-auto mb-1' /> */}
                </li>
                <li className='my-[3px] w-fit pl-6'>
                  <a href="/profile/account" className="text-start mb-[3px] font-semibold text-black transition-all duration-200 ease-in border-black rounded text-md w-full hover:text-gray-800   hover:scale-105"
                  >Account <FaArrowRight className="ml-2 italic inline group-hover:translate-x-[5px] group-hover:scale-105 transition-all duration-300 ease" /></a>
                  {/* <hr className='border-gray-800 max-w-[150px] mx-auto mb-1' /> */}
                </li>
              </ul>

              <li className="w-fit">
                <button
                  onClick={() => signOut()}
                  className="flex flex-row items-center justify-start w-full my-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray-800 hover:scale-105"
                >
                  <IoLogOut />
                  <span className="text-[30px] inline">Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
        <div className="absolute bottom-0 flex items-center justify-center w-full">
          <Image priority src={logo} alt="Logo" className="w-[400px] h-auto" />
        </div>
      </div>
    </>
  );
};

export default MobileNav;
