import { GiOpenedFoodCan } from 'react-icons/gi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import React from 'react'

const PositionButton = ({ handleSelection, compartment, type, level, position, handleModalState, items }: PositionProps) => {
  return (
    <>

      {/* Desktop */}
      <div className="hidden md:flex group h-[80px] text-center cursor-pointer border rounded-md flex-row items-center justify-around transition-all duration-300 ease-in hover:bg-gray-500/50 relative"
      >
        <button type='button' onClick={
          () => {
            // Add Item
            handleModalState('open', 'add');
            handleSelection(items, level, compartment, type, position ? position : 128);
          }}
          aria-label={`Add an item to ${compartment} compartment, on ${type} ${level}, position ${position}`}
          className={`${items.length > 0 ? 'w-[50%] hover:border-r-2 rounded-l-md' : 'w-full rounded-md'}  h-0 overflow-hidden text-center group-hover:h-full flex group-hover:relative absolute opacity-0 group-hover:opacity-100 flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200  transition-all duration-300 ease-in`}>
          <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />

        </button>
        {items.length > 0 &&
          <button
            type='button' onClick={
              () => {
                handleModalState('open', 'view');
                handleSelection(items, items[0].level, compartment, type, position ? position : 128)
              }} aria-label={`View items in ${compartment} compartment, on ${type} ${level}, position ${position}`} className='w-[50%] h-0 overflow-hidden text-center hover:border-l-2  group-hover:h-full flex group-hover:relative absolute opacity-0 group-hover:opacity-100 flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
            <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
          </button>
        }
        <div className='flex flex-col items-center justify-center w-full h-full overflow-hidden transition-all duration-200 ease-in-out group-hover:absolute group-hover:h-0'>
          <p>{items.length} Item{items.length != 1 && 's'}</p>
        </div>
      </div >



      {/* Mobile */}
      <div className="h-[80px] text-center cursor-pointer border rounded-md flex md:hidden flex-col items-center justify-around transition-all duration-300 ease-in relative"
      >
        <div className='w-full h-[80%] flex flex-row'>

          <button type='button' onClick={
            () => {
              // Add Item
              handleModalState('open', 'add');
              handleSelection(items, level, compartment, type, position ? position : 128);
            }}
            aria-label={`Add an item to ${compartment} compartment, on ${type} ${level}, position ${position}`}
            className={`${items.length > 0 ? 'w-[50%] border-r-[1px] rounded-l-md' : 'w-full rounded-md'}  h-full overflow-hidden text-center flex relative flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200  transition-all duration-300 ease-in`}>
            <IoIosAddCircleOutline className='text-2xl max-h-[40px] aspect-square' />

          </button>
          {items.length > 0 &&
            <button
              type='button' onClick={
                () => {
                  handleModalState('open', 'view');
                  handleSelection(items, items[0].level, compartment, type, position ? position : 128)
                }}
              aria-label={`View items in ${compartment} compartment, on ${type} ${level}, position ${position}`}
              className='w-[50%]  overflow-hidden text-center border-l-[1px] h-full flex relative flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'
            >
              <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
            </button>
          }
        </div>
        <div className='flex flex-col items-center justify-center w-full h-[35%] overflow-hidden transition-all duration-200 ease-in-out border-t-[1px] text-md'>
          <p>{items.length} Item{items.length != 1 && 's'}</p>
        </div>
      </div >
    </>
  )
}

export default PositionButton