import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full h-[30px] border-t-[2px] border-gray-600 flex flex-row items-center gap-2 px-2 overflow-hidden'>
      <Link className='text-sm font-normal hover:text-white active:text-blue-100 transition-all duration-200 ease' href={`/privacy-policy`}>Privacy Policy</Link>
      <Link className='text-sm font-normal hover:text-white active:text-blue-100 transition-all duration-200 ease' href={`/cookies`}>Cookies</Link>
      <Link className='text-sm font-normal hover:text-white active:text-blue-100 transition-all duration-200 ease' href={`/terms`}>Terms & Conditions</Link>
      <p className='font-bold text-sm'>*Educational Use Only*</p>
    </footer>
  )
}

export default Footer