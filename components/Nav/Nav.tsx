import Image from 'next/image';
import React from 'react';
import logo from '@/public/assets/images/witf-logo.webp';
import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import { IoLogIn } from 'react-icons/io5';
import MobileNav from '../MobileNav/MobileNav';
import { useNavigation } from '@/context/NavigationProvider';

const Nav = () => {
  const { isNavigationOpen, toggleNavigation } = useNavigation();

  return (
    <>
      <MobileNav />
      <nav className="w-full h-auto flex flex-row justify-center items-end">
        <div className="w-full flex flex-row justify-around items-center">
          <ul className="flex flex-row justify-start items-center ">
            <li className="mx-2">
              <a
                href="/"
                className="hover:text-gray-600 font-semibold text-primary duration-200 transition-all ease-in text-[30px] flex flex-col justify-center items-center"
              >
                <GoHomeFill />
                <span className="text-[15px]">Home</span>
              </a>
            </li>
            <li className="mx-2">
              <a
                href="/"
                className="hover:text-gray-600 font-semibold text-primary duration-200 transition-all ease-in text-[30px] flex flex-col justify-center items-center"
              >
                <IoLogIn />
                <span className="text-[15px]">Login</span>
              </a>
            </li>
            <li className="mx-2">
              <a
                href="/"
                className="hover:text-gray-600 font-semibold text-primary duration-200 transition-all ease-in text-[30px] flex flex-col justify-center items-center"
              >
                <BiSolidFridge />
                <span className="text-[15px]">Fridge</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full flex justify-center items-center">
          <Image src={logo} alt="Logo" className="w-[400px] h-auto" />
        </div>
        <div className="w-full flex flex-row justify-around items-center">
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
    </>
  );
};

export default Nav;
