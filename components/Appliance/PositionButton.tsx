import React from 'react'
import { GiOpenedFoodCan } from 'react-icons/gi'
import { IoIosAddCircleOutline } from 'react-icons/io'

const PositionButton = ({ handleSelection, area, type, loc, position }: PositionProps) => {
  return (
    <div className="group h-[80px] text-center cursor-pointer border rounded-md flex flex-row items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
    >
      <a href='#' aria-label={`Add an item to ${area} compartment, on ${type} ${loc}, position ${position}`} onClick={() => handleSelection(area, type, loc, position)} className='w-[50%] h-full text-center hover:border-r-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-l-md transition-all duration-300 ease-in'>
        <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />
      </a>
      <a href='#' aria-label={`View items in ${area} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
        <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
      </a>
    </div>
  )
}

export default PositionButton