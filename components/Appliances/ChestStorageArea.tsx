import { GiOpenedFoodCan } from 'react-icons/gi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import React from 'react'
type Props = PositionProps & { rotate?: string };

const ChestStorageArea = ({ handleSelection, compartment, type, level, position, handleModalState, items, rotate }: Props) => {

  return (
    <div
      className="hidden md:flex group h-full w-full text-center cursor-pointer border rounded-md flex-col items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
    >
      <div style={{ transform: `rotate(${rotate}deg)` }} className='flex flex-col justify-center items-center h-full group-hover:absolute group-hover:h-0 overflow-hidden transition-all duration-200 ease'>

        <p className='flex'>Area {level}</p>
        <p>{items.length} Item{items.length != 1 && 's'}</p>


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