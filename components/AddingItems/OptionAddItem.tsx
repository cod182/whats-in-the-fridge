import React, { useEffect, useState } from 'react'

import AddItemForm from './AddItemForm';
import FadeInHOC from '../FadeInHOC/FadeInHOC'
import Image from 'next/image';

const getItemMainTypes = (data: availableItem[]) => {
  const itemTypes = new Set();
  data.map((item: availableItem) => {
    itemTypes.add(item.itemMainType);
  })
  return Array.from(itemTypes);
}

const getItemsOfType = (type: string, itemData: availableItem[]) => {
  const itemsOfType = itemData.filter(item => item.itemMainType === type);
  return itemsOfType;
}

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
}

const OptionAddItem = ({ availableItems, selectedArea }: Props) => {
  const { compartment, position, level } = selectedArea;
  const [itemType, setItemType] = useState<string>('')
  const [selectItemType, setSelectItemType] = useState<string>()
  const [selectedItem, setSelectedItem] = useState<availableItem | userCreatedItem | null>()

  useEffect(() => {
    setItemType('');
    setSelectItemType('');
  }, [selectedArea])


  const handleSelectChange = (e: any) => {
    setSelectItemType(e.target.value);
    setItemType(e.target.value);
    setSelectedItem(null);
  }

  const handleChangeSelectedItem = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <FadeInHOC delayNumber={200} direction='down'>
      <div className='flex flex-col p-4 transition-all duration-200 ease'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full h-full border-[1px] border-black p-4 rounded-md transition-all duration-200 ease'>
            <FadeInHOC delayNumber={1000} direction='up'>
              <div className="w-full h-fit">
                <p>Choose your type of item:</p>
                {/* <select name="itemName" id="itemName" className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit' value={selectItemType} onChange={(e) => handleSelectChange(e)}>
                  <option value="">Item Types</option>
                  {getItemMainTypes(availableItems).map((item, index) => (
                    <option key={index} value={(item as string).toLowerCase().replace(' ', '_')} >
                      {item as string}
                    </option>
                  ))}
                </select> */}

                <div className='flex flex-wrap justify-center items-center gap-2'>
                  {getItemMainTypes(availableItems).map((item, index) => (
                    <label key={index} className='flex items-center mr-4 active:scale-110 transition-all duration-200 ease'>
                      <input
                        type="radio"
                        name="itemName"
                        value={(item as string).toLowerCase().replace(' ', '_')}
                        checked={selectItemType === (item as string).toLowerCase().replace(' ', '_')}
                        onChange={(e) => handleSelectChange(e)}
                        className='mr-2 hidden group'
                      />
                      <div className="flex flex-col justify-normal items-start">
                        <Image
                          src={`/assets/images/itemTypes/${(item as string).toLowerCase().replace(' ', '_')}.svg`}
                          alt={(item as string)}
                          className={`mx-auto hover:scale-110 transition-all duration-200 ease ${selectItemType === (item as string).toLowerCase().replace(' ', '_') ? 'rounded-full scale-110 border-[1px] shadow-xl border-green-200' : ''} `}
                          width={50}
                          height={50}
                        />
                        <p className={`capitalize ${selectItemType === (item as string).toLowerCase().replace(' ', '_') ? 'font-semibold' : ''}`}>
                          {(item as string)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </FadeInHOC>


            {/* Select Item */}
            <div className={`${itemType != '' ? 'flex' : 'hidden'} w-full h-fit`}>
              {itemType != '' &&
                <FadeInHOC delayNumber={200} direction='up' classes='w-full'>
                  <select
                    name="itemName"
                    id="itemName"
                    className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit'
                    onChange={(e) => handleChangeSelectedItem(JSON.parse(e.target.value))}
                  >
                    <option value="" disabled>Item Types</option>
                    {getItemsOfType(itemType, availableItems).map((item: availableItem, index) => (
                      <option key={index} value={JSON.stringify(item)} >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </FadeInHOC>
              }
            </div>
            <FadeInHOC delayNumber={200} direction='up'>
              <div className={`h-fit w-full transition-all duration-200 ease`}>
                {selectedItem != null &&
                  <form action='' method='POST'>
                    <input type="hidden" name='itemName' value={selectedItem.name} />
                    <input type="hidden" name='itemMainType' value={selectedItem.itemMainType} />
                    <input type="hidden" name='itemType' value={selectedItem.itemType} />
                    <input type="hidden" name='itemSubType' value={selectedItem.itemSubType} />
                    <input type="hidden" name='itemImage' value={selectedItem.image} />
                    <button type="submit" className='px-4 py-2 bg-blue-500 rounded-md w-full hover:bg-blue-400 transition duration-200 ease mx-auto font-semibold active:bg-blue-500 active:shadow-md'>Add Item</button>
                  </form>
                }
              </div>
            </FadeInHOC>

          </div>
        </div>

      </div >
    </FadeInHOC >
  )
}

export default OptionAddItem