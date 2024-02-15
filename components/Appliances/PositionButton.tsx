import { GiOpenedFoodCan } from 'react-icons/gi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import React from 'react'

const PositionButton = ({ handleSelection, area, type, loc, position, handleModalState, modalState }: PositionProps) => {
  return (
    <div className="group h-[80px] text-center cursor-pointer border rounded-md flex flex-row items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
    >
      <button type='button' onClick={
        () => {
          handleModalState('open');
          handleSelection(area, type, loc, position)
        }}
        aria-label={`Add an item to ${area} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-r-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-l-md transition-all duration-300 ease-in'>
        <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />
      </button>
      <button type='button' onClick={
        () => {
          handleModalState('open');
          handleSelection(area, type, loc, position)
        }} aria-label={`View items in ${area} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
        <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
      </button>
    </div >
  )
}

export default PositionButton