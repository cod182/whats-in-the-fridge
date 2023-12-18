'use client';

import { useState } from 'react';
import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import { IoLogIn } from 'react-icons/io5';

type Props = {
  isNavOpen: boolean;
  toggleNav: () => void;
};

const MobileNav = ({ isNavOpen, toggleNav }: Props) => {
  // Mobile Nav State

  return (
    <div
      className={`absolute top sm:hidden bg-primary z-[999] w-full transition-all ease-in duration-300 ${
        isNavOpen ? 'h-[100svh] overflow-scroll' : 'h-0 overflow-hidden'
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
        <li className="w-full">
          <a
            href="/"
            className="hover:text-gray-600 font-semibold text-black duration-200 transition-all ease-in text-6xl my-4 flex flex-row justify-start items-center border-black rounded hover:border-2 hover:shadow-2xl"
          >
            <IoLogIn />
            <span className="text-[30px] inline">Login</span>
          </a>
        </li>
        <li className="w-full">
          <a
            href="/"
            className="hover:text-gray-600 font-semibold text-black duration-200 transition-all ease-in text-6xl my-4 flex flex-row justify-start items-center border-black rounded hover:border-2 hover:shadow-2xl"
          >
            <BiSolidFridge />
            <span className="text-[30px] inline">Fridge</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
