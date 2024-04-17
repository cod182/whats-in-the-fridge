'use client';

import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import Hamburger from 'hamburger-react';
import Image from 'next/image';
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
          <div className={`z-[999] sm:hidden flex flex-row justify-center items-center ${isNavOpen ? 'text-secondary hover:scale-105' : 'text-primary hover:text-secondary'}  hover:drop-shadow-2xl w-fit font-[calc(10px + 10vw)]`}>
            <Hamburger toggled={isNavOpen} toggle={toggleNav} />
          </div>

          <div className="flex items-center justify-center w-full">
            <Image priority src={logo} alt="Logo" className="w-[400px] h-auto" />
          </div>
        </div>
      </nav>
      <div
        className={`absolute top sm:hidden bg-primary z-[998] w-full transition-all ease-in duration-300 ${isNavOpen ? 'h-[100svh] overflow-scroll pt-10' : 'h-0 overflow-hidden pt-0'
          }`}
      >


        <ul className="flex flex-col px-2 py-4 w-full">
          <li className="w-full">
            <a
              href="/"
              className="flex flex-row items-center justify-start my-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray-600 hover:border-2 hover:shadow-2xl"
            >
              <GoHomeFill />
              <span className="text-[30px] inline">Home</span>
            </a>
          </li>
          {!session?.user ? (
            <li className="w-full">
              <a
                href="/login"
                className="flex flex-row items-center justify-start my-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray-600 hover:border-2 hover:shadow-2xl"
              >
                <IoLogIn />
                <span className="text-[30px] inline">Login / Register</span>
              </a>
            </li>) : (
            <>
              <li className="w-full">
                <a
                  href="/profile"
                  className="flex flex-row items-center justify-start w-full mt-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray-600 hover:border-2 hover:shadow-2xl"
                >
                  <BiSolidFridge />
                  <span className="text-[30px] inline">Account</span>
                </a>
              </li>
              <ul className='ml-4'>
                <li className='my-2'>
                  <a href="/profile/appliances" className="mb-[5px] flex flex-row items-center justify-start px-2 font-semibold text-black transition-all duration-200 ease-in border-black rounded text-md w-full hover:text-gray-800 hover:border-[1px] hover:border-b-0 hover:shadow-2xl"
                  >Appliances</a>
                  <hr className='border-gray-800 w-full mb-1' />
                </li>
                <li className='my-2'>
                  <a href="/profile/add-appliance" className="mb-[5px] flex flex-row items-center justify-start px-2 font-semibold text-black transition-all duration-200 ease-in border-black rounded text-md w-full hover:text-gray-800 hover:border-[1px] hover:border-b-0 hover:shadow-2xl"
                  >Add New Appliance</a>
                  <hr className='border-gray-800 w-full mb-1' />
                </li>
                <li className='my-2'>
                  <a href="/profile/account" className="mb-[5px] flex flex-row items-center justify-start px-2 font-semibold text-black transition-all duration-200 ease-in border-black rounded text-md w-full hover:text-gray-800 hover:border-[1px] hover:border-b-0 hover:shadow-2xl"
                  >Account</a>
                  <hr className='border-gray-800 w-full mb-1' />
                </li>
              </ul>

              <li className="w-full">
                <button
                  onClick={() => signOut()}
                  className="flex flex-row items-center justify-start w-full my-4 text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray-600 hover:border-2 hover:shadow-2xl"
                >
                  <IoLogOut />
                  <span className="text-[30px] inline">Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default MobileNav;
