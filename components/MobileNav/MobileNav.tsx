'use client';

import { useNavigation } from '@/context/NavigationProvider';
import { useState } from 'react';

const MobileNav = () => {
  // Mobile Nav State
  const { isNavigationOpen, toggleNavigation } = useNavigation();

  return (
    <div
      className={`block sm:hidden bg-white z-[999] w-full ${
        isNavigationOpen ? 'h-[100dvh] overflow-scroll' : 'h-0 overflow-hidden'
      }`}
    ></div>
  );
};

export default MobileNav;
