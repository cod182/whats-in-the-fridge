import Image from 'next/image';
import React from 'react';
import background from '@/public/assets/images/background.webp';
import fridge from '@/public/assets/images/fridge.webp';
import window from '@/public/assets/images/window.webp';
import { FadeInHOC } from '..';

const WelcomeArea = () => {
  return (
    <div className="relative">
      <Image src={background} alt="image of fridge" className="w-full h-auto" />
      <FadeInHOC
        delayNumber={0}
        direction="left"
        distance={500}
        classes="top-[20%] left-[41%] absolute"
      >
        <Image src={fridge} alt="image of fridge" className="w-full" />
      </FadeInHOC>
    </div>
  );
};

export default WelcomeArea;
