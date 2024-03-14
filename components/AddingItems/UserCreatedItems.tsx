import FadeInHOC from '../FadeInHOC/FadeInHOC';
import React from 'react'
type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
}
const UserCreatedItems = ({ selectedArea, availableItems }: Props) => {
  return (
    <div>
      <p className='my-2'>Select an item:</p>
      {/* Select Item */}
      <FadeInHOC delayNumber={200} direction='up'>
        <select name="itemName" id="itemName" className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit'>
          <option value="">Items you have created</option>
          {availableItems.map((item: availableItem, index) => (
            <option key={index} value={(item.name).toLowerCase().replace(' ', '_')} >
              {item.name}
            </option>
          ))}
        </select>
      </FadeInHOC>
    </div>
  )
}

export default UserCreatedItems