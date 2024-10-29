'use client'

import { BsBoxArrowLeft, BsBoxArrowRight } from "react-icons/bs";
import { getAvailableCompartments, removeItemFromDb, reverseDate } from "@/utilities/functions";
import { useEffect, useState } from 'react';

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { CiCircleChevDown } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa'
import IconSearch from "../IconSearch/IconSearch";
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5'
import { IoSaveSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import MoveArea from "./MoveArea";
import { TiTick } from "react-icons/ti";

type Props = {
  item: applianceItem;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[]
  applianceType: string;
  selectedArea: selectionProps;
  inSearch?: boolean;
  shared?: sharedFromProps;
}

const ItemCard = ({ item, updateItems, items, inSearch, applianceType, selectedArea, shared }: Props) => {

  // Use States
  const [containerStatus, setContainerStatus] = useState(false);
  const [editActivated, setEditActivated] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [moveArea, setMoveArea] = useState(false);

  // States for updating an item
  const [itemName, setItemName] = useState(item.name);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate || '');
  const [cookedFromFrozen, setCookedFromFrozen] = useState<string | undefined>(item.cookedFromFrozen);
  const [itemSubType, setItemSubType] = useState(item.itemSubType || '');
  const [itemMainType, setItemMainType] = useState(item.itemMainType)
  const [itemType, setItemType] = useState(item.itemType || '')
  const [itemComment, setItemComment] = useState(item.comment || '');
  const [changeIcon, setChangeIcon] = useState(false);
  const [iconError, setIconError] = useState('');
  const [iconSuccess, setIconSuccess] = useState(false);
  const [iconUpdating, setIconUpdating] = useState(false);


  // Functions
  const handleDelete = async (e: any) => {
    let result = confirm('Are you sure you want to delete?')

    if (result) {
      try {

        const response = await removeItemFromDb(item.id, item.ownerid, item.applianceid, shared)

        if (response.status != 200) {
          console.log('Not Deleted', response)
          setError('Failed to delete item')
          setTimeout(() => {
            setError('');
          }, 2000);
        } else {

          const filteredItems = items.filter(
            (i) => i.id != item.id
          )
          updateItems(filteredItems);
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      e.preventDefault();
    }
  }

  // Function to update an items's icons
  const handleUpdateIcon = async (icon: string) => {
    // Api call to only update the icon used for the selected item
    try {
      setIconUpdating(true);
      const update = { id: item.id, applianceid: item.applianceid, ownerid: item.ownerid, image: icon }
      const response = await fetch(`/api/appliance-items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'iconUpdate'
        },
        body: JSON.stringify(update),
      });
      // If successful, update the Item locally
      if (response.ok) {
        const index = items.findIndex(item => item.id === update.id); // finds the item that matches
        const updatedItem = { ...item, image: icon, }
        if (index === -1) {
          // If the item is not found, return the original array
          console.log('item not found')
          return items;
        }
        const updatedItems = [...items]; // creates new array of item
        updatedItems.splice(index, 1, updatedItem); // Replace the item at the found index with the updated item
        updateItems(updatedItems);
        setIconUpdating(false);
        setIconSuccess(true);
        // Set states to false after 1 second
        setTimeout(() => {
          setIconSuccess(false);
          setChangeIcon(false);
        }, 2000);

      } else {
        setIconError('Error while sending data, please try again');
      }
    } catch (error) {
      console.error('Error while sending data', error);
    }

    // Call to update the local items
  };


  const handleUpdatingItem = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: Record<string, string> = {};
    setError('');
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    const updatedItem = {
      ...item,
      name: formValues.itemName,
      quantity: formValues.quantity,
      cookedFromFrozen: cookedFromFrozen,
      expiryDate: formValues.expiryDate,
      comment: formValues.comment,
      itemType: formValues.itemType,
      itemMainType: formValues.itemMainType,
      itemSubType: formValues.itemSubType,
    }
    try {
      setUpdating(true)
      const response = await fetch(`/api/appliance-items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'update'
        },
        body: JSON.stringify(updatedItem),
      });
      if (response.ok) {
        handlingUpdateLocalItem(updatedItem);
        setUpdating(false)
        setSuccess(true);
        // Set states to false after 1 second
        setTimeout(() => {
          setSuccess(false);
          setEditActivated(false);
          setContainerStatus(false);
        }, 1000);
      } else {
        setError(response.statusText);
        // Set success to false after 1 second
        setTimeout(() => {
          setError('');
        }, 2000);
        setUpdating(false)
        setSuccess(false)
      }
    } catch (error) {
      console.error('Error while sending data', error);
      setError('Error while sending data, please try again');
      setUpdating(false)
    }
  }

  // Takes the updated item, adds the uneffected original item parts. Find the item, removes it and adds it to a new array then updates the local array
  const handlingUpdateLocalItem = (updatedItemPart: any) => {
    const index = items.findIndex(item => item.id === updatedItemPart.id); // finds the item that matches

    const updatedItem = {
      id: item.id,
      ownerid: item.ownerid,
      applianceid: item.applianceid,
      name: updatedItemPart.name,
      itemType: updatedItemPart.itemType,
      itemMainType: updatedItemPart.itemMainType,
      itemSubType: updatedItemPart.itemSubType,
      addedDate: item.addedDate,
      expiryDate: updatedItemPart.expiryDate,
      cookedFromFrozen: cookedFromFrozen,
      quantity: parseInt(updatedItemPart.quantity),
      comment: updatedItemPart.comment,
      compartment: item.compartment,
      level: item.level,
      locationType: item.locationType,
      position: item.position,
      image: item.image,
    }

    if (index === -1) {
      // If the item is not found, return the original array
      console.log('item not found')
      return items;
    }

    const updatedItems = [...items]; // creates new array of item
    updatedItems.splice(index, 1, updatedItem); // Replace the item at the found index with the updated item
    updateItems(updatedItems);
  };

  return (
    <>
      {inSearch && (<div className="mx-auto w-[97%] text-normal text-sm bg-gray-300/60 rounded-t-lg  px-2 py-[5px] "><span className="capitalize">{item.compartment}</span> {item.locationType === 'shelf' ? 'on' : 'in'} {item.locationType} {item.level} {item.position != 128 && (` at position ${item.position}`)}</div>)}

      <div
        id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-container`}
        className={`flex flex-col my-[2px] justify-start items-start p-2 w-full max-h-[110px] rounded-md relative shadow-[1px_1px_1px_0px_rgb(0,0,0,0.2)] overflow-hidden transition-all duration-500 ease-in-out ${containerStatus ? 'max-h-[500px]' : 'max-h-[110px]'}`}
      >
        {/* Error Message */}
        <div className={` ${error ? 'max-h-[200px] py-2' : 'max-h-[0px] py-0'} absolute top-0 overflow-hidden px-2 rounded-lg w-[90%] italic text-black bg-red-500 z-[10] transition-all duration-200 ease`}>Error:{error}</div>


        {/* Moving Item Location START */}
        <MoveArea setEditActivated={setEditActivated} updateItems={updateItems} items={items} setMoveArea={setMoveArea} moveArea={moveArea} item={item} applianceType={applianceType} selectedArea={selectedArea} />
        {/* MOVING ITEM LOCATION END */}

        {/* START Change Item Icon */}
        <div className={` bg-blue-500/90 absolute top-0 backdrop-blur-[2px] left-0 w-full h-full overflow-scroll z-[990] transition-all duration-200 ease ${changeIcon ? 'max-h-[100%] max-w-[100%]' : 'max-h-[0%] max-w-[0%]'}`}>
          <div className={`absolute top-0 bg-gray-300/70 z-[999] transition-all duration-300 ease w-full overflow-hidden ${iconUpdating || iconSuccess || iconError ? 'h-full' : 'h-[0%]'}`} >
            <div className="flex flex-col justify-center items-center h-full w-full">

              {/* UPDATING ICON START */}
              {iconUpdating &&
                <div className={`flex h-fit w-fit flex-col items-center justify-center border-[1px] border-black bg-gray-400/60 rounded-lg p-4`}>
                  <p className="text-xs font-normal md:text-sm">Updating Icon!</p>
                  <BiDotsHorizontalRounded className='h-[30px] w-[30px] text-blue-500  hover:scale-110 transition-all duration-200 ease-in-out animate-spin' />
                </div>
              }
              {/* UPDATING ICON END */}

              {/* SUCCESS ICON START */}
              {iconSuccess &&
                <div className={`flex h-fit w-fit flex-col items-center justify-center border-[1px] border-black bg-gray-400/60 rounded-lg p-4`}>
                  <p className="text-xs font-normal md:text-sm">Icon Updated!</p>
                  <TiTick className='h-[45px] w-[45px] text-green-500  hover:scale-110 transition-all duration-200 ease-in-out' />
                </div>
              }
              {/* SUCCESS ICON END */}

              {/* ERROR ICON START */}
              {iconError &&
                <div className={`flex h-fit w-fit flex-col items-center justify-center border-[1px] border-black bg-gray-400/60 rounded-lg p-4`}>
                  <div className="flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                    <p className="text-xs font-normal md:text-sm">{iconError}</p>
                  </div>
                </div>
              }
              {/* SUERRORCCESS ICON END */}
            </div>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-end p-2">
            <button onClick={(e) => { e.preventDefault(); setChangeIcon(false) }}>
              <MdCancel className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
            </button>
          </div>
          <IconSearch handleUpdateIcon={handleUpdateIcon} currentIcon={item.image} />
        </div>
        {/* End Change Item Icon */}

        {/* form selection depending on the editActivated State */}
        {
          editActivated ? (
            // Form for editing
            <form action='' method='PUT' onSubmit={(e) => handleUpdatingItem(e)} className='w-full'>
              <div className='flex flex-row items-start justify-around w-full mb-2'>
                {/* Item info */}
                <div className='flex flex-row items-center justify-start w-full' >
                  <div className='mr-2 flex flex-col justify-center items-center max-w-[75px] max-h-[75px] min-h-[50px] min-w-[50px] aspect-square relative rounded-full'>
                    <div className="h-full w-full rounded-full overflow-hidden relative">
                      <Image alt={`${item.name} `} src={`/assets/images/items/${item.image}`} width={75} height={75} className='object-fill' />
                      <button onClick={(e) => { e.preventDefault(); setChangeIcon(true); }} className="absolute bottom-0 transition-all duration-300 ease hover:font-bold hover:h-full w-full h-[30%] bg-gray-500/80 active:bg-gray-600/80 text-white prose-sm hover:bg-gray-500/90 cursor-pointer">
                        edit
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <input required id='itemName' type="text" name='itemName' value={itemName} onChange={(e) => setItemName(e.target.value)} className='my-2 px-2 font-semibold capitalize rounded-md shadow-inner h-fit w-fit' />
                    <div className="flex flex-row">
                      <label htmlFor="quantity" className='text-sm'>Quantity:</label>
                      <input required id='quantity' name='quantity' type="number" min={1} value={itemQuantity} onChange={(e) => setItemQuantity(Number(e.target.value))} className='px-2 rounded-md w-[65px] ml-[5px]' />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div
                  className='hidden md:flex flex-col flex-wrap justify-between items-end h-[75px] w-fit right-0'>
                  {updating &&
                    (
                      <div className="flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                        <p className="text-xs font-normal md:text-sm">Updating!</p>
                        <BiDotsHorizontalRounded className='h-[20px] w-[20px] text-blue-500  hover:scale-110 transition-all duration-200 ease-in-out animate-spin' />
                      </div>

                    )
                  }

                  {success &&
                    (
                      <div className="flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                        <p className="text-xs font-normal md:text-sm">Updated!</p>
                        <TiTick className='h-[25px] w-[25px] text-green-500  hover:scale-110 transition-all duration-200 ease-in-out' />
                      </div>
                    )
                  }

                  {/* If updating and success is false, show the save and cancel buttons */}
                  {!updating && !success &&
                    <div className="flex flex-col items-start">
                      {/* Save Button */}

                      <div className="relative group">
                        <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-0 group-hover:w-fit flex-row items-center justify-center md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                          <p className="text-xs font-normal md:text-sm">Save</p>
                        </div>
                        <button
                          type='submit'>
                          <IoSaveSharp className='h-[23px] w-[23px] text-green-500 hover:text-green-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                        </button>
                      </div>

                      {/* Cancel Button */}
                      <div className="relative group">

                        <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-0 group-hover:w-fit flex-row items-center justify-center md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                          <p className="text-xs font-normal md:text-sm">Cancel</p>
                        </div>
                        <button className='relative'
                          onClick={() => { setEditActivated(false); setContainerStatus(false) }}
                        >
                          <MdCancel className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                        </button>
                      </div>

                      {/* Move Item Start*/}
                      <div className="relative group">
                        <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-0 group-hover:w-fit flex-row items-center justify-center md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                          <p className="text-xs font-normal md:text-sm">Move</p>
                        </div>
                        <button className='relative'
                          onClick={(e) => { e.preventDefault(); setMoveArea(true); }}
                        >
                          <BsBoxArrowRight className='h-[25px] w-[25px] text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                        </button>
                      </div>
                      {/* Move Item End*/}
                    </div>
                  }
                </div>
              </div>

              <div className='w-full my-4 h-fit flex flex-col '>

                {/* START SMALLnButtons */}
                <div
                  className='flex md:hidden flex-col xxs:flex-row flex-wrap justify-between items-end h-fit my-2 w-full gap-2'>
                  {updating &&
                    (
                      <div className="flex flex-row items-center justify-center px-2 w-full bg-gray-300 rounded-lg gap-x-2 z-2">
                        <p className="text-xs font-normal md:text-sm">Updating!</p>
                        <BiDotsHorizontalRounded className='h-[20px] w-[20px] text-blue-500  hover:scale-110 transition-all duration-200 ease-in-out animate-spin' />
                      </div>

                    )
                  }

                  {success &&
                    (
                      <div className="flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                        <p className="text-xs font-normal md:text-sm">Updated!</p>
                        <TiTick className='h-[25px] w-[25px] text-green-500  hover:scale-110 transition-all duration-200 ease-in-out' />
                      </div>
                    )
                  }

                  {/* If updating and success is false, show the save and cancel buttons */}
                  {!updating && !success &&
                    <div className="flex flex-row items-center justify-around w-full">
                      {/* Save Button */}

                      <div className="relative group">

                        <button className='relative flex flex-row items-center justify-center gap-2 border-[1px] border-gray-400/60 px-2 py-[5px] rounded-md group-hover:bg-green-300 transition-all duration-200 ease'
                          type='submit'>
                          <IoSaveSharp className='h-[23px] w-[23px] text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200 ease-in-out' />


                        </button>
                      </div>

                      {/* Move Item Start*/}
                      <div className="relative group">

                        <button className='relative flex flex-row items-center justify-center gap-2 border-[1px] border-gray-400/60 px-2 py-[5px] rounded-md group-hover:bg-blue-300 transition-all duration-200 ease'
                          onClick={(e) => { e.preventDefault(); setMoveArea(true); }}
                        >
                          <BsBoxArrowRight className='h-[25px] w-[25px] text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-200 ease-in-out' />

                        </button>
                      </div>
                      {/* Move Item End*/}

                      {/* Cancel Button */}
                      <div className="relative group">
                        <button className='relative flex flex-row items-center justify-center gap-2 border-[1px] border-gray-400/60 px-2 py-[5px] rounded-md group-hover:bg-red-300 transition-all duration-200 ease'
                          onClick={() => { setEditActivated(false); setContainerStatus(false) }}
                        >
                          <MdCancel className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />

                        </button>
                      </div>

                    </div>
                  }
                </div>
                {/* ENd of Small Buttons */}

                {/* Cook from frozen button if in freezer */}
                {(item.compartment === 'freezer' || item.compartment === 'doorFreezer') && (
                  <div>
                    <p className='mt-2'>Cook from frozen?</p>

                    <div className="flex flex-row items-center justify-start gap-2 ">

                      <div className="relative flex flex-col items-center justify-center" onClick={() => setCookedFromFrozen('yes')}>
                        <input required defaultChecked={cookedFromFrozen === 'yes'} type="radio" name="cookedFrozen" id={`cookedFrozenYes_${item.id}`} className="peer absolute bottom-0 left-3 z-[1]" />
                        <label htmlFor={`cookedFrozenYes_${item.id}`} className='border-[1px] border-black h-[40px] w-[40px] peer-checked:bg-green-400 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>Yes</label>
                      </div>

                      <div className="relative flex flex-col items-center justify-center" onClick={() => setCookedFromFrozen('no')}>
                        <input required defaultChecked={cookedFromFrozen === 'no'} type="radio" name="cookedFrozen" id={`cookedFrozenNo_${item.id}`} className="peer absolute bottom-0 left-3 z-[1]" />
                        <label htmlFor={`cookedFrozenNo_${item.id}`} className='border-[1px] border-black h-[40px] w-[40px] peer-checked:bg-red-300 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>No</label>
                      </div>

                      <div className="relative flex flex-col items-center justify-center" onClick={() => setCookedFromFrozen('NA')}>
                        <input required defaultChecked={cookedFromFrozen === 'NA'} type="radio" name="cookedFrozen" id={`cookedFrozenNA_${item.id}`} className="peer absolute bottom-0 left-3 z-[1]" />
                        <label htmlFor={`cookedFrozenNA_${item.id}`} className='border-[1px] h-[40px] w-[40px] peer-checked:bg-gray-500 peer-checked:text-gray-300 font-semibold bg-gray-200 z-[2] rounded-md  border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>N/A</label>
                      </div>
                    </div>
                  </div>
                )}
                {/* End cook from frozen */}


                <>
                  <label htmlFor="itemType" className='text-sm text-normal w-fit'>Item Main Type: <span className="text-sm italic text-gray-700">(Required)</span></label>
                  <input required id='itemType' type="text" name='itemType' value={itemType} onChange={(e) => setItemType(e.target.value)} className='ml-[5px] px-2 my-[5px] font-semibold capitalize rounded-md shadow-inner h-fit w-fit' />
                </>

                <>
                  <label htmlFor="itemMainType" className='text-sm text-normal w-fit'>Item Main Type: <span className="text-sm italic text-gray-700">(Required)</span></label>
                  <input required id='itemMainType' type="text" name='itemMainType' value={itemMainType} onChange={(e) => setItemMainType(e.target.value)} className='ml-[5px] px-2 my-[5px] font-semibold capitalize rounded-md shadow-inner h-fit w-fit' />
                </>


                <>
                  <label htmlFor="itemSubType" className='text-sm text-normal w-fit'>Item sub Type: <span className="text-sm italic text-gray-700">(Optional)</span></label>
                  <input id='itemSubType' type="text" name='itemSubType' value={itemSubType} onChange={(e) => setItemSubType(e.target.value)} className='ml-[5px] px-2 my-[5px] font-semibold capitalize rounded-md shadow-inner h-fit w-fit' />
                </>


                <label htmlFor="expiryDate" className='text-sm text-normal'>Expiry: <span className="text-sm italic text-gray-700">(Optional)</span></label>
                <input id='expiryDate' type="date" name='expiryDate' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className='ml-[5px] px-2 my-[5px] font-semibold capitalize rounded-md shadow-inner h-fit w-fit' />

                <p className='text-xs text-normal bg-gray-400/70 px-2 py-[5px] w-fit rounded-lg shadow-inner my-[5px]'>Date Added: <span className='italic'>{item.addedDate}</span></p>

                <label htmlFor="expiryDate" className='bmt-[5px] lock text-sm text-normal'>Comment: <span className="text-sm italic text-gray-700">(Optional)</span></label>
                <textarea name="comment" id="comment" placeholder='Comment (Optional)' value={itemComment} onChange={(e) => setItemComment(e.target.value)} className='px-2 rounded-md block '></textarea>

              </div>
            </form>

          ) : (
            // Not Editing
            <>
              <div className='flex flex-row items-start justify-between w-full mb-2'>
                {/* Item info */}

                <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
                  <Image alt={`${item.name} `} src={`/assets/images/items/${item.image}`} width={75} height={75} className='object-fill' />
                </div>
                <div className="w-full overflow-scroll">
                  <p className='capitalize text-md max-h-[24px] truncate'>{item.name}</p>
                  <p className='text-sm'>Quantity: {item.quantity}</p>
                  {item.expiryDate &&
                    <p className='text-sm text-normal'>Expiry: <span className='italic'>{reverseDate(item.expiryDate)}</span></p>
                  }
                  {(item.compartment === 'freezer' || item.compartment === 'doorFreezer') && item.cookedFromFrozen && (
                    <>
                      {item.cookedFromFrozen === 'yes' && (
                        <div className="flex flex-row items-center justify-start gap-1">
                          <Image className='inline' src='/assets/images/frozen.svg' width={15} height={15} alt='cook from frozen' />
                          <p className={`text-sm text-normal`}>Cook from frozen</p>
                        </div>
                      )}
                      {item.cookedFromFrozen === 'no' && (
                        <div className="flex flex-row items-center justify-start gap-1">
                          <Image className='inline' src='/assets/images/defrost.svg' width={15} height={15} alt='defrost before eating' />
                          <p className={`text-sm text-normal`}>Must be defrosted</p>
                        </div>
                      )}
                      {item.cookedFromFrozen === 'NA' && null}
                    </>
                  )}
                </div>

                {/* Buttons */}
                <div
                  className='flex flex-col flex-wrap justify-between items-center h-[75px]'>
                  {/* Edit Button */}

                  <div className="relative group">
                    <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-0 group-hover:w-fit flex-row items-center justify-center md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                      <p className="text-xs font-normal md:text-sm">Edit</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditActivated(true);
                        setContainerStatus(true);
                      }}>
                      <FaEdit className='h-[20px] w-[20px] text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                    </button>
                  </div>


                  {/* Delete Buttons */}
                  <div className="relative group">
                    <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-0 group-hover:w-fit flex-row items-center justify-center md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                      <p className="text-xs font-normal md:text-sm">Delete</p>
                    </div>
                    <button className='relative'
                      onClick={(e) => handleDelete(e)}
                    >
                      <IoCloseSharp className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                    </button>
                  </div>


                </div>

                {/* Details Button START*/}
                <p
                  id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-button`}
                  className='group w-fit h-fit flex flex-row items-center select-none cursor-pointer text-center rounded-t-md hover:scale-105 hover:bg-gray-300/20 absolute bottom-0 right-0 transition-all duration-300 ease-in-out pr-2 py-1 pl-2 text-md text-blue-600 hover:text-blue-500'
                  onClick={() => setContainerStatus((prev) => !prev)
                  }
                >
                  Details <CiCircleChevDown className={`${containerStatus ? 'rotate-180' : 'rotate-0'}  transition-all duration-300 ease h-[20px] w-[20px] ml-2`} />
                </p>
                {/* Details Button END */}

              </div>

              <div className='w-full my-4 h-fit '>
                {item.itemType &&
                  <p className='text-sm text-normal'>Item Type: <span className='italic'>{item.itemType}</span></p>
                }
                {item.itemMainType &&
                  <p className='text-sm text-normal'>Item Main Type: <span className='italic'>{item.itemMainType}</span></p>
                }
                {item.itemSubType &&
                  <p className='text-sm text-normal'>Item Sub Type: <span className='italic'>{item.itemSubType}</span></p>
                }


                {/* {item.expiryDate &&
                <p className='text-sm text-normal'>Expiry: <span className='italic'>{reverseDate(item.expiryDate)}</span></p>
              } */}
                <p className='text-sm text-normal'>Date Added: <span className='italic'>{item.addedDate}</span></p>
                {item.comment &&
                  <p className='mb-2 text-sm text-normal'>Comment: <span className='block text-sm text-normal border-gray-300 border-[1px] rounded-md bg-gray-100 p-2 italic text-gray-600'>{item.comment}</span></p>
                }
              </div></>)
        }
      </div >
    </>
  )
}

export default ItemCard