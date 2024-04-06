'use client'

import { useEffect, useState } from 'react';

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaEdit } from 'react-icons/fa'
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5'
import { IoSaveSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { reverseDate } from "@/utilities/functions";

type Props = {
  item: applianceItem;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[]
  userId: string;
  inSearch?: boolean;
}

// const isValidImage = (url: string): Promise<boolean> => {
//   return new Promise((resolve) => {
//     const img = document.createElement('img');
//     img.onload = () => resolve(true);
//     img.onerror = () => resolve(false);
//     img.src = url;
//   });
// };

// const getImageUrl = async (url: string): Promise<string> => {
//   try {
//     const isValid = await isValidImage(url);
//     return isValid ? url : '/assets/images/items/default.png'; // Replace '/path/to/default.png' with your default image path
//   } catch (error) {
//     console.error('Error checking image validity:', error);
//     return '/assets/images/items/default.png'; // Return default image path in case of error
//   }
// }

const ItemCard = ({ item, updateItems, items, userId, inSearch }: Props) => {


  // const [displayImageUrl, setDisplayImageUrl] = useState('/assets/images/items/default.png');

  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     const validUrl = await getImageUrl(`/assets/images/items/${item.image}`);
  //     setDisplayImageUrl(validUrl);
  //   };

  //   fetchImageUrl();
  // }, [item.image]);


  const [containerStatus, setContainerStatus] = useState(false);
  const [editActivated, setEditActivated] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [itemComment, setItemComment] = useState(item.comment || '');
  const [expiryDate, setExpiryDate] = useState(item.expiryDate || '');
  const [cookedFromFrozen, setCookedFromFrozen] = useState<string | undefined>(item.cookedFromFrozen);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<string>();

  // Functions
  const handleDelete = async (e: any) => {
    let result = confirm('Are you sure you want to delete?')

    if (result) {
      console.log('deleting item');
      try {
        let response = await fetch(`/api/appliance-items/${item.id}`, {
          method: 'DELETE',
          headers: {
            'ownerid': userId.toString()
          }
        });
        if (response.ok) {

          const filteredItems = items.filter(
            (i) => i.id != item.id
          )
          updateItems(filteredItems);
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    } else {
      e.preventDefault();
    }
  }


  const handleUpdatingItem = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: Record<string, string> = {};
    setError('');
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    const updatedItem = {
      id: item.id,
      applianceid: item.applianceid,
      ownerid: item.ownerid,
      quantity: formValues.quantity,
      cookedFromFrozen: cookedFromFrozen,
      expiryDate: formValues.expiryDate,
      comment: formValues.comment,
    }
    console.log(updatedItem);
    try {
      setUpdating(true)
      const response = await fetch(`/api/appliance-items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
        }, 1000);
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
      id: updatedItemPart.id,
      ownerid: updatedItemPart.ownerid,
      applianceid: updatedItemPart.applianceid,
      name: item.name,
      itemType: item.itemType,
      itemMainType: item.itemMainType,
      itemSubType: item.itemSubType,
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
    // console.log('Original List', items)
    // console.log('New List', updatedItems)
    updatedItems.splice(index, 1, updatedItem); // Replace the item at the found index with the updated item
    updateItems(updatedItems);
  };



  return (
    <>
      {inSearch && (<div className="mx-auto w-[97%] text-normal text-sm bg-gray-300 rounded-t-lg border-t-[1px] border-l-[1px] border-r-[1px] border-gray-600 px-2 py-[5px] "><span className="capitalize">{item.compartment}</span> {item.locationType === 'shelf' ? 'on' : 'in'} {item.locationType} {item.level} {item.position != 128 && (` at position ${item.position}`)}</div>)}

      <div
        id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-container`}
        className={`flex flex-col justify-start items-start p-2 w-full max-h-[110px] rounded-md relative border-[1px] border-gray-400 bg-gray-200 overflow-hidden transition-all duration-200 ease-in-out ${containerStatus ? 'max-h-[500px]' : 'max-h-[110px]'}`}
      >
        {/* form selection depending on the editActivated State */}
        {editActivated ? (
          // Form for editing
          <form action='' method='PUT' onSubmit={(e) => handleUpdatingItem(e)} className='w-full'>
            <div className='flex flex-row items-start justify-around w-full mb-2'>
              {/* Item info */}
              <div className='flex flex-row items-center justify-start w-full' >
                <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
                  <Image alt={`${item.name} `} src={`/assets/images/items/${item.image}`} width={75} height={75} className='object-fill' />
                </div>
                <div>
                  <p className='capitalize text-md'>{item.name}</p>
                  <label htmlFor="quantity" className='text-sm'>Quantity:</label>
                  <input id='quantity' name='quantity' type="number" min={1} required value={itemQuantity} onChange={(e) => setItemQuantity(Number(e.target.value))} className='px-2 rounded-md w-[65px] ml-[5px]' />
                </div>
              </div>

              {/* Buttons */}
              <div
                className='flex flex-col flex-wrap justify-between items-end h-[75px] w-fit right-0'>
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
                  <>
                    {/* Save Button */}

                    <div className="relative group">
                      <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-fit md:w-0 group-hover:w-fit flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                        <p className="text-xs font-normal md:text-sm">Save</p>
                      </div>
                      <button
                        type='submit'>
                        <IoSaveSharp className='h-[23px] w-[23px] text-green-500 hover:text-green-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                      </button>
                    </div>

                    {/* Cancel Button */}
                    <div className="relative group">

                      <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-fit md:w-0 group-hover:w-fit flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                        <p className="text-xs font-normal md:text-sm">Cancel</p>
                      </div>
                      <button className='relative'
                        onClick={() => { setEditActivated(false); setContainerStatus(false) }}
                      >
                        <MdCancel className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                      </button>
                    </div>
                  </>
                }

              </div>



              {/* More Info Button */}
              <p
                className='w-full h-[15px] select-none cursor-pointer text-center rounded-t-md absolute text-xs bottom-0 left-0 bg-gray-300 hover:bg-gray-400 hover:text-gray-300 border-t-[1px] border-gray-600 transition-all duration-300 ease-in-out'
                onClick={() => setContainerStatus((prev) => !prev)
                }
              >
                {containerStatus ? 'Less Info' : 'More Info'}
              </p>
            </div>

            <div className='w-full my-4 h-fit '>
              {/* Cook from frozen button if in freezer */}
              {item.compartment === 'freezer' && (
                <div>
                  <p className='mt-2'>Can be cooked from frozen?</p>

                  <div className="flex flex-row items-center justify-start gap-2 ">

                    <div className="flex flex-col items-center justify-center relative" onClick={() => setCookedFromFrozen('yes')}>
                      <input required defaultChecked={cookedFromFrozen === 'yes'} type="radio" name="cookedFrozen" id={`cookedFrozenYes_${item.id}`} className="peer absolute bottom-0 left-3 z-[1]" />
                      <label htmlFor={`cookedFrozenYes_${item.id}`} className='border-[1px] border-black h-[40px] w-[40px] peer-checked:bg-green-400 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>Yes</label>
                    </div>

                    <div className="flex flex-col items-center justify-center relative" onClick={() => setCookedFromFrozen('no')}>
                      <input required defaultChecked={cookedFromFrozen === 'no'} type="radio" name="cookedFrozen" id={`cookedFrozenNo_${item.id}`} className="peer absolute bottom-0 left-3 z-[1]" />
                      <label htmlFor={`cookedFrozenNo_${item.id}`} className='border-[1px] border-black h-[40px] w-[40px] peer-checked:bg-red-300 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>No</label>
                    </div>

                    <div className="flex flex-col items-center justify-center relative" onClick={() => setCookedFromFrozen('NA')}>
                      <input required defaultChecked={cookedFromFrozen === 'NA'} type="radio" name="cookedFrozen" id={`cookedFrozenNA_${item.id}`} className="peer absolute bottom-0 left-3 z-[1]" />
                      <label htmlFor={`cookedFrozenNA_${item.id}`} className='border-[1px] h-[40px] w-[40px] peer-checked:bg-gray-500 peer-checked:text-gray-300 font-semibold bg-gray-200 z-[2] rounded-md  border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>N/A</label>
                    </div>
                  </div>
                </div>
              )}
              {/* End cook from frozen */}

              {item.itemType &&
                <p className='text-sm text-normal'>Item Type: <span className='italic'>{item.itemType}</span></p>
              }
              {item.itemMainType &&
                <p className='text-sm text-normal'>Item Type 2: <span className='italic'>{item.itemMainType}</span></p>
              }
              {item.itemSubType &&
                <p className='text-sm text-normal'>Item sub Type: <span className='italic'>{item.itemSubType}</span></p>
              }

              <label htmlFor="expiryDate" className='text-sm text-normal'>Expiry:</label>
              <input id='expiryDate' type="date" name='expiryDate' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder='Expiry Date (Optional)' className='ml-[5px] px-2 my-[5px] font-semibold capitalize rounded-md shadow-inner h-fit' />

              <p className='text-sm text-normal'>Date Added: <span className='italic'>{item.addedDate}</span></p>

              <label htmlFor="expiryDate" className='bmt-[5px] lock text-sm text-normal'>Comment:</label>
              <textarea name="comment" id="comment" placeholder='Comment (Optional)' value={itemComment} onChange={(e) => setItemComment(e.target.value)} className='px-2 py-[] rounded-md block mb-[5px]'></textarea>

            </div>
            {error && <div className='w-full mb-4 italic text-black bg-red-500 h-fit'>Error:{error}</div>}
          </form>
        ) : (

          <>
            <div className='flex flex-row items-start justify-around w-full mb-2'>
              {/* Item info */}
              <div className='flex flex-row items-center justify-start w-full' >
                <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
                  <Image alt={`${item.name} `} src={`/assets/images/items/${item.image}`} width={75} height={75} className='object-fill' />
                </div>
                <div>
                  <p className='capitalize text-md'>{item.name}</p>
                  <p className='text-sm'>Quantity: {item.quantity}</p>
                </div>
              </div>

              {/* Buttons */}
              <div
                className='flex flex-col flex-wrap justify-between items-center h-[75px]'>
                {/* Edit Button */}

                <div className="relative group">
                  <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-fit md:w-0 group-hover:w-fit flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
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


                {/* Close Buttons */}
                <div className="relative group">
                  <div className="overflow-hidden absolute select-none top-[2px] right-[25px] group-hover:flex w-fit md:w-0 group-hover:w-fit flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                    <p className="text-xs font-normal md:text-sm">Delete</p>
                  </div>
                  <button className='relative'
                    onClick={(e) => handleDelete(e)}
                  >
                    <IoCloseSharp className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
                  </button>
                </div>

              </div>
              {/* More Info Button */}
              <p
                id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-button`}
                className='w-full h-[15px] select-none cursor-pointer text-center rounded-t-md absolute text-xs bottom-0 bg-gray-300 hover:bg-gray-400 hover:text-gray-300 border-t-[1px] border-gray-600 transition-all duration-300 ease-in-out'
                onClick={() => setContainerStatus((prev) => !prev)
                }
              >
                {containerStatus ? 'Less Info' : 'More Info'}
              </p>
            </div>
            <div className='w-full my-4 h-fit '>
              {item.compartment === 'freezer' && item.cookedFromFrozen && (
                <>
                  {item.cookedFromFrozen === 'yes' && (
                    <div className="flex flex-row justify-start items-center gap-1">
                      <Image className='inline' src='/assets/images/frozen.svg' width={15} height={15} alt='cook from frozen' />
                      <p className={`text-sm text-normal`}>Can be cooked from frozen</p>
                    </div>
                  )}
                  {item.cookedFromFrozen === 'no' && (
                    <div className="flex flex-row justify-start items-center gap-1">
                      <Image className='inline' src='/assets/images/defrost.svg' width={15} height={15} alt='defrost before eating' />
                      <p className={`text-sm text-normal`}>Must be defrosted</p>
                    </div>
                  )}
                  {item.cookedFromFrozen === 'NA' && null}
                </>
              )}

              {item.itemType &&
                <p className='text-sm text-normal'>Item Type: <span className='italic'>{item.itemType}</span></p>
              }
              {item.itemMainType &&
                <p className='text-sm text-normal'>Item Type 2: <span className='italic'>{item.itemMainType}</span></p>
              }
              {item.itemSubType &&
                <p className='text-sm text-normal'>Item sub Type: <span className='italic'>{item.itemSubType}</span></p>
              }


              {item.expiryDate &&
                <p className='text-sm text-normal'>Expiry: <span className='italic'>{reverseDate(item.expiryDate)}</span></p>
              }
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