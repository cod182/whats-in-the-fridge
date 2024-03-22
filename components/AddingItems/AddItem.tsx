'use client'

import { useEffect, useState } from "react";

import CustomAddItem from "./CustomAddItem";
import FadeInHOC from "../FadeInHOC/FadeInHOC";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import OptionAddItem from "./OptionAddItem";
import SearchAddItems from "./SearchAddItems";

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
  userCreatedItems: userCreatedItem[]
  userId: string;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[];
}

// Add Item Component
const AddItem = ({ selectedArea, availableItems, userCreatedItems, userId, updateItems, items }: Props) => {

  const { compartment, position, level, type } = selectedArea; // spreading the selected area
  // Use States
  const [addType, setAddType] = useState('') // This is the button type selected

  // Uer Effects
  useEffect(() => {
    setAddType('') // Clearing the type on every load (for changing what is selected)
  }, [compartment, position, level])


  // Functions

  const handleAddingItem = (item: applianceItem) => {
    let newItemsList = items;
    newItemsList.push(item)
    updateItems(newItemsList);
  }


  return (
    <div className="xxs:px-2 sm:px-4">
      <FadeInHOC delayNumber={1000} direction='up'>
        <h2 className='mb-2 text-xl font-semibold'>Add an item to your <span className='capitalize'>{compartment}</span></h2>
      </FadeInHOC>

      <div className="px-2 mb-2 ">
        <p className='my-2'>Choose from a pre-made item{userCreatedItems.length > 0 ? ', create your own item or choose an item you have previously created.' : ' or create your own item.'}</p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 my-2">

          {/* Button for searching pre-made items */}
          <button onClick={() => setAddType('search')}
            className={`${addType === 'search' ? ' border-green-300 border-2' : 'hover:translate-y-1'} relative flex flex-col items-center justify-center px-2 font-normal bg-gradient-to-bl to-blue-400 from-blue-600 hover:translate-y-[-10px] active:bg-blue-400 aspect-square h-[100px] rounded-full transition-all duration-200 ease`}
          >
            <IoIosSearch
              className='w-[25px] h-[25px]'
            />
            <span>
              Search Items
            </span>
          </button>


          {/* Button for items that have been pre-made by owner */}
          <button onClick={() => setAddType('options')}
            className={`${addType === 'options' ? ' border-green-300 border-2' : 'hover:translate-y-1'} relative flex flex-col items-center justify-center px-2 font-normal bg-gradient-to-bl to-blue-400 from-blue-600 hover:translate-y-[-10px] active:bg-blue-400 aspect-square h-[100px] rounded-full transition-all duration-200 ease`}
          >
            <Image src='/assets/images/options.svg' alt='pre-made icon' width={25} height={25} />
            <span className="">
              Pre-made Item
            </span>
          </button>

          {/* Button for user to create their own item */}
          <button onClick={() => setAddType('custom')}
            className={`${addType === 'custom' ? ' border-green-300 border-2' : 'hover:translate-y-1'} flex flex-col items-center justify-center px-2 font-normal bg-from-blue-400 bg-gradient-to-br to-blue-400 from-blue-600 hover:translate-y-[-10px] active:bg-blue-400 aspect-square h-[100px] rounded-full transition-all duration-200 ease`}>
            <Image src='/assets/images/custom.svg' alt='pre-made icon' width={30} height={30} />
            <span className="">
              Custom Item
            </span>
          </button>

          {/* Button only available if the user has custom items stored in db - Associated by their userId */}
          {userCreatedItems.length > 0 && (
            <button onClick={() => setAddType('userCreated')}
              className={`${addType === 'userCreated' ? ' border-green-300 border-2' : 'hover:translate-y-1'} flex flex-col items-center justify-center px-2 font-normal bg-gradient-to-bl to-blue-400 from-blue-600 hover:translate-y-[-10px] active:bg-blue-400 aspect-square h-[100px] rounded-full transition-all duration-200 ease`}>
              <Image src='/assets/images/user-created.svg' alt='pre-made icon' width={25} height={25} className="object-fill" />
              <span className="">
                Your Items
              </span>
            </button>
          )}
        </div>
      </div>
      <hr />

      {/* Type of item Creation */}
      <div>
        {addType === 'search' && <SearchAddItems selectedArea={selectedArea} preMadeItems={availableItems} userCreatedItems={userCreatedItems} userId={userId} handleAddingToCurrentItems={handleAddingItem} />}
        {addType === 'options' && <OptionAddItem selectedArea={selectedArea} availableItems={availableItems} userId={userId} handleAddingToCurrentItems={handleAddingItem} showItemTypes={true} />}
        {addType === 'custom' && <CustomAddItem selectedArea={selectedArea} availableItems={availableItems} userId={userId} handleAddingToCurrentItems={handleAddingItem} />}
        {addType === 'userCreated' && <OptionAddItem selectedArea={selectedArea} availableItems={userCreatedItems} userId={userId} handleAddingToCurrentItems={handleAddingItem} showItemTypes={false} />}

      </div>

    </div>
  );

}

export default AddItem