'use client'

import Image from "next/image"
import { Triangle } from 'react-loader-spinner'
import fridge from '../../public/assets/images/fridge.webp'

const FridgeLoader = () => {
  return (
    <>
      <Triangle height="200"
        width="200"
        color="#fff"
        ariaLabel="loading"
      />
      {/* <Image src={fridge} alt='loading fridge' height={346} width={200} className="animate-pulse" /> */}
      <p className="font-semibold animate-bounce text-white mt-4">Loading...</p>
    </>
  )
}

export default FridgeLoader