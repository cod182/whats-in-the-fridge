'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  children: JSX.Element;
  delayNumber?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
  classes?: string;
};

const FadeInHOC = ({
  children,
  delayNumber,
  direction,
  distance,
  classes,
}: Props) => {
  const movementDistance = distance ? distance : 5;
  const movementDirection = direction ? direction : 'up';
  const movementDelay = delayNumber ? delayNumber.toString() + 'ms' : '1000ms';

  // State for visibility
  const [isVisible, setIsVisible] = useState(false);
  // On load only
  useEffect(() => {
    // Trigger the fade-in effect when the component mounts
    setIsVisible(true);
  }, []);

  // styles variable

  // gets the XY direction
  const movementTravel = () => {
    let xy;
    let spec = '';

    if (movementDirection === 'left') {
      xy = 'X';
      spec = '-';
    }

    if (movementDirection === 'down') {
      xy = 'Y';
      spec = '-';
    }

    if (movementDirection === 'up') {
      xy = 'Y';
    }
    if (movementDirection === 'right') {
      xy = 'X';
    }

    return { xy, spec };
  };
  // calls the movementTravel function
  let calcMovement = movementTravel();

  // Settings the styles for the div
  let styles = isVisible
    ? {
        transform: `translate${calcMovement.xy}(0px)`,
        transitionDuration: movementDelay,
      }
    : {
        transform: `translate${calcMovement.xy}(${calcMovement.spec}${movementDistance}px)`,
        transitionDuration: movementDelay,
      };

  return (
    <div
      className={`ease-in-out transition-all ${classes} h-auto ${
        isVisible ? `opacity-100 ` : `opacity-0 `
      }`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default FadeInHOC;
