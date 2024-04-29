'use client'

import FadeInHOC from '../FadeInHOC/FadeInHOC';
import Image from 'next/image';
import { customImages } from '@/static/custom-item-images';
import { icons } from '../../static/icons';
import { useState } from 'react';

type Props = {
  handleUpdateIcon: (newIcon: string) => void
  currentIcon?: string;
}

const IconSearch = ({ handleUpdateIcon, currentIcon }: Props) => {

  const spin = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#88caff" offset="20%" />
        <stop stop-color="#88ff9b" offset="50%" />
        <stop stop-color="#88caff" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#A8E0FD" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);



  // Use StateService
  const [selectedIcon, setSelectedIcon] = useState<string>(currentIcon ? currentIcon : '')
  const [searchResults, setSearchResults] = useState<{ name: string, icon: string }[]>()
  const [searchTerm, setSearchTerm] = useState<string>()

  // Functions
  const handleIconSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchResults([]); // Reset search results when the search term changes
    // If the search term is empty
    if (searchTerm === "") {
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
    <div className='w-full h-fit p-2'>
      <div className='flex flex-row items-center justify-start gap-2'>
        <div className='flex flex-col items-center justify-normal'>
          <p>Choose a new icon.</p>
          <p className='text-xs italic text-gray-800'>Click on an icon to update</p>
        </div>
        {currentIcon &&
          <div className='flex flex-row items-center justify-start gap-2 px-2 py-[5px] bg-gray-400/50 rounded-md border-[1px] border-gray-800'>
            <p>Current icon</p>
            <Image alt='' src={`/assets/images/items/${currentIcon}`} className={`mx-auto shadow-md rounded-full`} width={50} height={50} />
          </div>
        }

      </div>
      {/* START Common Icons */}
      <div className={`my-2 ${searchTerm === '' || searchTerm === undefined ? 'max-h-[500px]' : 'max-h-[0px]'} overflow-hidden transition-all duration-500 ease`}>
        {/* Icon Selection */}

        <p className='my-2 font-semibold'>Common Icons:</p>
        <div className={`grid grid-cols-1 gap-2 xxxs:grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 border-[1px] border-gray-400 rounded-md p-2 bg-blue-700/50`}>
          {customImages.map((commonIcon, index) => (
            <FadeInHOC key={commonIcon.name.replace(/\s/g, "_").toLowerCase()} delayNumber={index * 100} direction='up'>
              <label className='flex items-center w-full mx-auto transition-all duration-200 active:scale-110 ease'>
                <input
                  type="radio"
                  name="itemIcon"
                  value={commonIcon.icon}
                  onChange={(e) => { setSelectedIcon(e.target.value); handleUpdateIcon(e.target.value); }}
                  className='hidden mr-2 group'
                  checked={selectedIcon === commonIcon.icon}
                />
                <div className="flex flex-col items-center justify-center mx-auto">
                  <Image
                    src={`/assets/images/items/${commonIcon.icon}`}
                    alt={commonIcon.name.replace(/\s/g, "_").toLowerCase()}
                    className={`mx-auto hover:scale-110 cursor-pointer transition-all duration-200  rounded-full ease ${selectedIcon === commonIcon.icon ? 'scale-110 border-[2px] shadow-xl border-green-400' : 'scale-100 border-[0px] shadow-none'} `}
                    width={50}
                    height={50}
                    placeholder={`data:image/svg+xml;base64,${toBase64(spin(50, 50))}`}

                  />
                </div>
              </label>
            </FadeInHOC>
          ))}

        </div>
        {/* End Icon Selection */}
      </div>
      {/* END Common Icons */}

      {/* START All Icon Search */}
      <div className=''>
        <p className='my-2 font-semibold'>Search for an Icon:</p>

        <div className='my-2'>
          <input id='itemSearch' type="text" className='rounded-md border-[1px] border-black px-4 text-gray-500 h-[40px] sm:h-[30px] w-full xxs:w-[200px]' placeholder='E.g. Melon' onChange={(e) => handleIconSearch(e.target.value)} />
          <p className={`${!searchTerm ? 'max-h-[0px]' : 'max-h-[100px]'} overflow-hidden transition-all duration-200 ease text-normal mx-2 italic`}>Found: {searchResults && searchResults.length}</p>
        </div>
        <div
          className={` ${searchResults && searchResults.length > 0 ? ' gap-2 w-full grid grid-cols-1 xxxs:grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6' : 'flex items-center justify-start'} border-[1px] border-gray-400 rounded-md px-2 bg-blue-700/50 transition-all duration-200 ease ${searchResults && searchResults.length > 0 ? 'max-h-[300px] overflow-scroll py-2' : searchTerm != '' && searchTerm != undefined ? 'max-h-[300px] overflow-scroll py-2' : 'py-0 max-h-[0px] overflow-hidden'}`}
        >
          {searchResults && searchResults.length > 0 ?
            searchResults?.map((icon, index) => (
              <FadeInHOC key={icon.name.replace(/\s/g, "_").toLowerCase()} delayNumber={index * 100} direction='up'>
                <label className='flex items-center w-full mx-auto transition-all duration-200 active:scale-110 ease'>
                  <input
                    type="radio"
                    name="itemIcon"
                    value={icon.icon}
                    onChange={(e) => { setSelectedIcon(e.target.value); handleUpdateIcon(e.target.value); }}
                    className='hidden mr-2 group'
                    checked={selectedIcon === icon.icon}
                  />
                  <div className="flex flex-col items-center justify-center mx-auto rounded-full overflow-hidden">
                    <Image
                      src={`/assets/images/items/${icon.icon}`}
                      alt={icon.name.replace(/\s/g, "_").toLowerCase()}
                      className={`mx-auto hover:scale-110 cursor-pointer transition-all duration-200  rounded-full ease ${selectedIcon === icon.icon ? 'scale-110 border-[5px] shadow-xl border-green-400' : 'scale-100 border-[0px] shadow-none'} `}
                      width={50}
                      height={50}
                      placeholder={`data:image/svg+xml;base64,${toBase64(spin(50, 50))}`}
                    />
                  </div>
                </label>
              </FadeInHOC>
            ))
            :
            (
              <div className='w-full font-semibold'>
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