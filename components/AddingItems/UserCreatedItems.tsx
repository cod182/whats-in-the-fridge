'use client'

import React, { useEffect, useState } from 'react'
import { generateUniqueId, getCurrentDate } from '@/utilities/functions';

import AddItemForm from './AddItemForm';
import FadeInHOC from '../FadeInHOC/FadeInHOC';

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
  userId: string;
  handleAddingToCurrentItems: (item: applianceItem) => void;
}
const UserCreatedItems = ({ selectedArea, availableItems, userId, handleAddingToCurrentItems }: Props) => {
  const { compartment, position, level, type: locationType } = selectedArea;
  // States
  const [id, setId] = useState<string>();
  const [itemType, setItemType] = useState<string>('');
  const [selectItemType, setSelectItemType] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<availableItem | userCreatedItem | null>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>();

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

      // Proceed to send this data to the api
      const newItemId = generateUniqueId();
      let newItemObject = {
        id: newItemId,
        ownerid: parseInt(userId),
        applianceid: parseInt(id),
        name: selectedItem.name,
        itemType: selectedItem.itemType,
        itemMainType: selectedItem.itemMainType ? selectedItem.itemMainType : '',
        itemSubType: selectedItem.itemSubType ? selectedItem.itemSubType : '',
        cookedFromFrozen: formValues.cookedFromFrozen ? formValues.cookedFromFrozen : undefined,
        addedDate: getCurrentDate(),
        expiryDate: formValues.expiryDate,
        quantity: parseInt(formValues.quantity),
        comment: formValues.comment ? formValues.comment : '',
        compartment: compartment,
        level: level,
        locationType: locationType,
        position: position ? position : 0,
        image: selectedItem.image,
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

          setSubmitting(false)
          setItemType('');
          setSelectItemType('');
          setSelectedItem(null);
          handleAddingToCurrentItems(newItemObject);
          setMessage('Item Added')

        } else {
          setError(response.statusText);
          setSubmitting(false)
          setMessage('')
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
      {/* Error Message */}
      {error &&
        <div className='flex flex-col justify-center items-center w-[90%] mx-auto h-fit bg-red-500/80 py-2 px-4 rounded-b-md'>
          <p className='italic font-normal'>Error: {error}</p>
        </div>
      }
      {/* Error Message End */}

      {/* Message */}
      {message &&
        <div className='flex flex-col justify-center items-center w-[90%] mx-auto h-fit bg-green-500/80 py-2 px-4 rounded-b-md'>
          <p className='italic font-normal'>{message}</p>
        </div>
      }
      {/* Message End */}


      <FadeInHOC delayNumber={800} direction='down'>
        <div className={`flex flex-col py-2 xs:p-4 transition-all duration-200 ease relative`}>
          <div className='relative flex flex-col items-center justify-center'>
            {/* Loading Overlay */}
            {submitting &&
              <div className={`absolute top left w-full h-full bg-gray-400/50 z-[999] flex flex-col justify-center items-center`}>
                <p className='text-xl font-bold animate-ping'>Adding...</p>
              </div>
            }
            {/* Loading Overlay End */}

            <div className='w-full h-full border-[1px] border-black xxxs:p-4 rounded-md transition-all duration-200 ease overflow-hidden relative'>
              {/* Select Item */}
              <div className={`flex w-full h-fit`}>
                <FadeInHOC delayNumber={200} direction='up' classes='w-full'>

                  <>
                    <select
                      name="itemName"
                      id="itemName"
                      className='w-full px-4 py-2 my-2 font-semibold capitalize rounded-md shadow-inner h-fit'
                      onChange={(e) => handleChangeSelectedItem(JSON.parse(e.target.value))}
                      defaultValue="" // set default value to an empty string
                    >
                      <option value="" disabled hidden>Item Types</option> {/* make the default option hidden */}
                      {availableItems.map((item: availableItem, index) => (
                        <option key={index} value={JSON.stringify(item)} >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </>
                </FadeInHOC>
              </div>

              <FadeInHOC delayNumber={200} direction='up'>
                <div className={`h-fit w-full transition-all duration-200 ease`}>
                  {selectedItem != null &&
                    <AddItemForm compartment={compartment} handleFormSubmit={handleFormSubmit} quantity={quantity} setQuantity={setQuantity} quantityChange={quantityChange} />

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

export default UserCreatedItems