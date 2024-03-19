import React, { useState } from 'react'

import FadeInHOC from '../FadeInHOC/FadeInHOC';

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
          <div>
            <label htmlFor="name" className='my-2'>Name your item:</label>
            <input type="text" id='name' name='name' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
          </div>
          {/* End Name Entry */}

          {/* Item Type */}
          {/* End Item Type */}

          {/* Item Main Type */}
          {/* End Item Main Type */}

          {/* Item Sub Type */}
          {/* End Item Sub Type */}

          {/* Item expiry Date */}
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