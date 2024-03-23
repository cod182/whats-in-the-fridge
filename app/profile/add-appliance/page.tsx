import { ApplianceForm, PageTitle } from '@/components';

import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(nextAuthOptions); if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className='max-w-2xl py-4 mx-auto'>
      <PageTitle title='Add your appliance' titleClasses='text-[20px] md:text-[30px] text-[#202074] font-semibold' underlineClasses='border-[#202074]' />
      <ApplianceForm formType='Create' userId={session.user.id} />
    </div>
  )
}

export default page