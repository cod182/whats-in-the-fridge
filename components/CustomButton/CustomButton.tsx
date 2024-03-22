'use client'

import React from 'react'

type Props = {
  onClickFunc?: () => void;
  buttonStyles: string;
}

const CustomButton = ({ children }: any, { onClickFunc, buttonStyles }: Props) => {
  return (
    <button
      onClick={() => onClickFunc != undefined && onClickFunc()}
      className={`${buttonStyles}`}
    >
      {children}
    </button>
  )
}

export default CustomButton