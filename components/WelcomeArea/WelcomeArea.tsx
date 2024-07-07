import { FadeInHOC } from '..';
import Image from 'next/image';
import addItems from '@/public/assets/images/add_items.webp'
import createAppliance from '@/public/assets/images/create_appliance.webp'
import logoLarge from '@/public/assets/logoWhite.webp'
import remoteConnect from '@/public/assets/images/remote_connection.webp'

const WelcomeArea = () => {

  return (
    <div className='relative flex flex-col w-full px-2'>

      <div className='relative flex flex-col items-center justify-end w-full gap-4 mt-10 sm:flex-row'>
        {/* Logo */}
        <FadeInHOC
          delayNumber={2000}
          direction="up"
          distance={0}
        >
          <div className='sm:w-full w-[50%] mx-auto'>
            <Image src={logoLarge} alt='Logo Large' width={450} height={450} className='' />
          </div>
        </FadeInHOC>

        {/* Text Area */}
        <div className='w-full sm:w-[50%] h-full flex-col justify-normal items-center'>
          <FadeInHOC
            delayNumber={1500}
            direction="up"
            distance={0}
          >
            <div className="font-semibold text-center text-white md:text-lg sm:text-start">

              <p className="">
                Have you ever wondered what was in your fridge while you were
                shopping?&nbsp;
              </p>
              <p className='font-bold'>Now you can!</p>

              <p>Just fill up your fridge and check it whilst you&apos;re out.</p>
            </div>
          </FadeInHOC>

          {/* Call To Action */}
          <div className='w-full mx-auto gap-2 my-10 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 items-center justify-center'>

            {/* Text Area */}
            <div className='w-full h-full flex justify-center items-center'>
              <FadeInHOC
                delayNumber={1500}
                direction="up"
                distance={50}
              >
                <p className="font-semibold text-center text-white md:text-lg">
                  Register for an account and always know what&apos;s in your fridge.
                </p>


              </FadeInHOC>
            </div>
            {/* End Text */}

            {/* BUtton */}
            <FadeInHOC
              direction="up"
              distance={60}
              classes='mx-auto w-full px-6 sm:px-0'
            >

              <a href='/login' aria-label='login / sign up link' className='sm:max-w-[140px] w-full h-fit px-6 py-2 sm:py-4 rounded-md border-[1px] border-white text-white hover:bg-blue-500/50 flex flex-nowrap justify-center items-center transition-all duration-300 ease'>
                Sign Up
              </a>

            </FadeInHOC>

            {/* End Button */}
          </div>

        </div>

      </div>


      {/* Info Boxes */}
      <div className='grid items-center justify-center w-full grid-cols-1 grid-rows-3 sm:gap-2 gap-10 p-0 mx-auto mb-10 xxxs:px-10 xs:grid-rows-none xs:grid-cols-3'>
        {/* Create Appliance */}
        <FadeInHOC
          delayNumber={1000}
          direction="up"
          distance={200}
        >
          <div className='gap-4 flex flex-col items-center justify-center w-full h-full p-4 mx-auto aspect-square max-w-full xxs:max-w-[150px] sm:max-w-[300px]'>
            <div>
              <Image src={createAppliance} alt='' width={150} height={150} />
            </div>
            <p className='font-semibold text-center text-white'>Create your Appliance</p>
          </div>
        </FadeInHOC>

        {/* Add Your Items */}
        <FadeInHOC
          delayNumber={1250}
          direction="up"
          distance={200}
        >
          <div className='gap-4 flex flex-col items-center justify-center w-full h-auto p-4 mx-auto aspect-square max-w-full xxs:max-w-[150px] sm:max-w-[300px]'>
            <div>
              <Image src={addItems} alt='' width={150} height={150} />
            </div>
            <p className='font-semibold text-center text-white'>Add Your Items</p>
          </div>
        </FadeInHOC>

        {/* Access anywhere */}
        <FadeInHOC
          delayNumber={1500}
          direction="up"
          distance={200}
        >
          <div className='gap-4 flex flex-col items-center justify-center w-full h-full p-4 mx-auto aspect-square max-w-full xxs:max-w-[150px] sm:max-w-[300px]'>
            <div>
              <Image src={remoteConnect} alt='' width={150} height={150} />
            </div>
            <p className='font-semibold text-center text-white'>View Anywhere!</p>
          </div>
        </FadeInHOC>
      </div>




    </div >
  );
};

export default WelcomeArea;
