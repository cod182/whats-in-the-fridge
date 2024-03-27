import FadeInHOC from '../FadeInHOC/FadeInHOC';
import Image from 'next/image';

type Props = {
  user: { name: string; email: string; image: string, id: number }
}
const ProfileHome = ({ user }: Props) => {

  return (
    <div className='my-4 grow'>
      <FadeInHOC delayNumber={500} direction='down'>
        <div className='flex flex-row justify-start items-center'>
          <div className='w-[50px] h-[50px] aspect-ratio rounded-full overflow-hidden relative'>
            <Image src={`${user.image}`} alt={`${user.name}`} width={50} height={50} />
          </div>
          <p className='ml-4 text-lg'>Welcome {user.name}!</p>
        </div>
      </FadeInHOC>
      <FadeInHOC delayNumber={600} direction='down'>
        <hr className='my-4 border-black border-2' />
      </FadeInHOC>

      <FadeInHOC delayNumber={700} direction='down'>
        <p className='mt-4'>This is your profile, where you can manage your appliances.</p>
      </FadeInHOC>
    </div>

  )
}

export default ProfileHome