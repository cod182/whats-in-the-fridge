import DeleteButton from '../DeleteButton/DeleteButton';
import React from 'react'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';

const AccountOptions = async () => {
  const session = await getServerSession(nextAuthOptions);


  return (
    <div className='w-full h-full'>
      <hr className='border-[1px]' />

      <div className='my-2'>
        <p className='font-semibold'>Delete Your Account</p>
        <p className='text-xs font-normal italic'>This will also delete any appliances, custom items and items added to any appliances.</p>
        <DeleteButton user={session?.user} apiRoute='/api/account/' />
      </div>

      <hr className='border-[1px]' />

    </div>
  )
}
export default AccountOptions