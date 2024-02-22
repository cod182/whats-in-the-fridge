'use client';

import { IoAdd, IoLogIn, IoLogOut } from 'react-icons/io5';
import React, { useState } from 'react';

import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import { Squash as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import MobileNav from '../MobileNav/MobileNav';
import logo from '@/public/assets/images/witf-logo.webp';
import { useSession } from 'next-auth/react';

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { data: session } = useSession();


  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="w-full h-auto flex flex-row justify-center items-center sm:items-end bg-white">
        <div className="w-full flex flex-row justify-between sm:justify-around items-center">
          <div className="sm:hidden flex flex-row justify-center items-center text-primary hover:text-secondary hover:drop-shadow-2xl w-fit font-[calc(10px + 10vw)]">
            <Hamburger toggled={isNavOpen} toggle={toggleNav} />
          </div>

          <ul className="hidden sm:flex flex-row justify-start items-center ">
            <li className="mx-2">
              <a
                href="/"
                className="group hover:text-gray-600 font-semibold text-primary duration-100 transition-all ease text-[30px] flex flex-col justify-center items-center"
              >
                <GoHomeFill className='group-hover:translate-y-[-5px] transition-all duration-200 ease' />
                <span className="text-[15px] hidden sm:inline">Home</span>
              </a>
            </li>

            <li className="mx-2">
              <a
                href="/"
                className="group hover:text-gray-600 font-semibold text-primary duration-100 transition-all ease text-[30px] flex flex-col justify-center items-center"
              >
                <BiSolidFridge className='group-hover:translate-y-[-5px] transition-all duration-200 ease' />
                <span className="text-[15px] hidden sm:inline">Fridge</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full flex justify-center items-center">
          <Image src={logo} alt="Logo" className="w-[400px] h-auto" />
        </div>
        <div className="w-full hidden sm:flex flex-row justify-around items-center">
          <ul className="flex flex-row justify-start items-center">

            {!session?.user ? (

              <li className="mx-2">
                <a
                  href="/login"
                  className="group hover:text-gray-600 font-semibold text-primary duration-100 transition-all ease text-[30px] flex flex-col justify-center items-center"
                >
                  <IoLogIn className='group-hover:translate-y-[-5px] transition-all duration-200 ease' />
                  <span className="text-[15px] hidden sm:inline">Login / Register</span>
                </a>
              </li>) : (
              <li className="mx-2">
                <a
                  href="/"
                  className="group hover:text-gray-600 font-semibold text-primary duration-100 transition-all ease text-[30px] flex flex-col justify-center items-center"
                >
                  <IoLogOut className='group-hover:translate-y-[-5px] transition-all duration-200 ease' />
                  <span className="text-[15px] hidden sm:inline">Logout</span>
                </a>
              </li>
            )}

          </ul>
        </div>
      </nav>
      <MobileNav isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </>
  );
};

export default Nav;
