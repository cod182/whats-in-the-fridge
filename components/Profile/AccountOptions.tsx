import DeleteButton from '../DeleteUserButton/DeleteUserButton';
import React from 'react'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';

const AccountOptions = async () => {
  const session = await getServerSession(nextAuthOptions);


  return (
    <div className='w-full h-full'>
      <div className=''>
        <p className='font-semibold'>Delete Your Account</p>
        <p className='text-xs italic font-normal'>This will also delete any appliances, custom items and items added to any appliances.</p>
        <DeleteButton user={session?.user} apiRoute='/api/account/' />
      </div>
    </div>
  )
}
export default AccountOptions