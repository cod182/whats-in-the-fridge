'use client'

import { FaEdit } from 'react-icons/fa'
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5'
import { IoSaveSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useState } from 'react';

type Props = {
  item: applianceItem;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[]
  userId: string;
}

const ItemCard = ({ item, updateItems, items, userId }: Props) => {


  const [containerStatus, setContainerStatus] = useState(false)
  const [editActivated, setEditActivated] = useState(false)

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

  const reverseDate = (inputDate: string): string => {

    // Split the input string into day, month, and year components
    const [day, month, year] = inputDate.split('/').map(Number);

    // Form the reversed date string in 'YYYY-MM-DD' format
    const reversedDate: string = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return reversedDate;
  };

  const handleUpdatingItem = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    console.log('Update item', formValues)

  }

  const [itemQuantity, setItemQuantity] = useState(item.quantity)
  const [itemComment, setItemComment] = useState(item.comment || '')
  const [expiryDate, setExpiryDate] = useState(item.expiryDate && reverseDate(item.expiryDate))

  return (
    <div
      id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-container`}
      className={`flex flex-col justify-start items-start p-2 w-full max-h-[110px] rounded-md relative border-[1px] border-gray-400 bg-gray-200 overflow-hidden transition-all duration-200 ease-in-out ${containerStatus ? 'max-h-[500px]' : 'max-h-[110px]'}`}
    >
      <p className={`${editActivated ? 'h-fit border-2 border-blue-300 py-2' : 'h-0'} w-fit overflow-hidden text-blue-400/60 font-bold text-2xl absolute bottom-5 right-0 mr-5 transition-all duration-200 ease px-2`}>Editing</p>

      {editActivated ? (
        <form action='' method='' onSubmit={(e) => handleUpdatingItem(e)} className='w-full'>
          <div className='flex flex-row items-start justify-around w-full mb-2'>
            {/* Item info */}
            <div className='flex flex-row items-center justify-start w-full' >
              <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
                <Image alt={`${item.name} `} src={`/assets/images/items/${item.image}`} fill className='object-fill' />
              </div>
              <div>
                <p className='capitalize text-md'>{item.name}</p>
                <label htmlFor="quantity" className='text-sm'>Quantity:</label>
                <input id='quantity' name='quantity' type="number" min={1} required value={itemQuantity} onChange={(e) => setItemQuantity(Number(e.target.value))} className='px-2 rounded-md w-[65px] ml-[5px]' />
              </div>
            </div>

            {/* Buttons */}
            <div
              className='flex flex-col flex-wrap justify-between items-center h-[75px] w-fit right-0'>
              {/* Save Button */}
              <button
                type='submit'>
                <IoSaveSharp className='h-[20px] w-[20px] text-green-500 hover:text-green-600 hover:scale-110 transition-all duration-200 ease-in-out' />
              </button>

              {/* Cancel Button */}
              <button className='relative'
                onClick={() => { setEditActivated(false); setContainerStatus(false) }}
              >
                <MdCancel className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
              </button>
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
        </form>
      ) : (

        <>
          <div className='flex flex-row items-start justify-around w-full mb-2'>
            {/* Item info */}
            <div className='flex flex-row items-center justify-start w-full' >
              <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
                <Image alt={`${item.name} `} src={`/assets/images/items/${item.image}`} fill className='object-fill' />
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
              <button
                onClick={() => {
                  setEditActivated(true);
                  setContainerStatus(true);
                }}>
                <FaEdit className='h-[20px] w-[20px] text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-200 ease-in-out' />
              </button>

              {/* Remove Buttons */}
              <button className='relative'
                onClick={(e) => handleDelete(e)}
              >
                <IoCloseSharp className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
              </button>
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
              <p className='text-sm text-normal'>Expiry: <span className='italic'>{item.expiryDate}</span></p>
            }
            <p className='text-sm text-normal'>Date Added: <span className='italic'>{item.addedDate}</span></p>
            {item.comment &&
              <p className='mb-2 text-sm text-normal'>Comment: <span className='block text-sm text-normal border-gray-300 border-[1px] rounded-md bg-gray-100 p-2 italic text-gray-600'>{item.comment}</span></p>
            }

          </div></>)
      }
    </div >
  )
}

export default ItemCard