import { GiOpenedFoodCan } from 'react-icons/gi';
import Image from 'next/image';
import { IoIosAddCircleOutline } from 'react-icons/io';
import React from 'react'
type Props = PositionProps & { rotate?: string };

const ChestStorageArea = ({ handleSelection, compartment, type, level, position, handleModalState, items, rotate }: Props) => {

  return (
    <div
      className="relative flex-col items-center justify-around hidden w-full h-full text-center transition-all duration-200 ease-in border rounded-md cursor-pointer md:flex group hover:bg-gray-500/50"
    >
      <div style={{ transform: `rotate(${rotate}deg)` }} className='flex flex-col items-center justify-center h-full overflow-hidden transition-all duration-200 group-hover:absolute group-hover:h-0 ease'>

        <p className='flex'>Area {level}</p>
        <p>{items.length} Item{items.length != 1 && 's'}</p>
        {compartment === 'freezer' && (
          <Image src='/assets/images/frozen.svg' alt='freezer icon' className='absolute text-blue-500 fill-current top-10' width={30} height={30} />
        )}

      </div>

      <button type='button' onClick={
        () => {
          handleModalState('open', 'add');
          handleSelection(items, level, compartment, type, position ? position : 128);

        }} aria-label={`Add an item to ${compartment} compartment, on ${type} ${level}, position ${position}`}
        className={`${items.length > 0 ? 'h-[50%] hover:border-r-2 rounded-t-md' : 'h-full rounded-md'}  w-full text-center  hidden group-hover:flex flex-col justify-center items-center hover:bg-gray-600/80 hover:text-gray-200  transition-all duration-300 ease-in`}>
        <span className='text-[2.9vw]'>
          <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />
        </span>
      </button>

      {items.length > 0 &&
        <button
          type='button' onClick={
            () => {
              handleModalState('open', 'view');
              handleSelection(items, items[0].level, compartment, type, position ? position : 128)
            }} aria-label={`View items in ${compartment} compartment, on ${type} ${level}, position ${position}`} className='h-[50%] w-full text-center hover:border-l-2 hidden group-hover:flex flex-col justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-b-md transition-all duration-300 ease-in text-xl'>
          <GiOpenedFoodCan className={`text-2xl max-h-[40px] aspect-square`} style={{ transform: `rotate(${rotate}deg)` }} />
        </button>
      }
    </div>
  )
}

export default ChestStorageArea