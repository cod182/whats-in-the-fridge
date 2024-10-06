import { WelcomeArea } from '@/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession()

  // If signed in, navigate to /profile
  if (session?.user) {
    redirect('/profile');
  }

  return (
    <div className='grow'>
      <WelcomeArea />
    </div>
  );
};

export default page;
