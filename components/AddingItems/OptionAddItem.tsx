'use client'

import React, { useEffect, useState } from 'react'

import AddItemForm from './AddItemForm';
import FadeInHOC from '../FadeInHOC/FadeInHOC'
import Image from 'next/image';
import { getCurrentDate } from '@/utilities/functions';

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
  userId: string;
}

const OptionAddItem = ({ availableItems, selectedArea, userId }: Props) => {

  const { compartment, position, level, type: locationType } = selectedArea;

  // States
  const [id, setId] = useState<string>();
  const [itemType, setItemType] = useState<string>('')
  const [selectItemType, setSelectItemType] = useState<string>()
  const [selectedItem, setSelectedItem] = useState<availableItem | userCreatedItem | null>()
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)

  // Use Effects

  useEffect(() => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const idFromUrl = segments[segments.length - 1];
    setId(idFromUrl);
  }, []);


  useEffect(() => {
    setItemType('');
    setSelectItemType('');
  }, [selectedArea])


  // Functions

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


  const handleSelectChange = (e: any) => {
    // Handling a change and setting states
    setSelectItemType(e.target.value);
    setItemType(e.target.value);
    setSelectedItem(null);
  }

  const handleChangeSelectedItem = (item: any) => {
    setSelectedItem(item);
  };


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
    let isValid = true;

    if (isNaN(quantity) || quantity < 1) {
      console.error('Quantity must be a number greater than or equal to 1.');
      isValid = false;
    }

    if (isValid && selectedItem && id) {
      console.log('Form is valid. Submitting data:', formValues);
      // Proceed to send this data to the api
      try {
        setSubmitting(true)
        const response = await fetch('/api/appliance-items/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            applianceId: parseInt(id),
            itemName: selectedItem.name,
            itemType: selectedItem.itemType,
            itemMainType: selectedItem.itemMainType ? selectedItem.itemMainType : '',
            itemSubType: selectedItem.itemSubType ? selectedItem.itemSubType : '',
            addedDate: getCurrentDate(),
            expiryDate: formValues.expiryDate ? formValues.expiryDate : '',
            itemQuantity: parseInt(formValues.quantity),
            comment: formValues.comment ? formValues.comment : '',
            compartment: compartment,
            level: level.toString(),
            locationType: locationType,
            position: position ? position : '',
          }),
        });
        if (response.ok) {
          console.log('ok', response);
          setSubmitting(false)
          setItemType('');
          setSelectItemType('');
          setSelectedItem(null);
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
  }

  return (
    <>
      {error &&
        <div className='flex flex-col justify-center items-center w-[90%] mx-auto h-fit bg-red-500/80 py-2 px-4 rounded-b-md'>
          <p className='italic font-normal'>Error: {error}</p>
        </div>
      }
      <FadeInHOC delayNumber={200} direction='down'>
        <div className={`flex flex-col p-4 transition-all duration-200 ease relative`}>
          <div className='flex flex-col items-center justify-center relative'>
            {submitting &&
              <div className={`absolute top left w-full h-full bg-gray-400/50 z-[999] flex flex-col justify-center items-center`}>
                <p>Adding to your Fridge...</p>
              </div>
            }
            <div className='w-full h-full border-[1px] border-black p-4 rounded-md transition-all duration-200 ease overflow-hidden relative'>
              <FadeInHOC delayNumber={1000} direction='up'>
                <div className="w-full h-fit">
                  <p>Choose your type of item:</p>
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
                    // TODO
                    // Form needs to send the applianceId to api
                    // Form needs to send the userId to the api
                    // Form needs to send the compartment to the api
                    // Form needs to send the position to the api
                    // Form needs to send the level to the api

                    <form onSubmit={(e) => handleFormSubmit(e)} className='flex flex-col justify-center items-start gap-2'>
                      {/* <input id='name' type="hidden" name='name' value={selectedItem.name} className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
                    <input id='itemMainType' type="hidden" name='itemMainType' value={selectedItem.itemMainType} className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
                    <input id='itemType' type="hidden" name='itemType' value={selectedItem.itemType} className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
                    <input id='itemSubType' type="hidden" name='itemSubType' value={selectedItem.itemSubType} className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
                    <input id='addedDate' type="hidden" name='addedDate' value={getCurrentDate()} className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit' /> */}

                      <label htmlFor='expiryDate' className='mt-2'>Set the Expiry Date <span className='italic text-gray-100 font-normal text-sm'>(Optional)</span></label>
                      <input id='expiryDate' type="date" name='expiryDate' className='w-full px-4 py-2 mb-2 font-semibold capitalize rounded-md shadow-inner h-fit' />
                      {/* Quantity Selector */}
                      <div>
                        <label htmlFor='quantity' className='mt-2'>Set the quantity <span className='italic text-gray-100 font-normal text-sm'>(Optional)</span></label>
                        <div className="flex flex-row justify-center items-center">
                          <button type='button' disabled={quantity === 0} onClick={() => void quantityChange('decrement')} className={`${quantity === 0 ? 'bg-gray-300' : 'bg-red-300 hover:bg-red-400 active:bg-red-300'} px-4 py-2 mr-2  rounded-md`}>-</button>
                          <input
                            id='quantity'
                            min={1}
                            type="number"
                            name='quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            placeholder='1'
                            className='w-fit px-4 py-2 font-semibold capitalize rounded-md shadow-inner h-fit'
                          />
                          <button type='button' onClick={() => void quantityChange('increment')} className="px-4 py-2 ml-2 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-500">+</button>
                        </div>
                      </div>
                      <label htmlFor="comment">Enter a comment. <span className='italic text-gray-100 font-normal text-sm'>(Optional)</span></label>
                      <textarea name="comment" id="comment" className='w-full rounded-md p-4'></textarea>

                      <button type="submit" className='px-4 py-2 bg-blue-500 rounded-md w-full hover:bg-blue-400 transition duration-200 ease mx-auto font-semibold active:bg-blue-500 active:shadow-md'>Add Item</button>
                    </form>
                  }
                </div>
              </FadeInHOC>
            </div>
          </div>

        </div >
      </FadeInHOC >
    </>
  )
}

export default OptionAddItem