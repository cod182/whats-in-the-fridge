type Props = {
  handleFormSubmit: (e: any) => void
  quantity: number;
  setQuantity: (value: number) => void;
  quantityChange: (type: 'increment' | 'decrement') => void;
}

const AddItemForm = ({ handleFormSubmit, quantity, setQuantity, quantityChange }: Props) => {

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className='flex flex-col justify-center items-start gap-2'>
      {/* Expiry Date Section */}
      <label htmlFor='expiryDate' className='mt-2'>Set the Expiry Date <span className='italic text-gray-100 font-normal text-sm'>(Optional)</span></label>
      <input id='expiryDate' type="date" name='expiryDate' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />

      {/* Item Quantity */}
      <div className='w-full'>
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

      <button type="submit" className='px-4 py-2 bg-blue-500 rounded-md w-full hover:bg-blue-400 transition duration-200 ease mx-auto font-semibold active:bg-blue-500 active:shadow-md'>Add Item</button>
    </form>
  )
}

export default AddItemForm