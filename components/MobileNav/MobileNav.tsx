'use client';

import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { BiSolidFridge } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa6';
import { FaPlusSquare } from 'react-icons/fa';
import Hamburger from 'hamburger-react';
import Image from 'next/image';
import { MdAccountBox } from "react-icons/md";
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
      <nav className=" z-[900] flex-row items-center justify-center w-full h-auto sm:items-end sm:hidden">
        <div className="flex flex-row items-center justify-between w-full sm:justify-around">
          <div className={` sm:hidden flex flex-row justify-center items-center ${isNavOpen ? 'text-secondary hover:scale-105' : 'text-primary hover:text-secondary'}  hover:drop-shadow-2xl w-fit font-[calc(10px + 10vw)]`}>
            <Hamburger toggled={isNavOpen} toggle={toggleNav} />
          </div>

          <div className="flex items-center justify-center w-full">
            <Image priority src={logo} alt="Logo" className="w-[400px] h-auto" />
          </div>
        </div>

        <div
          className={` absolute bottom left-2 sm:hidden rounded-md bg-blue-400 z-[899] transition-all ease-in duration-300  ${isNavOpen ? 'max-h-[400px] w-fit max-w-[100%] overflow-scroll' : 'overflow-hidden max-h-[0px] max-w-[0%]'}`}
        >


          <ul className="py-2 mx-auto w-full px-2 flex flex-col items-start justify-start ">

            {/* Home Link */}
            <li className="border-x-2 border-t-2 border-b-2 border-black w-full py-1 pl-4 pr-2 hover:bg-gray-400/40 transition-all duration-200 ease">
              <a
                href={session?.user ? '/profile' : '/'}
                className=" left flex flex-row items-center text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
              >
                <RiHome2Fill className='w-[20px] h-auto' />
                <span className="text-[20px] inline">Home</span>
              </a>
            </li>

            {/* Dependant on sign in status */}

            {!session?.user ? (
              // Login Button
              <li className="border-x-2 border-b-2 border-black w-full py-1 pl-4 pr-2 hover:bg-gray-400/40 transition-all duration-200 ease">
                <a
                  href="/login"
                  className="w-full flex flex-row items-center text-6xl font-semibold text-black transition-all duration-300 ease-in border-black rounded hover:text-gray hover:scale-105  "
                >
                  <IoLogIn className='w-[20px] h-auto' />
                  <span className="text-[20px] ">Login / Register</span>
                </a>
              </li>) : (
              <>
                {/* All Appliances Link */}
                <li className="border-x-2 border-b-2 border-black w-full py-1 pl-4 pr-2 hover:bg-gray-400/40 transition-all duration-200 ease">
                  <a
                    href="/profile/appliances"
                    className="flex flex-row items-center text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
                  >
                    <BiSolidFridge className='w-[20px] h-auto' />
                    <span className="text-[20px] inline">Appliances</span>
                  </a>
                </li>

                {/* Add Appliance Link */}
                <li className="border-x-2 border-b-2 border-black w-full py-1 pl-4 pr-2 hover:bg-gray-400/40 transition-all duration-200 ease">
                  <a
                    href="/profile/add-appliance"
                    className="flex flex-row items-center text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
                  >
                    <FaPlusSquare className='w-[20px] h-auto' />
                    <span className="text-[20px] inline">New Appliance</span>
                  </a>
                </li>

                {/* Account Link */}
                <li className="border-x-2 border-b-2 border-black w-full py-1 pl-4 pr-2 hover:bg-gray-400/40 transition-all duration-200 ease">
                  <a
                    href="/profile/account"
                    className="flex flex-row items-center text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
                  >
                    <MdAccountBox className='w-[20px] h-auto' />
                    <span className="text-[20px] inline">Account</span>
                  </a>
                </li>

                {/* Log out link */}
                <li className="border-x-2 border-b-2 border-black w-full py-1 pl-4 pr-2 hover:bg-gray-400/40 transition-all duration-200 ease">
                  <a href='#'
                    aria-label='Logout'
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex flex-row items-center text-6xl font-semibold text-black transition-all duration-200 ease-in border-black rounded hover:text-gray hover:scale-105"
                  >
                    <IoLogOut className='w-[20px] h-auto' />
                    <span className="text-[20px] inline">Logout</span>
                  </a>
                </li>
              </>
            )}

            {/* Bottom Image */}
          </ul>
          <div className="flex items-center justify-center w-full my-2">
            <Image priority src={logo} alt="Logo" className="w-[200px] h-auto" />
          </div>
        </div>
      </nav>
      {/* Background blur */}
      <div className={`w-full absolute top left backdrop-blur-sm transition-all duration-0 ease ${isNavOpen ? 'z-[800] h-[100vh]' : ' h-[0vh] z-[-1]'}`} onClick={() => toggleNav()}></div>
    </>
  );
};

export default MobileNav;
