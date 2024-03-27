import { FadeInHOC, ProfileHome } from "@/components"

import { Metadata } from 'next'
import ProfileNotifications from '@/components/Profile/ProfileNotifications';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/lib/nextAuthOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Profile Home',
}
const page = async () => {

  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="grow px-2">
      <ProfileHome user={session.user} />
      <FadeInHOC delayNumber={600} direction='down'>
        <hr className='my-4 border-black border-2' />
      </FadeInHOC>
      <ProfileNotifications user={session.user} />
    </div>
  )
}

export default page