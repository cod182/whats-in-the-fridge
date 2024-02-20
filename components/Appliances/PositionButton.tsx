import { GiOpenedFoodCan } from 'react-icons/gi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import React from 'react'

const PositionButton = ({ handleSelection, compartment, type, loc, position, handleModalState, modalState, items }: PositionProps) => {
  return (
    <div className="group h-[80px] text-center cursor-pointer border rounded-md flex flex-row items-center justify-around transition-all duration-300 ease-in hover:bg-gray-500/50 relative"
    >
      <button type='button' onClick={
        () => {
          handleModalState('open');
        }}
        aria-label={`Add an item to ${compartment} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-r-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-l-md transition-all duration-300 ease-in'>
        <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />

      </button>
      <button type='button' onClick={
        () => {
          handleModalState('open');
          handleSelection(items)
        }} aria-label={`View items in ${compartment} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
        <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
      </button>
      <div className='group-hover:absolute group-hover:h-0 overflow-hidden w-full h-full flex flex-col justify-center items-center transition-all duration-200 ease-in-out'>
        <p>{items.length} Item{items.length != 1 && 's'}</p>
      </div>
    </div >
  )
}

export default PositionButton