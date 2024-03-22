'use client'

import { FaChevronCircleDown, FaChevronCircleUp, FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'

type Props = {
  items: applianceItem[];
}
const ItemSearch = ({ items }: Props) => {
  // States
  const [searchState, setSearchState] = useState(false);
  const [searchResults, setSearchResults] = useState<applianceItem[]>()
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setSearchResults([]); // Reset search results when the search term changes
    setShowResults(true);

    if (searchTerm.trim() === "") {
      setTimeout(() => {
        if (searchTerm.trim() === "") {
          setShowResults(false); // Hide the search results after 2 seconds
        }
      }, 1000);
      return; // Exit early if the search term is empty
    }

    const results = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }

  return (
    <div className={`flex flex-wrap flex-col items-start my-2 p-2 bg-blue-200 rounded-md w-full sm:w-fit overflow-hidden h-fit transition-all ease duration-300`}>
      <div className='flex flex-row flex-wrap items-center justify-start w-full sm:w-fit'>
        <p
          onClick={() => { setSearchState((prev) => !prev); setShowResults(false); }}
          className='inline bg-blue-300 hover:bg-blue-400 active:bg-blue-500 px-[5px] py-[2px] rounded-md cursor-pointer sm:text-start text-center w-full sm:w-fit'
        >Search <FaChevronCircleUp className={`${!searchState ? 'sm:rotate-90 rotate-180' : ' sm:rotate-[-90deg]'} transition-all duration-300 ease inline`} />
        </p>
        <div className={`transition-all duration-200 ease overflow-hidden rounded-md ${searchState ? 'mt-2 sm:mt-0 w-full sm:w-fit sm:max-w-full sm:px-4' : 'max-w-0 p-0'}`}>
          <input type="text" className='rounded-md border-[1px] border-black px-4 text-gray-500 h-[50px] sm:h-[30px]' placeholder='Search for an item' onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>
      {/* Results */}
      <div className={`overflow-hidden ${showResults ? 'max-h-[1000px] w-full' : 'max-h-[0px] w-[0]'} transition-all duration-200 ease`}>

        <div className={`${searchState ? 'max-h-[400px] w-full mt-2' : 'max-h-[0px] w-[0] mt-0'}  flex flex-col justify-start items-start overflow-hidden transition-all duration-200 ease`}>
          <p className='mb-2 font-semibold underline'>Results <span>{searchResults?.length}</span></p>
          <div className='grid grid-cols-4 gap-2 w-full max-h-[300px] overflow-scroll p-4'>
            {searchResults?.length && searchResults.length > 0 ?
              searchResults?.map(({ id, name }) => (
                <div key={id}>{name}</div>
              ))

              : (
                <div className='w-full'>
                  <p>No Items Found</p>
                </div>
              )}
          </div>
        </div>

      </div>

    </div >
  )
}

export default ItemSearch