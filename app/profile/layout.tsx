import { ProfileNav } from '@/components'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const layout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const session = await getServerSession()
  console.log(session)
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <ProfileNav />
      {children}
    </>
  )
}



export default layout