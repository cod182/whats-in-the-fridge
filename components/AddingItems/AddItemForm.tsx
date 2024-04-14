type Props = {
  handleFormSubmit: (e: any) => void
  quantity: number;
  setQuantity: (value: number) => void;
  quantityChange: (type: 'increment' | 'decrement') => void;
  compartment: string;
}

const AddItemForm = ({ handleFormSubmit, quantity, setQuantity, quantityChange, compartment }: Props) => {

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className='flex flex-col items-start justify-center gap-2'>
      {/* Expiry Date Section */}
      <label htmlFor='expiryDate' className='mt-2'>Set the Expiry Date <span className='text-sm italic font-normal text-gray-100'>(Optional)</span></label>
      <input id='expiryDate' type="date" name='expiryDate' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit min-h-[35px]' />

      {/* Item Quantity */}
      <div className='w-full'>
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
      {(compartment === 'freezer' || compartment === 'doorFreezer') && (
        <div>
          <p className='mt-2'>Can be cooked from frozen?</p>

          <div className="flex flex-row items-center justify-start gap-2 ">

            <div className="relative flex flex-col items-center justify-center">
              <input value='yes' required type="radio" name="cookedFromFrozen" id="cookedFrozenYes" className="peer absolute bottom-0 left-3 z-[1]" />
              <label htmlFor='cookedFrozenYes' className='h-[40px] w-[40px] peer-checked:bg-green-400 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-[1px] peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>Yes</label>
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <input value='no' required type="radio" name="cookedFromFrozen" id="cookedFrozenNo" className="peer absolute bottom-0 left-3 z-[1]" />
              <label htmlFor='cookedFrozenNo' className='h-[40px] w-[40px] peer-checked:bg-red-300 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-[1px] peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>No</label>
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <input value='NA' required type="radio" name="cookedFromFrozen" id="cookedFrozenNA" className="peer absolute bottom-0 left-3 z-[1]" />
              <label htmlFor='cookedFrozenNA' className='h-[40px] w-[40px] peer-checked:bg-red-300 font-semibold bg-gray-200 z-[2] rounded-md peer-checked:border-[1px] peer-checked:border-black py-2 text-center hover:bg-gray-300 active:bg-gray-400'>N/A</label>
            </div>
          </div>
        </div>
      )}
      {/* End cook from frozen */}

      {/* Comment Section */}
      <label htmlFor="comment">Enter a comment. <span className='text-sm italic font-normal text-gray-100'>(Optional)</span></label>
      <textarea name="comment" id="comment" className='w-full p-4 rounded-md'></textarea>

      <button type="submit" className='w-full px-4 py-2 mx-auto font-semibold transition duration-200 bg-blue-500 rounded-md hover:bg-blue-400 ease active:bg-blue-500 active:shadow-md'>Add Item</button>
    </form>
  )
}

export default AddItemForm