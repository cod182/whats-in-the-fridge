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
        classes="top-[25%] left-[8%] absolute w-[30%]"
      >
        <div className="text-xl w-full font-semibold flex flex-col items-start justify-between gap-2 text-start">
          <p className="">
            Have you ever wondered what was in your fridge while you were
            shopping?
          </p>

          <p>Now you can!</p>
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
