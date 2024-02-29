'use client'

import { getSession } from 'next-auth/react';

const page = () => {

  const { data: session } = getSession()

  console.log(session)


  return (
    <div className='px-2'>
      <p>Welcome {session?.user?.firstName}</p>
      <p>This is your profile, where you can manage your appliances.</p>
    </div>
  )
}

export default page