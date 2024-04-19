'use client'

import { generateUniqueId, getCurrentDate } from '@/utilities/functions';
import { useEffect, useRef, useState } from 'react';

import FadeInHOC from '../FadeInHOC/FadeInHOC';
import Image from 'next/image';
import { customImages } from '../../static/custom-item-images';
import { setTimeout } from 'timers/promises';

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
  userId: string;
  handleAddingToCurrentItems: (item: applianceItem) => void;
}
const CustomAddItem = ({ selectedArea, availableItems, userId, handleAddingToCurrentItems }: Props) => {
  const { compartment, position, level, type: locationType } = selectedArea;

  // States
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>()
  // Id of the current appliance
  const [id, setId] = useState<string>();
  const [selectedIcon, setSelectedIcon] = useState<string>()
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string>()

  // Refs
  const formRef = useRef<HTMLFormElement | null>(null);

  // Use Effects

  useEffect(() => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const idFromUrl = segments[segments.length - 1];
    setId(idFromUrl);
  }, []);

  // Functions
  const quantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity((prev => prev + 1));
    } else if (type === 'decrement') {
      if (quantity === 1) {
        console.log('Must be above zero')
      }
      setQuantity((prev => prev - 1));
    }
  };

  const getExpiryDate = (inputDate?: string) => {
    // Takes in a date in '2024-03-30' format and returns '30/03/2024'
    if (inputDate) {
      // Split the input string into year, month, and day components
      const [year, month, day] = inputDate.split('-').map(Number);

      // Create a new Date object using the components
      const date: Date = new Date(year, month - 1, day);

      // Extract the day, month, and year from the Date object and format them
      const formattedDate: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      return formattedDate
    } else {
      return '';
    }

  };


  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    // Validate quantity
    const quantity = parseInt(formValues['quantity']);
    let quantityIsValid = true;

    if (isNaN(quantity) || quantity < 1) {
      console.error('Quantity must be a number greater than or equal to 1.');
      quantityIsValid = false;
    }

    if (quantityIsValid && id) {
      const newItemId = generateUniqueId();
      let newItemObject = {
        id: newItemId,
        ownerid: parseInt(userId),
        applianceid: parseInt(id),
        name: formValues.name,
        itemType: formValues.itemType,
        itemMainType: formValues.itemMainType,
        itemSubType: formValues.itemSubType,
        addedDate: getCurrentDate(),
        expiryDate: formValues.expiryDate,
        cookedFromFrozen: formValues.cookedFromFrozen ? formValues.cookedFromFrozen : 'NA',
        quantity: parseInt(formValues.quantity),
        comment: formValues.comment ? formValues.comment : '',
        compartment: compartment,
        level: level,
        locationType: locationType,
        position: position,
        image: formValues.itemIcon,
      };
      try {
        setSubmitting(true)
        const response = await fetch('/api/appliance-items/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItemObject),
        });
        if (response.ok) {
          const customItemResponse = await fetch('/api/appliance-items/custom/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItemObject),
          });

          if (!customItemResponse.ok) {
            setError(response.statusText);
            setSubmitting(false)
          }

          setSubmitting(false)
          handleAddingToCurrentItems(newItemObject);

          if (formRef.current) {
            formRef.current.reset();
          }
          setMessage('Item Added')

        } else {
          setError(response.statusText);
          setSubmitting(false)
        }
      } catch (error) {
        console.error('Error while sending data', error);
        setError('Error while sending data, please try again');
        setSubmitting(false)
      }
    } else {
      setError('Error checking form validation')
    }
  };


  return (
    <>
      {error &&
        <div className='flex flex-col justify-center items-center w-[90%] mx-auto h-fit bg-red-500/80 py-2 px-4 rounded-b-md'>
          <p className='italic font-normal'>Error: {error}</p>
        </div>
      }

      {message &&
        <div className='flex flex-col justify-center items-center w-[90%] mx-auto h-fit bg-green-500/80 py-2 px-4 rounded-b-md'>
          <p className='italic font-normal'>{message}</p>
        </div>
      }
      <FadeInHOC delayNumber={800} direction='up'>
        <div className='w-full h-full border-[1px] border-black xxxs:p-4 rounded-md transition-all duration-200 ease overflow-hidden relative my-4'>
          {submitting &&
            <div className={`absolute top-0 left-0 w-full h-full bg-gray-400/80 z-[999] flex flex-col justify-center items-center`}>
              <p className='text-xl font-bold animate-ping'>Adding...</p>
            </div>
          }
          <FadeInHOC delayNumber={1000} direction='up' >
            <div className='mb-2'>
              <p className='font-semibold underline text-md'>Create your item</p>
              <FadeInHOC delayNumber={1000} direction='up'>
                <>
                  <p className='text-sm italic font-normal text-gray-600'>The items you create will be accessible in the &apos;Your Items&apos; option once they have been submitted.</p>
                  <p className='text-sm italic font-normal text-gray-600'>Items you create are only visible to you.</p>
                </>
              </FadeInHOC>
            </div>
          </FadeInHOC >

          <form ref={formRef} onSubmit={(e) => handleFormSubmit(e)} className='flex flex-col items-start justify-center w-full gap-2'>

            {/* Name Entry */}
            <div className='w-full'>
              <label htmlFor="name" className='mb-1'>Name your item:</label>
              <input type="text" id='name' name='name' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
            </div>
            {/* End Name Entry */}



            {/* Item Main Type */}
            <div className='w-full'>
              <label htmlFor="itemMainType" className='my-2'>Set the main type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>e.g Herb, Red Meat, Savory Snack, Seafood  </span></label>
              <input type="text" id='itemMainType' name='itemMainType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
            </div>
            {/* End Item Main Type */}

            {/* Item Type */}
            <div className='w-full'>
              <label htmlFor="itemType" className='my-2'>Set the type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>e.g Vegetable, Meat, Snack, Fish </span></label>
              <input type="text" id='itemType' name='itemType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
            </div>
            {/* End Item Type */}

            {/* Item Sub Type */}
            <div className='w-full'>
              <label htmlFor="itemSubType" className='my-2'>Set the sub type of the item: <span className='block mb-1 text-sm italic font-normal text-gray-700'>Optional </span></label>
              <input type="text" id='itemSubType' name='itemSubType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
            </div>
            {/* End Item Sub Type */}

            {/* Icon Selection */}
            <div className='w-full'>
              <p className='my-2'>Choose an Icon:</p>
              <div className='grid grid-cols-1 gap-2 xxxs:grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6'>
                {customImages.map((item, index) => (
                  <label key={index} className='flex items-center w-full mx-auto transition-all duration-200 active:scale-110 ease'>
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

            {/* Item expiry Date */}
            <div className='w-full'>
              <label htmlFor='expiryDate' className='mt-2'>Set the Expiry Date <span className='mb-1 text-sm italic font-normal text-gray-100'>(Optional)</span></label>
              <input id='expiryDate' type="date" name='expiryDate' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-[37px] block' />
            </div>

            {/* End Item expiry Date */}


            {/* Item Quantity */}
            <div className='w-full my-2'>
              <label htmlFor='quantity' className='mt-2'>Set the quantity <span className='text-sm italic font-normal text-gray-100'>(Optional)</span></label>
              <div className="flex flex-row items-center justify-start">
                <button
                  type='button'
                  disabled={quantity === 1}
                  onClick={() => void quantityChange('decrement')}
                  className={`${quantity === 1 ? 'bg-gray-300' : 'bg-red-300 hover:bg-red-400 active:bg-red-300'} hidden xxs:inline rounded-md transition-all duration-200 ease w-[40px] h-[40px] aspect-square`}
                >
                  -
                </button>
                <input
                  id='quantity'
                  min={1}
                  type="number"
                  name='quantity'
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  placeholder='1'
                  className='w-full xs:max-w-[200px] px-4 py-2 font-semibold capitalize rounded-md shadow-inner h-fit'
                />
                <button
                  type='button'
                  onClick={() => void quantityChange('increment')}
                  className="hidden xxs:inline rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-500 transition-all duration-200 ease w-[40px] h-[40px] aspect-square"
                >
                  +
                </button>
              </div>
              {/* < 300 button */}
              <div className='block xxs:hidden'>
                <button
                  type='button'
                  disabled={quantity === 1}
                  onClick={() => void quantityChange('decrement')}
                  className={`${quantity === 1 ? 'bg-gray-300' : ' bg-red-300 hover:bg-red-400 active:bg-red-300'} rounded-md transition-all duration-200 ease w-[50%] h-[40px] aspect-square`}
                >
                  -
                </button>
                <button
                  type='button'
                  onClick={() => void quantityChange('increment')}
                  className=" rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-500 transition-all duration-200 ease w-[50%] h-[40px] aspect-square"
                >
                  +
                </button>
              </div>
            </div>
            {/* End Item Quantity */}

            {/* Cook from frozen button if in freezer */}
            {compartment === 'freezer' && (
              <div>
                <p className='mt-2'>Can be cooked from frozen? <span className='text-sm italic font-normal text-gray-100'>(Optional)</span></p>

                <div className="flex flex-row items-center justify-start gap-2 ">

                  <div className="flex flex-col items-center justify-center relative">
                    <input value='yes' type="radio" name="cookedFromFrozen" id="cookedFrozenYes" className="peer absolute bottom-0 left-3 z-[1]" />
                    <label htmlFor='cookedFrozenYes' className='h-[40px] w-[40px] peer-checked:bg-green-400 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-[1px] peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>Yes</label>
                  </div>

                  <div className="flex flex-col items-center justify-center relative">
                    <input value='no' type="radio" name="cookedFromFrozen" id="cookedFrozenNo" className="peer absolute bottom-0 left-3 z-[1]" />
                    <label htmlFor='cookedFrozenNo' className='h-[40px] w-[40px] peer-checked:bg-red-300 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-[1px] peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>No</label>
                  </div>

                  <div className="flex flex-col items-center justify-center relative">
                    <input value='NA' type="radio" name="cookedFrozen" id="cookedFrozenNA" className="peer absolute bottom-0 left-3 z-[1]" />
                    <label htmlFor='cookedFrozenNA' className='h-[40px] w-[40px] peer-checked:bg-red-300 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-[1px] peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>N/A</label>
                  </div>

                </div>
              </div>
            )}
            {/* End cook from frozen */}


            {/* Comment Section */}
            <label htmlFor="comment">Enter a comment. <span className='text-sm italic font-normal text-gray-100'>(Optional)</span></label>
            <textarea name="comment" id="comment" className='w-full p-4 rounded-md'></textarea>
            {/* End Comment Section */}

            {/* Submit Button */}
            <button type="submit" className='w-full px-4 py-2 mx-auto font-semibold transition duration-200 bg-blue-500 rounded-md hover:bg-blue-400 ease active:bg-blue-500 active:shadow-md'>Add Item</button>
            {/* End Submit Button */}

          </form>

        </div >
      </FadeInHOC>
    </>
  )
}

export default CustomAddItem