import Image from 'next/image';
import React from 'react';
import background from '@/public/assets/images/background.webp';
import fridge from '@/public/assets/images/fridge.webp';
import window from '@/public/assets/images/window.webp';
import { FadeInHOC } from '..';

const WelcomeArea = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <Image
        src={background}
        alt="image of fridge"
        className="w-full h-auto select-none"
      />
      {/* Text Area */}
      <FadeInHOC
        delayNumber={500}
        direction="left"
        distance={500}
        classes="sm:top-[25%] sm:left-[8%] xs:bottom-[0] w-full xs:absolute sm:w-[30%] mx-auto p-4 xs:p-0 bg-primary xs:bg-transparent text-white xs:text-black"
      >
        <div className="text-xs xs:text-sm sm:text-md lg:text-xl w-full font-semibold xs:pl-4 xs:pb-4  flex flex-col items-start justify-between gap-2 text-start overflow-hidden max-h-[50%]">
          <p className="">
            Have you ever wondered what was in your fridge while you were
            shopping?&nbsp;<span>Now you can!</span>
          </p>

          <p>Just fill up your fridge and check it whilst you're out.</p>
        </div>
      </FadeInHOC>

      {/* Fridge Image */}
      <FadeInHOC
        delayNumber={500}
        direction="up"
        distance={500}
        classes="top-[20%] left-[41%] absolute w-[20%]"
      >
        <a href="#" className="">
          <Image
            src={fridge}
            alt="image of fridge"
            className="w-full hover:drop-shadow-2xl shadow-primary shadow-none transition-all ease-in duration-200"
          />
        </a>
      </FadeInHOC>

      {/* Window Image */}
      <FadeInHOC
        delayNumber={500}
        direction="right"
        distance={500}
        classes="top-[18%] left-[70%] absolute w-[20%] select-none"
      >
        <Image src={window} alt="image of window" className="select-none" />
      </FadeInHOC>
    </div>
  );
};

export default WelcomeArea;
