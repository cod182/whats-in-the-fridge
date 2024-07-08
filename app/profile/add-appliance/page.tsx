import { ApplianceForm, PageTitle } from '@/components';

import { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Add Appliance',
}

const page = async () => {
  const session = await getServerSession(nextAuthOptions); if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className='max-w-2xl py-4 grow mx-auto'>
      <PageTitle title='Add your appliance' titleClasses='text-[20px] md:text-[30px] text-[black] font-semibold' underlineClasses='border-[black]' />
      <ApplianceForm formType='Create' userId={session.user.id} />
    </div>
  )
}

export default page