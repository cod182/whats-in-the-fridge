"use server"

import { IoAdd, IoLogIn, IoLogOut } from 'react-icons/io5';

import { BiSolidFridge } from 'react-icons/bi';
import { GoHomeFill } from 'react-icons/go';
import Image from 'next/image';
import MobileNav from '../MobileNav/MobileNav';
import SignOutButton from './SignOutButton';
import { getServerSession } from 'next-auth';
import logo from '@/public/assets/images/witf-logo.webp';

const Nav = async () => {
  const session = await getServerSession()
  return (
    <>
      <nav className="w-full h-auto flex-row justify-center items-center sm:items-end bg-white hidden sm:flex">
        <div className="w-full flex flex-row justify-between sm:justify-around items-center">
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
