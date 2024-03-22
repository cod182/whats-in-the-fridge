'use client'

import React, { useState } from 'react'

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
  userId: string;
  handleAddingToCurrentItems: (item: applianceItem) => void;
  showItemTypes: boolean;
}

const SearchAddItems = ({ availableItems, selectedArea, userId, handleAddingToCurrentItems, showItemTypes }: Props) => {

  const [searchResults, setSearchResults] = useState<availableItem[]>()
  const [message, setMessage] = useState<string>()

  const handleSearch = (searchTerm: string) => {
    setSearchResults([]); // Reset search results when the search term changes
    setMessage('')
    if (searchTerm.trim() === '') {
      setMessage('Enter a Search Term')
      return;
    };
    // Search the array of items
    const results = availableItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length === 0) {
      setMessage('No Results.')
    }
    // set the results to the state
    setSearchResults(results);
  }



  return (
    <div className={`flex flex-wrap flex-col items-start my-2 p-2 bg-blue-200 rounded-md w-full overflow-hidden h-fit transition-all ease duration-300`}>
      <div className='flex flex-row flex-wrap items-center justify-start w-full'>
        <div className={`transition-all duration-200 ease overflow-hidden rounded-md mt-2 sm:mt-0 w-full sm:px-4`}>
          <input type="text" className='rounded-md border-[1px] border-black px-4 text-gray-500 h-[40px] w-full' placeholder='Search for an item' onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>

      {/* Results */}
      <div className={`overflow-hidden max-h-[1000px] w-full transition-all duration-200 ease px-4`}>
        <div className={`max-h-[400px] w-full mt-2 flex flex-col justify-start items-start overflow-hidden transition-all duration-200 ease`}>
          <div className='flex flex-row items-center justify-start gap-x-2'>
            <p className='font-semibold underline'>Results:</p><span className=''>{searchResults?.length}</span>
          </div>
          <div className='flex flex-row flex-wrap items-center gap-2 w-full max-h-[300px] overflow-scroll p-4'>
            {searchResults && searchResults.length > 0 ?
              searchResults?.map((item) => (
                <div key={item.id} className='bg-pink-300'>
                  {item.name}
                </div>
              ))
              :
              (
                <div className='w-full bg-gray-400/40 rounded-lg p-4 '>
                  {message}
                </div>
              )}
          </div>
        </div>
      </div>
    </div >
  )
}

export default SearchAddItems