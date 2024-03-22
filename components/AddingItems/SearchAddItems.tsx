'use client'

import React, { useEffect, useState } from 'react'
import { generateUniqueId, getCurrentDate } from '@/utilities/functions';

import AddItemForm from './AddItemForm';
import FadeInHOC from '../FadeInHOC/FadeInHOC';
import Image from 'next/image';
import UserCreatedItems from './UserCreatedItems';

type Props = {
  selectedArea: selectionProps;
  preMadeItems: availableItem[];
  userCreatedItems: availableItem[];
  userId: string;
  handleAddingToCurrentItems: (item: applianceItem) => void;
}

const SearchAddItems = ({ preMadeItems, userCreatedItems, selectedArea, userId, handleAddingToCurrentItems }: Props) => {
  const { compartment, position, level, type: locationType } = selectedArea;
  // States

  const [searchQuery, setSearchQuery] = useState<string>()
  const [searchResults, setSearchResults] = useState<availableItem[]>()
  const [message, setMessage] = useState<string>()
  const [selectedItem, setSelectedItem] = useState<availableItem | null>()
  const [quantity, setQuantity] = useState<number>(1)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [id, setId] = useState<string>();
  const [selectedItems, setSelectedItems] = useState<availableItem[]>(preMadeItems)
  const [selectedItemsGroup, setSelectedItemsGroup] = useState<string>('pre')

  // UseStates

  // Use Effects
  useEffect(() => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const idFromUrl = segments[segments.length - 1];
    setId(idFromUrl);
  }, []);

  // Functions

  // Handles search entry
  const handleSearch = (searchTerm: string) => {
    setSearchResults([]); // Reset search results when the search term changes
    setMessage('')
    setSelectedItem(null);
    if (searchTerm.trim() === '') {
      setMessage('Enter a Search Term')
      return;
    };
    // Search the array of items
    const results = selectedItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length === 0) {
      setMessage('No Results.')
    }
    // set the results to the state
    setSearchResults(results);
  }

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
          setSelectedItem(null);
          handleAddingToCurrentItems(newItemObject);
          setMessage('Item Added')
          setTimeout(() => {
            setMessage('');
          }, 1000)

        } else {
          setError(response.statusText);
          setTimeout(() => {
            setError('');
          }, 1000)
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
  };

  // handles changing the quantity entered
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
    <>
      {/* Error Message */}
      {error &&
        <div className='flex flex-col justify-center items-center w-[90%] mx-auto h-fit bg-red-500/80 py-2 px-4 rounded-b-md'>
          <p className='italic font-normal'>Error: {error}</p>
        </div>
      }
      {/* Error Message End */}
      < FadeInHOC delayNumber={800} direction='down'>
        <>
          {/* Submitting Overlay */}
          {submitting &&
            <div className={`absolute top left w-full h-full bg-gray-400/50 z-[999] flex flex-col justify-center items-center`}>
              <p className='text-xl font-bold animate-ping'>Adding...</p>
            </div>
          }
          <div className={`relative flex flex-wrap flex-col items-start my-2 p-2 bg-blue-200 rounded-md w-full overflow-hidden h-fit transition-all ease duration-300`}>
            <div className='flex flex-row flex-wrap items-center justify-start w-full'>
              <div className={`flex flex-row gap-x-2 items-center transition-all duration-200 ease overflow-hidden rounded-md mt-2 sm:mt-0 w-full sm:px-4`}>
                <input type="text" className='rounded-md border-[1px] border-black px-4 text-gray-500 h-[40px] w-full' value={searchQuery} placeholder='Search for an item' onChange={(e) => { handleSearch(e.target.value); setSearchQuery(e.target.value); }} />
                {/* Buttons for selecting between items if usercreated items are avvailable*/}
                {UserCreatedItems.length >= 1 && (
                  <div className='flex flex-row items-center gap-x-[5px]'>
                    <button
                      className={`w-[30px] h-[30px] rounded-md flex items-center justify-center ${selectedItemsGroup === 'pre' ? 'bg-green-400 hover:bg-green-300 active:bg-green-400' : 'bg-blue-400 hover:bg-blue-300 active:bg-blue-400'} transition-all duration-200 ease`}
                      onClick={() => {
                        setSelectedItems(preMadeItems);
                        setSelectedItemsGroup('pre');
                        setSearchResults([]);
                        setSearchQuery('');
                        setSelectedItem(null);
                      }}
                    >
                      <Image src='/assets/images/options.svg' alt='pre-made icon' width={20} height={20} className="object-fill" />
                    </button>
                    <button
                      className={`w-[30px] h-[30px] rounded-md flex items-center justify-center ${selectedItemsGroup === 'user' ? 'bg-green-400 hover:bg-green-300 active:bg-green-400' : 'bg-blue-400 hover:bg-blue-300 active:bg-blue-400'} transition-all duration-200 ease`}
                      onClick={() => {
                        setSelectedItems(userCreatedItems);
                        setSelectedItemsGroup('user');
                        setSearchResults([]);
                        setSearchQuery('');
                        setSelectedItem(null);
                      }}
                    >
                      <Image src='/assets/images/user-created.svg' alt='pre-made icon' width={20} height={20} className="object-fill" />
                    </button>
                  </div>
                )
                }
              </div>
            </div >

            {/* Results */}
            < FadeInHOC delayNumber={800} direction='down' >
              <>
                <div className={`overflow-hidden w-full transition-all duration-200 ease px-4 ${!selectedItem ? 'max-h-[1000px]' : 'max-h-[0px]'}`}>
                  <div className={`max-h-[400px] w-full mt-2 flex flex-col justify-start items-start overflow-hidden transition-all duration-200 ease`}>
                    <div className='flex flex-row items-center justify-start gap-x-2'>
                      <p className='font-semibold underline'>Available Items:</p><span className=''>{searchResults?.length}</span>
                    </div>
                    <div className='flex flex-row flex-wrap items-center gap-2 w-full max-h-[300px] overflow-scroll py-4'>
                      {searchResults && searchResults.length > 0 ?
                        searchResults?.map((item) => (
                          <div
                            key={item.id}
                            className='bg-gray-400 rounded-lg px-2 py-[5px] cursor-pointer hover:bg-gray-300 active:bg-gray-500 transition-all duration-200 ease hover:shadow-md hover:scale-105'
                            onClick={() => {
                              setSelectedItem(item);
                              setSearchResults([]);
                            }}
                          >
                            {item.name}
                          </div>
                        ))
                        :
                        (
                          <div className={`w-full bg-gray-400/40 rounded-lg  ${message ? 'p-4' : ''}`}>
                            {message}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </>
            </FadeInHOC >

            <div className={`my-2 px-4 w-full ${selectedItem ? 'max-h-[1000px]' : 'max-h-[0px]'} overflow-hidden`}>
              <FadeInHOC delayNumber={800} direction='down'>
                <>
                  <p className='font-bold'>Adding: {selectedItem?.name}</p>
                  <AddItemForm handleFormSubmit={handleFormSubmit} quantity={quantity} setQuantity={setQuantity} quantityChange={quantityChange} />
                </>
              </FadeInHOC>
            </div>

          </div >
        </>
      </FadeInHOC>
    </>
  )
}

export default SearchAddItems;