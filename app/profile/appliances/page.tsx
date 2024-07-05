import { AppliancesList } from '@/components';
import { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Your Appliances',
}

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    redirect('/login');
  }


  return (
    <div className='py-4 grow'>
      <AppliancesList />
    </div>
  )
}

export default page