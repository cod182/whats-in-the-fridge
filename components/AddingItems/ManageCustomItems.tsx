'use client'

import React, { useState } from 'react'

import { FaCircleArrowRight } from "react-icons/fa6";
import FadeInHOC from '../FadeInHOC/FadeInHOC';
import { ImSpinner6 } from "react-icons/im";
import Image from 'next/image';
import { MdError } from "react-icons/md";
import { getUserCustomItems } from '@/utilities/functions';

const ManageCustomItems = () => {
  const [managementPane, setManagementPane] = useState<boolean>(false);
  const [customItems, setCustomItems] = useState<userCreatedItem[]>();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedItem, setSelectedItem] = useState<userCreatedItem>()

  const handleLookUpItems = async () => {
    if (!managementPane) {
      setLoading(true)
      const userItemsArray: userCreatedItem[] = await getUserCustomItems();
      setCustomItems(userItemsArray);
      if (customItems && customItems.length < 1) {
        setLoading(false);;
        setError(true)
      } else {
        setLoading(false);
        setManagementPane((prev) => !prev);
      }
    } else {

      setManagementPane((prev) => !prev);
    }
  }

  const handleChangeSelectedItem = (selectedItem: userCreatedItem) => {
    setSelectedItem(selectedItem);
  }

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
      </div>
      {selectedItem &&
        <FadeInHOC delayNumber={200} direction='up' classes='w-full'>
          <div className={`${selectedItem ? 'max-h-[1000px]' : 'max-h-[0px]'}`}>
            {selectedItem.name}
          </div>
        </FadeInHOC>
      }

    </div >
  )
}

export default ManageCustomItems