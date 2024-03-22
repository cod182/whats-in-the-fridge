import { FadeInHOC } from '..';
import Image from 'next/image';

const WelcomeArea = () => {

  return (
    <div className='relative'>
      {/* Background Image */}
      <Image
        src='/assets/images/background.webp'
        alt="background house scene"
        className="w-full h-auto select-none"
        height={1000}
        width={1000}
      />


      {/* Text Area */}
      <FadeInHOC
        delayNumber={500}
        direction="left"
        distance={500}
        classes="sm:top-[25%] sm:left-[8%]  w-full xs:absolute sm:w-[30%] mx-auto p-4 xs:p-0 bg-primary xs:bg-transparent text-white xs:text-black xs:bottom-[0] sm:max-w-[387px]"
      >
        <div className="text-xs xs:text-sm sm:text-md lg:text-xl w-full font-semibold xs:pl-4 xs:pb-4  flex flex-col items-start justify-between gap-2 text-start overflow-hidden max-h-[50%]">
          <p className="">
            Have you ever wondered what was in your fridge while you were
            shopping?&nbsp;<span>Now you can!</span>
          </p>

          <p>Just fill up your fridge and check it whilst you&apos;re out.</p>
        </div>
      </FadeInHOC>

      {/* Fridge Image */}
      <FadeInHOC
        delayNumber={500}
        direction="up"
        distance={500}
        classes="top-[20%] left-[41%] absolute w-[20%] max-w-[257px]"
      >
        <a href="/profile" className="" >
          <Image
            src='/assets/images/fridge.webp'
            alt="image of fridge"
            className="w-full hover:drop-shadow-2xl shadow-primary shadow-none transition-all ease-in duration-200 overflow-hidden"
            width={230}
            height={399}
          />
        </a>
      </FadeInHOC >

      {/* Window Image */}
      < FadeInHOC
        delayNumber={500}
        direction="right"
        distance={500}
        classes="top-[18%] left-[70%] absolute w-[20%] max-w-[258px] select-none overflow-hidden"
      >
        <Image src={`/assets/images/window.webp`} alt="image of window" className="select-none" width={258} height={258} />
      </ FadeInHOC>
    </div >
  );
};

export default WelcomeArea;
