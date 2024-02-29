import Image from 'next/image';
import { getServerSession } from 'next-auth';

const ProfileHome = async () => {
  const session = await getServerSession()

  return (
    <div className='px-2 my-4'>
      <div className='flex flex-row justify-start items-center'>
        <p className='mr-4'>Welcome {session?.user?.name}</p>
        <div className='w-[100px] h-[100px] aspect-ratio rounded-full overflow-hidden relative'>
          <Image src={`${session?.user?.image}`} alt={`${session?.user?.name}`} fill objectFit='cover' />
        </div>
      </div>
      <p className=''>This is your profile, where you can manage your appliances.</p>
    </div>
  )
}

export default ProfileHome