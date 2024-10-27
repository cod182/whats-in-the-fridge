import { FadeInHOC, ProfileHome } from "@/components"

import { Metadata } from 'next'
import ProfileNotifications from '@/components/Profile/ProfileNotifications';
import SharingInvites from "@/components/Profile/SharingInvites";
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
    <div className="px-2 grow">
      <ProfileHome user={session.user} />
      <FadeInHOC delayNumber={600} direction='down'>
        <hr className='my-4 border-2 border-black' />
      </FadeInHOC>
      <ProfileNotifications user={session.user} />
      {/* Sharing Invites section */}
      <SharingInvites email={session.user.email} />

    </div>
  )
}

export default page