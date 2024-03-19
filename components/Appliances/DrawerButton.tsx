import { GiOpenedFoodCan } from 'react-icons/gi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import React from 'react'

const DrawerButton = ({ handleSelection, compartment, type, level, position, handleModalState, items }: PositionProps) => {
  return (
    <>
      {/* Desktop */}
      <div
        className="hidden md:flex group h-[80px] w-full text-center cursor-pointer border rounded-md flex-row items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
      >
        <div className='flex flex-col justify-center items-center'>

          <p className='flex group-hover:hidden'>Drawer {level}</p>
          <div className='flex flex-col items-center justify-center w-full h-full overflow-hidden transition-all duration-200 ease-in-out group-hover:absolute group-hover:h-0'>
            <p>{items.length} Item{items.length != 1 && 's'}</p>
          </div>
        </div>
        <button type='button' onClick={
          () => {
            handleModalState('open', 'add');
            handleSelection(items, level, compartment, type, position ? position : 128);

          }} aria-label={`Add an item to ${compartment} compartment, on ${type} ${level}, position ${position}`}
          className={`${items.length > 0 ? 'w-[50%] hover:border-r-2 rounded-l-md' : 'w-full rounded-md'}  h-full text-center  hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200  transition-all duration-300 ease-in`}>
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
              }} aria-label={`View items in ${compartment} compartment, on ${type} ${level}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
            <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
          </button>
        }
      </div>



      {/* Mobile */}
      <div
        className="h-[80px] w-full text-center cursor-pointer border rounded-md flex md:hidden flex-col items-center justify-around transition-all duration-200 ease-in  relative"
      >


        <div className='flex flex-col justify-center items-center h-[25%] border-b-[1px] w-full text-sm'>
          <p className='flex'>Drawer {level}</p>
        </div>


        <div className='h-[50%] w-full flex flex-row '>
          <button type='button' onClick={
            () => {
              handleModalState('open', 'add');
              handleSelection(items, level, compartment, type, position ? position : 128);

            }} aria-label={`Add an item to ${compartment} compartment, on ${type} ${level}, position ${position}`}
            className={`${items.length > 0 ? 'w-[50%] border-r-[1px] border-gray-800 rounded-l-md' : 'w-full rounded-md'} h-full text-center flex flex-row justify-center items-center bg-gray-200/80 hover:bg-gray-600/80 hover:text-gray-200 transition-all duration-300 ease-in`}>
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
                }}
              aria-label={`View items in ${compartment} compartment, on ${type} ${level}, position ${position}`}
              className='w-[50%] h-full text-center border-l-[1px] border-gray-800 flex flex-row justify-center items-center hover:bg-gray-600/80 bg-gray-200/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'
            >
              <GiOpenedFoodCan className='text-2xl max-h-[40px] aspect-square' />
            </button>
          }
        </div>

        <div className='flex flex-col justify-center items-center h-[25%] border-t-[1px] w-full text-sm'>
          <div className='flex flex-col items-center justify-center w-full h-full overflow-hidden transition-all duration-200 ease-in-out'>
            <p>{items.length} Item{items.length != 1 && 's'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DrawerButton