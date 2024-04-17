'use client'

import React, { useState } from 'react'

import { FaCircleArrowRight } from "react-icons/fa6";
import FadeInHOC from '../FadeInHOC/FadeInHOC';
import { ImSpinner6 } from "react-icons/im";
import Image from 'next/image';
import { MdError } from "react-icons/md";
import { customImages } from '@/static/custom-item-images';
import { getUserCustomItems } from '@/utilities/functions';

const ManageCustomItems = () => {
  const [managementPane, setManagementPane] = useState<boolean>(false);
  const [customItems, setCustomItems] = useState<userCreatedItem[]>();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedItem, setSelectedItem] = useState<userCreatedItem>()
  const [selectedIcon, setSelectedIcon] = useState<string>();

  const handleLookUpItems = async () => {
    if (!managementPane) {
      setLoading(true)
      const userItemsArray: userCreatedItem[] = await getUserCustomItems();
      setCustomItems(userItemsArray);
      if (customItems && customItems.length < 1) {
        setLoading(false);
        setError(true)
      } else {
        setLoading(false);
        setManagementPane((prev) => !prev);
      }
    } else {
      setManagementPane((prev) => !prev);
      setSelectedItem(undefined);
    }
  }

  const handleChangeSelectedItem = (selectedItem: userCreatedItem) => {
    setSelectedItem(selectedItem);
    setSelectedIcon(selectedItem.image)
  }

  const handleUpdatingItem = (e: any) => { }

  return (
    <div className='flex flex-col justify-start items-start w-full h-fit transition-all duration-300 ease bg-pink'>
      <p className={`font-semibold ${managementPane ? 'pb-2' : 'pb-0'}`}>Manage Your Custom Items {error ? (<><MdError className='text-red-500/90 w-[25px] h-[25px] inline transition-all duration-300 ease' /><span className='inline text-xs text-gray-800 italic'>You have not created any items</span></>) : loading ? (<ImSpinner6 className='animate-spin text-blue-500 w-[25px] h-[25px] inline transition-all duration-300 ease' />) : (<FaCircleArrowRight onClick={() => handleLookUpItems()} className={`${managementPane ? 'rotate-90' : 'rotate-0'} cursor-pointer w-[25px] h-[25px] inline transition-all duration-300 ease hover:text-blue-500  hover:scale-105`} />)}</p>
      {/* Area for Managing Items */}
      <div className={`${managementPane ? 'max-h-[1000px] py-2' : 'max-h-[0px] py-0'} bg-gray-400/30 w-full rounded-md overflow-hidden transition-all duration-300 ease px-2`}>
        <select
          className='rounded-md px-2 min-h-[35px] capitalize'
          name="custom_item_selection"
          defaultValue="" // set default value to an empty string
          onChange={(e) => handleChangeSelectedItem(JSON.parse(e.target.value))}
        >
          <option value="" disabled hidden>Select an Item</option> {/* make the default option hidden */}

          {customItems && customItems.map((item) => (
            <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
          ))}
        </select>

        {selectedItem &&
          <FadeInHOC delayNumber={200} direction='up' classes='w-full'>
            <div className={`${selectedItem ? 'max-h-[1000px]' : 'max-h-[0px]'} my-2`}>
              <form method='PUT' onSubmit={(e) => handleUpdatingItem(e)} className='w-full h-fit'>

                {/* Name Entry */}
                <div className='w-full'>
                  <label htmlFor="name" className='mb-1'>Name your item:</label>
                  <input type="text" id='name' name='name' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' defaultValue={selectedItem.name} />
                </div>
                {/* End Name Entry */}

                {/* Item Main Type */}
                <div className='w-full'>
                  <label htmlFor="itemMainType" className='my-2'>Set the main type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>e.g Herb, Red Meat, Savory Snack, Seafood  </span></label>
                  <input type="text" id='itemMainType' name='itemMainType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' defaultValue={selectedItem.itemMainType} />
                </div>
                {/* End Item Main Type */}

                {/* Item Type */}
                <div className='w-full'>
                  <label htmlFor="itemType" className='my-2'>Set the type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>e.g Vegetable, Meat, Snack, Fish </span></label>
                  <input type="text" id='itemType' name='itemType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' defaultValue={selectedItem.itemType} />
                </div>
                {/* End Item Type */}

                {/* Item Sub Type */}
                <div className='w-full'>
                  <label htmlFor="itemSubType" className='my-2'>Set the sub type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>Optional </span></label>
                  <input type="text" id='itemSubType' name='itemSubType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' defaultValue={selectedItem.itemSubType} />
                </div>
                {/* End Item Sub Type */}

                {/* Icon Selection */}
                <div className='w-full'>
                  <p className='my-2'>Choose an Icon:</p>
                  <div className='grid grid-cols-1 gap-2 xxxs:grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6'>
                    {customImages.map((item, index) => (
                      <label key={index} className='flex items-center w-full mx-auto transition-all duration-200 active:scale-110 ease' >

                        <input
                          type="radio"
                          name="itemIcon"
                          value={item.icon}
                          onChange={(e) => setSelectedIcon(e.target.value)}
                          className='hidden mr-2 group'
                          checked={selectedIcon === item.icon}
                        />
                        <div className="flex flex-col items-center justify-center mx-auto">
                          <Image
                            src={`/assets/images/itemTypes/${item.icon}`}
                            alt={item.name}
                            className={`mx-auto hover:scale-110 cursor-pointer transition-all duration-200 ease ${selectedIcon === item.icon ? 'rounded-full scale-110 border-[2px] shadow-xl border-green-400' : ''} `}
                            width={50}
                            height={50}
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                {/* End Icon Selection */}

              </form>
            </div>
          </FadeInHOC>
        }

      </div >
    </div >
  )
}

export default ManageCustomItems