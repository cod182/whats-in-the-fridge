import { AccountOptions, PageTitle } from '@/components';

import ManageCustomItems from "@/components/AddingItems/ManageCustomItems";
import { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings',
}
const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    redirect('/login');
  }
  return (


    <div className='grow py-2'>
      <h1 className='my-2'>
        <PageTitle title='Your Account Options' titleClasses='text-[20px] md:text-[30px] text-black font-semibold' underlineClasses='border-black' />
      </h1>
      <hr className='border-[1px] my-2' />
      <ManageCustomItems />
      <hr className='border-[1px] my-2' />
      <AccountOptions />
      <hr className='border-[1px] my-2' />
    </div>


  )
}

export default page