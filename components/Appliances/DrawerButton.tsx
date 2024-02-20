import { GiOpenedFoodCan } from 'react-icons/gi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import React from 'react'

const DrawerButton = ({ handleSelection, compartment, type, level, position, modalState, handleModalState, items }: PositionProps) => {
  return (
    <div

      className="group h-[80px] w-full text-center cursor-pointer border rounded-md flex flex-row items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
    >
      <div className='flex flex-col justify-center items0-center'>

        <p className='flex group-hover:hidden'>Drawer {level}</p>
        <div className=' group-hover:absolute group-hover:h-0 overflow-hidden w-full h-full flex flex-col justify-center items-center transition-all duration-200 ease-in-out'>
          <p>{items.length} Item{items.length != 1 && 's'}</p>
        </div>
      </div>
      <button type='button' onClick={
        () => {
          handleModalState('open');

        }} aria-label={`Add an item to ${compartment} compartment, on ${type} ${level}, position ${position}`}
        className={`${items.length > 0 ? 'w-[50%] hover:border-r-2 rounded-l-md' : 'w-full rounded-md'}  h-full text-center   hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200  transition-all duration-300 ease-in`}>
        <span className='text-[2.9vw]'>
          <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />
        </span>
      </button>
      {items.length > 0 &&
        <button
          type='button' onClick={
            () => {
              handleModalState('open');
              handleSelection(items, items[0].level, compartment, position)
            }} aria-label={`View items in ${compartment} compartment, on ${type} ${level}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
          <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
        </button>
      }


    </div>
  )
}

export default DrawerButton