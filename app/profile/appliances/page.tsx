import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession()

  if (!session?.user) {
    redirect('/login');
  }
  return (
    <div className='px-2'>All Appliances</div>
  )
}

export default page