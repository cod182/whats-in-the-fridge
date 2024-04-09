import { ApplianceDoor } from '@/components';
import ExpiryNotification from '@/components/ExpiryNotification/ExpiryNotification';
import FreezerCompartment from '../FreezerCompartment';
import FridgeCompartment from '../FridgeCompartment';
import ItemSearch from '@/components/ItemSearch/ItemSearch';
import React from 'react'
import { findItemLocation } from '@/utilities/functions';

type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void;
  items: applianceItem[];
  handleUpdateItems: (items: applianceItem[]) => void;
  typeOfAppliance: 'under_counter_fridge' | 'under_counter_fridge_with_freezer' | 'under_counter_freezer';
}

const SmallAppliance_main = ({ appliance, handleSelect, handleModalState, items, handleUpdateItems, typeOfAppliance }: Props) => {

  const itemsInLocation = findItemLocation(items);
  const shelfPositions = [1, 2, 3]; // How many areas there are on a shelf



  return (
    <>
      <div className='mb-2'>
        <h2 className='text-gray-800 text-normal'>{appliance.name}</h2>
        <p className='text-sm italic text-gray-700'>
          {appliance.description.map((desc: string, index) => (
            <span key={index.toString()}>{desc} </span>
          ))}
        </p>
      </div >


      <ItemSearch items={items} handleUpdateItems={handleUpdateItems} />

      <div className='mx-auto w-fit h-fit'>
        <ExpiryNotification layout='horizontal' items={items} />
      </div>


      <div className={`max-w-[400px] h-fit rounded-md md:p-1 border-2 border-black bg-gray-100 mx-auto relative shadow-inner ${typeOfAppliance === 'under_counter_fridge' ? 'mr-[22px] xs:mx-auto md:mx-0 lg:mx-auto' : typeOfAppliance === 'under_counter_fridge_with_freezer' ? 'mr-[22px] xs:mx-auto md:mx-0 lg:mx-auto' : ''}`}>

        {typeOfAppliance === 'under_counter_fridge' && (
          <>
            {/* Door Start*/}
            {/* Door Compartment */}
            <div className='h-[95%] absolute top-[-2px] w-full sm:w-[400px] midLow:w-[310px]'>
              < ApplianceDoor appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.door} />
            </div>
            {/* Door End */}

            <div className='mx-auto flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>
              {/* Fridge compartment Start*/}
              <div className='w-full h-full p-2 border-2 border-black rounded-md'>
                {/* Fridge Compartment */}
                <FridgeCompartment appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.fridge} />
              </div>
              {/* Fridge compartment End */}
            </div>

          </>
        )}

        {typeOfAppliance === 'under_counter_freezer' && (
          // {/* Freezer compartment Start*/ }
          <div className='items-center justify-center w-full p-2 my-auto border-2 border-black rounded-md h-fit flex-flex-col'>
            {/* Freezer Compartment */}
            <FreezerCompartment appliance={appliance} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.freezer} />
          </div>
          // {/* Freezer compartment End */}
        )}

        {typeOfAppliance === 'under_counter_fridge_with_freezer' && (
          <>


            {/* Door Start*/}
            {/* Door Compartment */}
            <div className='h-[95%] absolute top-[-2px] w-full sm:w-[400px] midLow:w-[310px]'>
              < ApplianceDoor appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.door} />
            </div>
            {/* Door End */}

            <div className='mx-auto z flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>

              {/* // Freezer compartment Start */}
              <div className='w-full h-fit rounded-md border-2 border-black my-auto p-2 flex-flex-col items-center justify-center z-[10]'>
                {/* Freezer Compartment */}
                <FreezerCompartment appliance={appliance} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.freezer} />
              </div>
              {/* // Freezer compartment End */}

              {/* Fridge compartment Start*/}
              <div className='w-full h-full p-2 border-2 border-black rounded-md z'>
                {/* Fridge Compartment */}
                <FridgeCompartment appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.fridge} />
              </div>
              {/* Fridge compartment End */}
            </div>
          </>
        )}

        {/* Feet Start */}
        <div className='absolute bottom-[-10px] left-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-2]' />
        <div className='absolute bottom-[-10px] right-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-2]' />
        {/* Feet End */}
      </div >
    </>
  )
}

export default SmallAppliance_main