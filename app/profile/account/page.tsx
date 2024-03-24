import { AccountOptions, PageTitle } from '@/components';

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


    <div className='sm:px-5 grow'>
      <h1 className='my-2'>
        <PageTitle title='Your Account Options' titleClasses='text-[20px] md:text-[30px] text-gray-100 font-semibold' underlineClasses='border-gray-100' />
      </h1>
      <AccountOptions />
    </div>


  )
}

export default page