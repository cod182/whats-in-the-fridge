import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession()

  if (!session?.user) {
    redirect('/login');
  }
  return (
    <div>Your Account</div>
  )
}

export default page