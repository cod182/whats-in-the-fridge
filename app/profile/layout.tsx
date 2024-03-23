import { ProfileNav } from '@/components'
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

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
      {children}
    </div>
  )
}



export default layout