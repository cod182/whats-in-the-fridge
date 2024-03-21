import React from 'react'

const ItemSearch = () => {
  return (
    <div className='w-full h-fit'>
      <p>Search for an item</p>
      <form>
        <input type="text" className='rounded-md border-[1px] border-black py-2 px-4 text-gray-500' placeholder='Search for an item' />
      </form>
    </div>
  )
}

export default ItemSearch