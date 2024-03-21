'use client'

import { FaChevronCircleDown, FaChevronCircleUp, FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'

const ItemSearch = () => {
  // States
  const [searchState, setSearchState] = useState(false)

  return (
    <div className={`flex flex-wrap flex-col items-start my-2 p-2 bg-blue-200 rounded-md w-full sm:w-fit overflow-hidden h-fit transition-all ease duration-300`}>
      <div className='flex flex-row flex-wrap items-center justify-start w-full sm:w-fit'>
        <p
          onClick={() => setSearchState((prev) => !prev)}
          className='inline bg-blue-300 hover:bg-blue-400 active:bg-blue-500 px-[5px] py-[2px] rounded-md cursor-pointer sm:text-start text-center w-full sm:w-fit'
        >Search <FaChevronCircleUp className={`${!searchState ? 'sm:rotate-90 rotate-180' : ' sm:rotate-[-90deg]'} transition-all duration-300 ease inline`} />
        </p>
        <div className={`transition-all duration-200 ease overflow-hidden rounded-md ${searchState ? 'mt-2 sm:mt-0 w-full sm:w-fit sm:max-w-full sm:px-4' : 'max-w-0 p-0'}`}>
          <form className={`flex flex-row items-start sm:items-center`}>
            <input type="text" className='rounded-md border-[1px] border-black px-4 text-gray-500 h-[50px] sm:h-[30px]' placeholder='Search for an item' />
          </form>
        </div>
      </div>
      {/* Results */}
      <div className={`${searchState ? 'max-h-[400px] w-full mt-2' : 'max-h-[0px] w-[0] mt-0'}  flex flex-col justify-start items-start overflow-hidden transition-all duration-200 ease`}>
        <p className='mb-2 font-semibold underline'>Results <span>18</span></p>
        <div className='grid grid-cols-4 gap-2 w-full max-h-[300px] overflow-scroll p-4'>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>1</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>2</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>3</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>4</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>5</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>6</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>7</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>8</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>9</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>1</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>2</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>3</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>4</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>5</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>6</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>7</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>8</p>
          <p className='w-[200px] h-[50px] bg-gray-600/60 rounded-md'>9</p>
        </div>
      </div>


    </div>
  )
}

export default ItemSearch