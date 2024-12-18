'use client'

import React, { useState } from 'react'

import { FaChevronCircleUp } from 'react-icons/fa'
import ItemCard from '../Appliances/ItemCard';

type Props = {
  items: applianceItem[];
  handleUpdateItems: (items: applianceItem[]) => void;
  applianceType: string;
  selectedArea: selectionProps;
}
const ItemSearch = ({ items, handleUpdateItems, selectedArea, applianceType }: Props) => {
  // States
  const [searchState, setSearchState] = useState(false);
  const [searchResults, setSearchResults] = useState<applianceItem[]>()
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Functions
  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm)
    setSearchResults([]); // Reset search results when the search term changes
    setShowResults(true); // Sets the results state to show
    // If the search term is empty
    if (searchTerm.trim() === "") {
      setShowResults(false); // Sets the results state to show
      return; // Exit early if the search term is empty
    }
    // Search the array of items
    const results = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // set the results to the state
    setSearchResults(results);
  }

  const handleUpdateItemsIntercept = (items: applianceItem[]) => {
    handleUpdateItems(items);

    // Search the array of items
    const results = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // set the results to the state
    setSearchResults(results);

  }

  return (
    <div className={`z-[10] flex flex-wrap flex-col items-start my-2 px-2 py-1 bg-blue-200 rounded-md w-fit mx-auto sm:mx-0 sm:w-fit overflow-hidden h-fit transition-all ease duration-300`}>
      <div className='flex flex-row flex-wrap items-center justify-start w-full transition-all duration-300 ease'>
        <p
          onClick={() => { setSearchState((prev) => !prev); setShowResults(false); }}
          className='inline bg-blue-300 hover:bg-blue-400 active:bg-blue-500 px-[5px] py-[2px] rounded-md cursor-pointer sm:text-start text-center w-full sm:w-fit transition-all duration-300 easeg'
        >Search <FaChevronCircleUp className={`${!searchState ? 'sm:rotate-90 rotate-180' : ' sm:rotate-[-90deg]'} transition-all duration-300 ease inline`} />
        </p>
        <div className={`transition-all duration-200 ease overflow-hidden rounded-md ${searchState ? 'mt-2 sm:mt-0 w-full sm:w-fit sm:max-w-[2000px] sm:px-4' : 'max-w-0 p-0'}`}>
          <input id='itemSearch' type="text" className='rounded-md border-[1px] border-black px-4 text-gray-500 h-[40px] sm:h-[30px] w-full' placeholder='Search for an item' onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>
      {/* Results */}
      <div className={`overflow-hidden ${showResults ? 'max-h-[1000px] w-fit' : 'max-h-[0px] w-[0]'} transition-all duration-200 ease`}>
        <div className={`${searchState ? 'max-h-[400px] w-full mt-2' : 'max-h-[0px] w-[0] mt-0'}  flex flex-col  items-start overflow-hidden transition-all duration-200 ease`}>
          <div className='flex flex-row items-center justify-start gap-x-2'>
            <p className='font-semibold underline'>Results:</p><span className=''>{searchResults?.length}</span>
          </div>
          <div
            className={`gap-2 w-full max-h-[300px] overflow-scroll md: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3`}
          >
            {searchResults && searchResults.length > 0 ?
              searchResults?.map((item) => (
                <div key={item.id} className={`transition-all duration-200 ease w-full xs:w-[340px]`}>
                  <ItemCard item={item} items={items} updateItems={handleUpdateItemsIntercept} selectedArea={selectedArea} applianceType={applianceType} inSearch />
                </div>
              ))
              :
              (
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