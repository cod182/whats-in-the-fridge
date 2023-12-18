'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/public/assets/images/witf-logo.webp';
import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import { IoLogIn } from 'react-icons/io5';
import MobileNav from '../MobileNav/MobileNav';
import { Squash as Hamburger } from 'hamburger-react';

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
                className="hover:text-gray-600 font-semibold text-primary duration-200 transition-all ease-in text-[30px] flex flex-col justify-center items-center"
              >
                <GoHomeFill />
                <span className="text-[15px] hidden sm:inline">Home</span>
              </a>
            </li>
            <li className="mx-2">
              <a
                href="/"
                className="hover:text-gray-600 font-semibold text-primary duration-200 transition-all ease-in text-[30px] flex flex-col justify-center items-center"
              >
                <IoLogIn />
                <span className="text-[15px] hidden sm:inline">Login</span>
              </a>
            </li>
            <li className="mx-2">
              <a
                href="/"
                className="hover:text-gray-600 font-semibold text-primary duration-200 transition-all ease-in text-[30px] flex flex-col justify-center items-center"
              >
                <BiSolidFridge />
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
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Login</a>
            </li>
            <li>
              <a href="">My Fridge</a>
            </li>
          </ul>
        </div>
      </nav>
      <MobileNav isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </>
  );
};

export default Nav;
