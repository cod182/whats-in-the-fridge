'use client'

import { BiCross, BiDotsHorizontalRounded } from "react-icons/bi";
import { GiCancel, GiCrossMark } from "react-icons/gi";
import { ImCross, ImSpinner6 } from "react-icons/im";
import { IoClose, IoSaveSharp } from 'react-icons/io5';
import { MdCancel, MdError, MdFreeCancellation } from "react-icons/md";
import React, { useState } from 'react'
import { TiCancel, TiTick, TiTrash } from "react-icons/ti";

import { Cross } from "hamburger-react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCross } from "react-icons/fa";
import FadeInHOC from '../FadeInHOC/FadeInHOC';
import Image from 'next/image';
import { customImages } from '@/static/custom-item-images';
import { getUserCustomItems } from '@/utilities/functions';

const ManageCustomItems = () => {

  // STATES
  const [managementPane, setManagementPane] = useState<boolean>(false);
  const [customItems, setCustomItems] = useState<userCreatedItem[]>();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedItem, setSelectedItem] = useState<userCreatedItem>()
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState('')
  const [deleteConfirmCheck, setDeleteConfirmCheck] = useState(false);


  // FUNCTIONS
  // handles getting all custom items and sets the state
  const getCustomCreatedItems = async () => {
    const userItemsArray: userCreatedItem[] = await getUserCustomItems();
    if (userItemsArray.length >= 1) {
      setCustomItems(userItemsArray);
      return true
    } else {
      setCustomItems([]);
      return false;
    }
  }

  const handleLookUpItems = async () => {
    if (!managementPane) {
      setLoading(true)
      const response = await getCustomCreatedItems()
      if (!response) {
        setLoading(false);
        setError(true)
        setManagementPane(false);
      } else {
        setLoading(false);
        setManagementPane(true);
      }
    } else {
      setManagementPane(false);
      setSelectedItem(undefined);
    }
  }

  // Handles when the selected option is changed
  const handleChangeSelectedItem = (selectedItem: string) => {
    // Sets the selected item
    if (selectedItem === 'Select an Item') {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(JSON.parse(selectedItem));
    }
  }

  // Handles teh updating of and item when save is clicked
  const handleUpdatingItem = async (e: any) => {
    e.preventDefault();

    // Ensure the selected item is present
    if (!selectedItem) {
      setUpdateError('No item id found');
      return;
    }
    setUpdateError('');

    // create the updated item object
    const updatedItem = {
      id: selectedItem.id,
      creatorId: selectedItem.creatorId,
      name: selectedItem.name,
      itemMainType: selectedItem.itemMainType,
      itemSubType: selectedItem.itemSubType,
      itemType: selectedItem.itemType,
      image: selectedItem.image
    }

    try {
      // Turns off the confirm check incase it had been activated
      setDeleteConfirmCheck(false);
      // Sets that updating is on
      setUpdating(true)
      // Makes the fetch request
      const response = await fetch(`/api/appliance-items/custom/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      // If response is ok
      if (response.ok) {
        // Turns off the updating
        setUpdating(false)
        // Turns on success
        setUpdateSuccess(true);
        // Resets states to false after 1 second
        setTimeout(() => {
          setUpdateSuccess(false);
          setSelectedItem(undefined);
          getCustomCreatedItems();
        }, 1000);
      } else {
        // If there's an error, sets the state
        setUpdateError(response.statusText);
        // reset success to false after 1 second
        setTimeout(() => {
          setUpdateError('');
        }, 1000);
        setUpdating(false)
        setUpdateSuccess(false)
      }
    } catch (error) {
      console.error('Error while sending data', error);
      setUpdateError('Error while sending data, please try again');
      setUpdating(false)
      setTimeout(() => {
        setUpdateError('');
      }, 1000);
    }
  }



  // Called for deleting an custom item from the database
  const handleDeleteCustomItem = async (customItemId: number) => {
    if (deleteConfirmCheck) {
      try {
        // Sets the updating to on
        setUpdating(true)
        // Makes teh api call
        const response = await fetch(`/api/appliance-items/custom/${customItemId}`, {
          method: 'DELETE',
        });
        // If the response is ok
        if (response.ok) {
          // Turns off updating
          setUpdating(false)
          // Turns on success
          setUpdateSuccess(true);
          // reset states to false after 1 second
          setTimeout(() => {
            setDeleteConfirmCheck(false);
            setUpdateSuccess(false);
            setSelectedItem(undefined);
            getCustomCreatedItems();
          }, 1000);
        } else {
          // REsponse not ok
          console.log(response)
          // Set the error to the response
          setUpdateError(response.statusText);
          setDeleteConfirmCheck(false);
          // reset success to false after 2 second
          setTimeout(() => {
            setUpdateError('');
          }, 2000);
          setUpdating(false)
          setUpdateSuccess(false)
        }
      } catch (error) {
        setDeleteConfirmCheck(false);
        console.error('Error while deleting', error);
        setUpdateError('Error while deleting data, please try again');
        setUpdating(false)
        setTimeout(() => {
          setUpdateError('');
        }, 2000);
      }
    } else {
      setDeleteConfirmCheck(true);
    }
  }

  return (
    <div className='flex flex-col justify-start items-start w-full h-fit transition-all duration-300 ease bg-pink'>
      <p className={`font-semibold ${managementPane ? 'pb-2' : 'pb-0'}`}>
        Manage Your Custom Items {error ? (<><MdError className='text-red-500/90 w-[25px] h-[25px] inline transition-all duration-300 ease' /><span className='inline text-xs text-gray-800 italic'>You have not created any items</span></>) : loading ? (
          <ImSpinner6 className='animate-spin text-blue-500 w-[25px] h-[25px] inline transition-all duration-300 ease' />
        )
          :
          (
            <FaCircleArrowRight onClick={() => handleLookUpItems()} className={`${managementPane ? 'rotate-90' : 'rotate-0'} cursor-pointer w-[25px] h-[25px] inline transition-all duration-300 ease hover:text-blue-500  hover:scale-105`} />
          )
        }
      </p>
      {/* Area for Managing Items */}
      <div className={`relative ${!loading && managementPane ? 'max-h-[1000px] py-2' : 'max-h-[0px] py-0'} bg-gray-400/30 w-full rounded-md overflow-hidden transition-all duration-300 ease px-2`}>
        <div className={`top-0 w-full italic text-black bg-red-500/80 px-4 text-md font-semibold rounded-md text-center overflow-hidden ${updateError != '' ? 'max-h-[200px] py-4 mb-4' : 'max-h-[0px] py-0 mb-0'} transition-all duration-300 ease`}>Error: {updateError}</div>

        <select
          className={`rounded-md px-2 min-h-[45px] capitalize ${selectedItem === undefined && 'font-semibold'}`}
          name="custom_item_selection"
          defaultValue="" // set default value to an empty string
          onChange={(e) => handleChangeSelectedItem(e.target.value)}
        >
          <option value={undefined} className="font-semibold">Select an Item</option> {/* make the default option hidden */}

          {customItems && customItems.map((item) => (
            <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
          ))}
        </select>

        {selectedItem != undefined &&
          <FadeInHOC delayNumber={200} direction='up' classes='w-full'>
            <div className={`${selectedItem ? 'max-h-[1000px]' : 'max-h-[0px]'} my-2`}>
              <form method='PUT' onSubmit={(e) => handleUpdatingItem(e)} className='w-full h-fit'>

                {/* Name Entry */}
                <div className='w-full'>
                  <label htmlFor="name" className='mb-1'>Name your item:</label>
                  <input type="text" id='name' name='name' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' value={selectedItem.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
                </div>
                {/* End Name Entry */}

                {/* Item Main Type */}
                <div className='w-full'>
                  <label htmlFor="itemMainType" className='my-2'>Set the main type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>e.g Herb, Red Meat, Savory Snack, Seafood  </span></label>
                  <input type="text" id='itemMainType' name='itemMainType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' value={selectedItem.itemMainType} onChange={(e) => setSelectedItem({ ...selectedItem, itemMainType: e.target.value })} />
                </div>
                {/* End Item Main Type */}

                {/* Item Type */}
                <div className='w-full'>
                  <label htmlFor="itemType" className='my-2'>Set the type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>e.g Vegetable, Meat, Snack, Fish </span></label>
                  <input type="text" id='itemType' name='itemType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' value={selectedItem.itemType} onChange={(e) => setSelectedItem({ ...selectedItem, itemType: e.target.value })} />
                </div>
                {/* End Item Type */}

                {/* Item Sub Type */}
                <div className='w-full'>
                  <label htmlFor="itemSubType" className='my-2'>Set the sub type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>Optional </span></label>
                  <input type="text" id='itemSubType' name='itemSubType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' value={selectedItem.itemSubType} onChange={(e) => setSelectedItem({ ...selectedItem, itemSubType: e.target.value })} />
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
                          onChange={(e) => setSelectedItem({ ...selectedItem, image: e.target.value })}
                          className='hidden mr-2 group'
                          checked={selectedItem.image === item.icon}
                        />
                        <div className="flex flex-col items-center justify-center mx-auto">
                          <Image
                            src={`/assets/images/itemTypes/${item.icon}`}
                            alt={item.name}
                            className={`mx-auto hover:scale-110 cursor-pointer transition-all duration-200 ease ${selectedItem.image === item.icon ? 'rounded-full scale-110 border-[2px] shadow-xl border-green-400' : ''} `}
                            width={50}
                            height={50}
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                {/* End Icon Selection */}


                {/* Icons & Buttons */}
                <div
                  className='flex flex-col flex-wrap justify-between items-end w-full h-fit my-10'>
                  {updating &&
                    (
                      <div className="mx-auto flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                        <p className="text-md font-normal md:text-lg">{deleteConfirmCheck ? 'Deleting...' : 'Updating...'}</p>
                        <BiDotsHorizontalRounded className='h-[20px] w-[20px] text-blue-500  hover:scale-110 transition-all duration-200 ease-in-out animate-spin' />
                      </div>

                    )
                  }

                  {updateSuccess &&
                    (
                      <div className="mx-auto flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                        <p className="text-md font-normal md:text-lg">{deleteConfirmCheck ? 'Deleted!' : 'Updated!'}</p>
                        <TiTick className='h-[45px] w-[45px] text-green-500  hover:scale-110 transition-all duration-200 ease-in-out' />
                      </div>
                    )
                  }

                  {!updating && !updateSuccess &&
                    <div className="w-full h-fit flex flex-row justify-around items-center gap-6">
                      {/* Save Button */}

                      <div className="relative group w-fit h-auto flex flex-row items-center justify-center">
                        <div className={`overflow-hidden absolute select-none top-[50px] right-[-8px] group-hover:flex h-fit w-fit md:h-0 group-hover:h-fit flex-row items-center justify-center p-0 group-hover:py-[5px] px-2 md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease`}>
                          <p className="text-xs font-normal md:text-sm">Update</p>
                        </div>
                        <button
                          type='submit'>
                          <IoSaveSharp className='bg-gray-300/60 rounded-md p-2 h-[45px] w-[45px] text-green-500 hover:text-green-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                        </button>
                      </div>

                      {/* DELETE BUTTON START */}


                      {/* Initial Delete Button START*/}
                      <div className={`relative group w-fit h-auto flex flex-row items-center justify-center ${deleteConfirmCheck ? 'hidden' : 'inline'}`}>
                        {/* Pop Out button */}
                        <div className={`overflow-hidden absolute select-none top-[50px] right-[-5px] group-hover:flex h-fit w-fit md:h-0 group-hover:h-fit flex-row items-center justify-center p-0 group-hover:py-[5px] px-2 md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease`}>
                          <p className="text-xs font-normal md:text-sm">Delete</p>
                        </div>
                        {/* Button */}
                        <button className='relative h-[45px] w-[45px]'
                          onClick={(e) => { e.preventDefault(); handleDeleteCustomItem(selectedItem.id); }}
                          aria-label="Delete the custom item"
                        >
                          <TiTrash className={`bg-gray-300/60 rounded-md p-2 h-full w-full text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out`} />
                        </button>
                      </div>
                      {/* Initial Delete Button END*/}

                      {/* Confirm / Cancel Buttons START*/}
                      <div className={`flex flex-row justify-center items-center gap-4 ${deleteConfirmCheck ? 'inline' : 'hidden'}`}>

                        {/* Confirm Delete Button */}
                        <div className="relative group">
                          {/* Pop Out text */}
                          <div className={`overflow-hidden absolute select-none top-[50px] right-[-12px] group-hover:flex h-fit w-fit md:h-0 group-hover:h-fit flex-row items-center justify-center p-0 group-hover:py-[5px] px-2 md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease`}>
                            <p className="text-xs font-normal md:text-sm">Confirm</p>
                          </div>
                          {/* Button */}
                          <button className='relative h-[45px] w-[45px]'
                            onClick={(e) => { e.preventDefault(); handleDeleteCustomItem(selectedItem.id); }}
                          >
                            <TiTick className={`bg-gray-300/60 rounded-md p-2 w-full h-full text-orange-500 hover:text-orange-600 hover:scale-110 transition-all duration-200 ease-in-out`} />
                          </button>
                        </div>
                        {/* End Confirm Delete Button */}

                        {/* Cancel Delete Button */}
                        <div className="relative group">
                          {/* Pop Out text */}
                          <div className={`overflow-hidden absolute select-none top-[50px] right-[-8px] group-hover:flex h-fit w-fit md:h-0 group-hover:h-fit flex-row items-center justify-center p-0 group-hover:py-[5px] px-2 md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease`}>
                            <p className="text-xs font-normal md:text-sm">Cancel</p>
                          </div>
                          {/* Button */}
                          <button className='relative w-[45px] h-[45px]'
                            onClick={(e) => { e.preventDefault(); setDeleteConfirmCheck(false); }}
                          >
                            <IoClose className={`bg-gray-300/60 rounded-md p-2 w-full h-full text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out`} />
                          </button>
                        </div>
                        {/* End Cancel Delete Button */}

                      </div>
                      {/* Confirm / Cancel Buttons END */}


                      {/* DELETE BUTTON END */}

                    </div>
                  }
                </div>

              </form>
            </div>
          </FadeInHOC>
        }

      </div >
    </div >
  )
}

export default ManageCustomItems