import { Metadata } from 'next'
import { ProfileNav } from '@/components'
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: {
    template: 'WITF?! | %s',
    default: 'Profile', // a default is required when creating a template
  },
}

const layout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    redirect('/login');
  }
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <div className='grow'>
      <ProfileNav path={pathname} />
      <div className='mx-2 sm:mx-4'>
        {children}
      </div>
    </div>
  )
}



export default layout