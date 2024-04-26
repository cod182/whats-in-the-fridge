'use client'

import Image from 'next/image';
import { customImages } from '@/static/custom-item-images';
import { icons } from '../../static/icons';
import { useState } from 'react';
import { useStyleRegistry } from 'styled-jsx';

const IconSearch = () => {

  // Use StateService
  const [selectedIcon, setSelectedIcon] = useState<string>()
  const [searchResults, setSearchResults] = useState<{ name: string, icon: string }[]>()
  const [searchTerm, setSearchTerm] = useState<string>()
  // Functions
  const handleIconSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchResults([]); // Reset search results when the search term changes
    // If the search term is empty
    if (searchTerm.trim() === "") {
      return; // Exit early if the search term is empty
    }
    // Search the array of items
    const results = icons.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // set the results to the state
    setSearchResults(results);
  }


  return (
    <div className='w-full h-full p-2'>

      {/* START Common Icons */}
      <div className='my-2'>
        {/* Icon Selection */}

        <p className='my-2'>Common Icons:</p>
        <div className='grid grid-cols-1 gap-2 xxxs:grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 border-[1px] border-gray-400 rounded-md p-2'>
          {customImages.map((commonIcon, index) => (
            <label key={index} className='flex items-center w-full mx-auto transition-all duration-200 active:scale-110 ease'>
              <input
                type="radio"
                name="itemIcon"
                value={commonIcon.icon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className='hidden mr-2 group'
                checked={selectedIcon === commonIcon.icon}
              />
              <div className="flex flex-col items-center justify-center mx-auto">
                <Image
                  src={`/assets/images/items/${commonIcon.icon}`}
                  alt={commonIcon.name}
                  className={`mx-auto hover:scale-110 cursor-pointer transition-all duration-200 ease ${selectedIcon === commonIcon.icon ? 'rounded-full scale-110 border-[2px] shadow-xl border-green-400' : ''} `}
                  width={50}
                  height={50}
                />
              </div>
            </label>
          ))}

        </div>
        {/* End Icon Selection */}
      </div>
      {/* END Common Icons */}

      {/* START All Icon Search */}
      <div className=''>
        <p className='my-2'>Search for an Icon:</p>

        <div>
          <input id='itemSearch' type="text" className='rounded-md border-[1px] border-black px-4 text-gray-500 h-[40px] sm:h-[30px] w-full' placeholder='Search for an item' onChange={(e) => handleIconSearch(e.target.value)} />
        </div>
        <div
          className={`gap-2 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ${searchResults && searchResults.length > 0 ? 'max-h-[300px] overflow-scroll' : searchTerm != '' && searchTerm != undefined ? 'max-h-[300px] overflow-scroll' : 'max-h-[0px] overflow-hidden'}`}
        >
          {searchResults && searchResults.length > 0 ?
            searchResults?.map((icon) => (
              <label key={icon.name} className='flex items-center w-full mx-auto transition-all duration-200 active:scale-110 ease'>
                <input
                  type="radio"
                  name="itemIcon"
                  value={icon.icon}
                  onChange={(e) => setSelectedIcon(e.target.value)}
                  className='hidden mr-2 group'
                  checked={selectedIcon === icon.icon}
                />
                <div className="flex flex-col items-center justify-center mx-auto">
                  <Image
                    src={`/assets/images/items/${icon.icon}`}
                    alt={icon.name}
                    className={`mx-auto hover:scale-110 cursor-pointer transition-all duration-200 ease ${selectedIcon === icon.icon ? 'rounded-full scale-110 border-[2px] shadow-xl border-green-400' : ''} `}
                    width={50}
                    height={50}
                  />
                </div>
              </label>
            ))
            :
            (
              <div className='w-full'>
                <p>No Icons Found</p>
              </div>
            )}
        </div>
      </div>

      {/* End All Icon Search */}



    </div >
  )
}

export default IconSearch