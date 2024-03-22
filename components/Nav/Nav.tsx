"use server"

import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import Image from 'next/image';
import { IoLogIn, } from 'react-icons/io5';
import MobileNav from '../MobileNav/MobileNav';
import SignOutButton from './SignOutButton';
import { getServerSession } from 'next-auth';
import logo from '@/public/assets/images/witf-logo.webp';

const Nav = async () => {
  const session = await getServerSession()
  return (
    <>
      <nav className="flex-row items-center justify-center hidden w-full h-auto sm:items-end sm:flex">
        <div className="flex flex-row items-center justify-between w-full sm:justify-around">
          <ul className="flex-row items-center justify-start hidden sm:flex ">
            <li className="mx-2">
              <a
                href="/"
                className="group hover:text-gray-600 font-semibold text-primary duration-100 transition-all ease text-[30px] flex flex-col justify-center items-center"
              >
                <GoHomeFill className='group-hover:translate-y-[-5px] transition-all duration-200 ease' />
                <span className="text-[15px] hidden sm:inline">Home</span>
              </a>
            </li>
            {session?.user ? (

              <li className="mx-2">
                <a
                  href="/profile"
                  className="group hover:text-gray-600 font-semibold text-primary duration-100 transition-all ease text-[30px] flex flex-col justify-center items-center"
                >
                  <BiSolidFridge className='group-hover:translate-y-[-5px] transition-all duration-200 ease' />
                  <span className="text-[15px] hidden sm:inline">Account</span>
                </a>
              </li>) : null}
          </ul>
        </div>
        <div className="flex items-center justify-center w-full">
          <Image src={logo} alt="Logo" className="w-[400px] h-auto" />
        </div>
        <div className="flex-row items-center justify-around hidden w-full sm:flex">
          <ul className="flex flex-row items-center justify-start">

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
                <SignOutButton />
              </li>
            )}

          </ul>
        </div>
      </nav >
      <MobileNav />
    </>
  );
};

export default Nav;
