import FadeInHOC from '../FadeInHOC/FadeInHOC';
import Image from 'next/image';

type Props = {
  user: { name: string; email: string; image: string, id: number }
}
const ProfileHome = ({ user }: Props) => {

  return (
    <div className='my-4 grow'>
      <FadeInHOC delayNumber={500} direction='down'>
        <div className='flex flex-row items-center justify-space'>
          <div className='w-[50px] h-[50px] aspect-square rounded-full overflow-hidden'>
            <Image src={`${user.image}`} alt={`${user.name}`} width={50} height={50} />
          </div>
          <p className='ml-4 text-lg'>Welcome {user.name}!</p>
        </div>
      </FadeInHOC>
      <FadeInHOC delayNumber={600} direction='down'>
        <hr className='my-4 border-2 border-black' />
      </FadeInHOC>

      <FadeInHOC delayNumber={700} direction='down'>
        <>
          <p className='mt-4 italic'>This is your profile, where you can add and manage your appliances.</p>
          {/* <div className='flex flex-row items-center justify-start w-full gap-x-2'>
            <Link aria-label='View All Appliances' className='transition-all duration-200 ease text-[12px] text-center rounded-md w-[50px] h-[50px] hover:bg-[#3b82f66e] border-[1px] border-black flex flex-col justify-center items-center hover:scale-105' href='/profile/appliances'>View</Link>
            <Link aria-label='Add An Appliance' className='transition-all duration-200 ease text-[12px] text-center rounded-md w-[50px] h-[50px] hover:bg-[#3b82f66e] border-[1px] border-black flex flex-col justify-center items-center hover:scale-105' href='/profile/add-appliance'>Add</Link>
          </div> */}
        </>
      </FadeInHOC>

    </div>

  )
}

export default ProfileHome