'use client'

import { IoLogOut } from "react-icons/io5"
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: '/' })} className='group hover:text-gray-600 font-semibold text-primary duration-100 transition-all ease text-[30px] flex flex-col justify-center items-center'>
        <IoLogOut className={`group-hover:translate-y-[-5px] transition-all duration-200 ease`} />
        <span className={`text-[15px] hidden sm:inline`}>Logout</span>
      </button>
    </div >
  )
}

export default SignOutButton