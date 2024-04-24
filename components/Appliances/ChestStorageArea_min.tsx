import { GiOpenedFoodCan } from 'react-icons/gi';
import Image from 'next/image';
import { IoIosAddCircleOutline } from 'react-icons/io';
import React from 'react'
type Props = {
  handleMoveItem: (level: number, compartment: string, locationType: string, position?: number) => void
  compartment: string;
  locationType: string;
  level: number;
  position?: number;
  currentPlacement: {
    compartment: string;
    locationType: string;
    level: number;
    position?: number;
  }
  rotate?: string;
}

const ChestStorageArea_min = ({ handleMoveItem, locationType, compartment, level, position, currentPlacement, rotate }: Props) => {

  return (
    <div
      className={`hover:scale-105 hover:bg-green-400 hover:shadow-md relative flex flex-col items-center justify-around w-full h-full text-center transition-all duration-200 ease-in border rounded-md cursor-pointer group ${compartment === currentPlacement.compartment && locationType === currentPlacement.locationType && level === currentPlacement.level ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700' : 'bg-gray-400'}`}
      onClick={() => handleMoveItem(level, compartment, locationType, position)}
    >
      <div style={{ transform: `rotate(${rotate}deg)` }} className='flex flex-col items-center justify-center w-full h-full overflow-hidden transition-all duration-200 ease'

      >

        <p className='flex'>Area {level}</p>
        {compartment === 'freezer' && (
          <Image src='/assets/images/frozen.svg' alt='freezer icon' className='absolute text-blue-500 fill-current top-10' width={30} height={30} />
        )}
      </div>
    </div>
  )
}

export default ChestStorageArea_min