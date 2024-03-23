import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session.user) {
    redirect('/login');
  }
  return (
    <div>Your Account</div>
  )
}

export default page