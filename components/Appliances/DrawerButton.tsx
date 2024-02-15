import { GiOpenedFoodCan } from 'react-icons/gi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import React from 'react'

const DrawerButton = ({ handleSelection, area, type, loc, position, modalState, handleModalState }: PositionProps) => {
  return (
    <div

      className="group h-[80px] w-full text-center cursor-pointer border rounded-md flex flex-row items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
    >
      <p className='flex group-hover:hidden'>Drawer {loc}</p>
      <button type='button' onClick={
        () => {
          handleModalState('open');
          handleSelection(area, type, loc, position)
        }} aria-label={`Add an item to ${area} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-r-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-l-md transition-all duration-300 ease-in'>
        <span className='text-[2.9vw]'>
          <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />
        </span>
      </button>
      <button type='button' onClick={
        () => {
          handleModalState('open');
          handleSelection(area, type, loc, position)
        }} aria-label={`View items in ${area} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
        <span className='text-[2.9vw]'>
          <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />

        </span>
      </button>
    </div>
  )
}

export default DrawerButton