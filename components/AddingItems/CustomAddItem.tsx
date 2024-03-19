'use client'

import FadeInHOC from '../FadeInHOC/FadeInHOC';
import Image from 'next/image';
import { customImages } from '../../static/custom-item-images';
import { useState } from 'react';

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
  userId: string;
  handleAddingToCurrentItems: (item: applianceItem) => void;
}
const CustomAddItem = ({ selectedArea, availableItems, userId }: Props) => {

  // States
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>()
  const [id, setId] = useState<string>();
  const [selectedIcon, setSelectedIcon] = useState<string>()
  console.log(selectedIcon);


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
  return (
    <FadeInHOC delayNumber={800} direction='up'>
      <div className='w-full h-full border-[1px] border-black xxxs:p-4 rounded-md transition-all duration-200 ease overflow-hidden relative my-4'>
        <FadeInHOC delayNumber={1000} direction='up' >
          <div className='mb-2'>
            <p className='underline text-md font-semibold'>Create your item</p>
            <FadeInHOC delayNumber={1000} direction='up'>
              <>
                <p className='text-sm italic text-gray-600 font-normal'>The items you create will be accessible in the &apos;Your Items&apos; option once they have been submitted.</p>
                <p className='text-sm italic text-gray-600 font-normal'>Items you create are only visible to you.</p>
              </>
            </FadeInHOC>
          </div>
        </FadeInHOC >

        <form action='' method='POST'>

          {/* Name Entry */}
          <div className='my-2'>
            <label htmlFor="name" className='mb-1'>Name your item:</label>
            <input type="text" id='name' name='name' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
          </div>
          {/* End Name Entry */}



          {/* Item Main Type */}
          <div className='my-2'>
            <label htmlFor="itemMainType" className='my-2'>Set the main type of the item: <span className='font-normal text-sm italic block text-gray-700 mb-1'>e.g Herb, Red Meat, Savory Snack, Seafood  </span></label>
            <input type="text" id='itemMainType' name='itemMainType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
          </div>
          {/* End Item Main Type */}

          {/* Item Type */}
          <div className='my-2'>
            <label htmlFor="itemType" className='my-2'>Set the type of the item: <span className='font-normal text-sm italic block text-gray-700 mb-1'>e.g Vegetable, Meat, Snack, Fish </span></label>
            <input type="text" id='itemType' name='itemType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
          </div>
          {/* End Item Type */}

          {/* Item Sub Type */}
          <div className='my-2'>
            <label htmlFor="itemSubType" className='my-2'>Set the sub type of the item: <span className='font-normal text-sm italic block text-gray-700 mb-1'>Optional </span></label>
            <input type="text" id='itemSubType' name='itemSubType' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
          </div>
          {/* End Item Sub Type */}

          {/* Icon Selection */}
          <div className='my-2'>
            <div className='grid grid-cols-1 xxxs:grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2'>
              {customImages.map((item, index) => (
                <label key={index} className='flex items-center w-full mx-auto active:scale-110 transition-all duration-200 ease'>
                  <input
                    type="radio"
                    name="itemIcon"
                    value={item.name}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                    className='mr-2 hidden group'
                    checked={selectedIcon === item.name}
                  />
                  <div className="flex flex-col justify-center items-center mx-auto">
                    <Image
                      src={`/assets/images/itemTypes/${item.icon}`}
                      alt={item.name}
                      className={`mx-auto hover:scale-110 transition-all duration-200 ease ${selectedIcon === item.name ? 'rounded-full scale-110 border-[1px] shadow-xl border-green-200' : ''} `}
                      width={50}
                      height={50}
                    />
                    <p className={`capitalize `}>
                      {item.name}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          {/* End Icon Selection */}

          {/* Item expiry Date */}
          <div className='my-2'>
            <label htmlFor='expiryDate' className='mt-2'>Set the Expiry Date <span className='italic text-gray-100 font-normal text-sm mb-1'>(Optional)</span></label>
            <input id='expiryDate' type="date" name='expiryDate' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
          </div>

          {/* End Item expiry Date */}


          {/* Item Quantity */}
          <div className='w-full my-2'>
            <label htmlFor='quantity' className='mt-2'>Set the quantity <span className='italic text-gray-100 font-normal text-sm'>(Optional)</span></label>
            <div className="flex flex-row justify-start items-center">
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


          {/* Comment Section */}
          <label htmlFor="comment">Enter a comment. <span className='italic text-gray-100 font-normal text-sm'>(Optional)</span></label>
          <textarea name="comment" id="comment" className='w-full rounded-md p-4'></textarea>
          {/* End Comment Section */}

          {/* Submit Button */}
          <button type="submit" className='px-4 py-2 bg-blue-500 rounded-md w-full hover:bg-blue-400 transition duration-200 ease mx-auto font-semibold active:bg-blue-500 active:shadow-md'>Add Item</button>
          {/* End Submit Button */}

        </form>

      </div >
    </FadeInHOC>
  )
}

export default CustomAddItem