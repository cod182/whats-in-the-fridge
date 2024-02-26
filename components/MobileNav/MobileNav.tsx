'use client';

import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { signOut, useSession } from 'next-auth/react';

import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import Hamburger from 'hamburger-react';
import Image from 'next/image';
import logo from '@/public/assets/images/witf-logo.webp';
import { useState } from 'react';

const MobileNav = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  const { data: session, status } = useSession();

  return (
    <>
      <nav className="w-full h-auto flex-row justify-center items-center sm:items-end bg-white  sm:hidden">
        <div className="w-full flex flex-row justify-between sm:justify-around items-center">
          <div className="sm:hidden flex flex-row justify-center items-center text-primary hover:text-secondary hover:drop-shadow-2xl w-fit font-[calc(10px + 10vw)]">
            <Hamburger toggled={isNavOpen} toggle={toggleNav} />
          </div>

          <div className="w-full flex justify-center items-center">
            <Image src={logo} alt="Logo" className="w-[400px] h-auto" />
          </div>
        </div>
      </nav>
      <div
        className={`absolute top sm:hidden bg-primary z-[999] w-full transition-all ease-in duration-300 ${isNavOpen ? 'h-[100svh] overflow-scroll' : 'h-0 overflow-hidden'
          }`}
      >
        <ul className="flex flex-col py-4 px-2">
          <li className="w-full">
            <a
              href="/"
              className="hover:text-gray-600 font-semibold text-black duration-200 transition-all ease-in text-6xl my-4 flex flex-row justify-start items-center border-black rounded hover:border-2 hover:shadow-2xl"
            >
              <GoHomeFill />
              <span className="text-[30px] inline">Home</span>
            </a>
          </li>
          {!session?.user ? (

            <li className="w-full">
              <a
                href="/login"
                className="hover:text-gray-600 font-semibold text-black duration-200 transition-all ease-in text-6xl my-4 flex flex-row justify-start items-center border-black rounded hover:border-2 hover:shadow-2xl"
              >
                <IoLogIn />
                <span className="text-[30px] inline">Login / Register</span>
              </a>
            </li>) : (
            <li className="w-full">
              <button
                onClick={() => signOut()}
                className="w-full hover:text-gray-600 font-semibold text-black duration-200 transition-all ease-in text-6xl my-4 flex flex-row justify-start items-center border-black rounded hover:border-2 hover:shadow-2xl"
              >
                <IoLogOut />
                <span className="text-[30px] inline">Logout</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default MobileNav;
