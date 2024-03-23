import { AppliancesList } from '@/components';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    redirect('/login');
  }


  return (
    <div className='px-2 py-4 grow'>
      <AppliancesList />
    </div>
  )
}

export default page