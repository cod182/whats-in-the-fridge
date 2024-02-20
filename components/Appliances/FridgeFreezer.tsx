import { ApplianceDoor, PositionButton } from '..'

import DrawerButton from './DrawerButton'
import FreezerCompartment from './FreezerCompartment';
import FridgeCompartment from './FridgeCompartment';
import React from 'react'
import { findItemLocation } from '@/utilities/functions';

type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[]) => void;
  modalState: boolean;
  handleModalState: (state: string) => void;
  items: applianceItem[];
}

const FridgeFreezer = ({ appliance, handleSelect, modalState, handleModalState, items }: Props) => {

  // let doorItems = items.map((item) => { let x = []; if (item.compartment === 'door') { x.push(item) }; return items; })




  const itemsInLocation = findItemLocation(items);
  console.log(itemsInLocation)


  const shelfPositions = [0, 1, 2]; // How many areas there are on a shelf

  return (
    <>
      <div className='mb-2'>
        <h2 className='text-normal text-gray-800'>{appliance.name}</h2>
        <p className='text-sm italic text-gray-700'>{appliance.description}</p>

      </div>

      <div className='max-w-[400px] h-[800px] rounded-md p-1 border-2 border-black bg-gray-100 relative mx-3 sm:mx-auto md:mx-0 midLg:mx-auto lg:mx-auto '>

        {/* Door Start*/}

        {/* Door Compartment */}
        <ApplianceDoor appliance={appliance!} positions={shelfPositions} handleSelect={handleSelect} modalState={modalState} handleModalState={handleModalState} items={itemsInLocation.door} />
        {/* Door End */}

        <div className='z-[5] flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>
          {/* Fridge compartment Start*/}
          <div className='w-full z-[6] h-[49%] rounded-md border-2 border-black p-2'>
            {/* Fridge Compartment */}
            <FridgeCompartment appliance={appliance!} positions={shelfPositions} handleSelect={handleSelect} modalState={modalState} handleModalState={handleModalState} items={itemsInLocation.fridge} />
          </div>
          {/* Fridge compartment End */}

          {/* Middle Bar Start*/}
          <hr className='border-2 border-gray-500 bg-gray-200 w-full h-[2%] flex flex-row justify-center items-center' />
          {/* Middle Bar End*/}

          {/* Freezer compartment Start*/}
          <div className='w-full h-[49%] rounded-md border-2 border-black my-auto p-2'>
            {/* Freezer Compartment */}
            <FreezerCompartment appliance={appliance!} handleSelect={handleSelect} modalState={modalState} handleModalState={handleModalState} items={itemsInLocation.freezer} />
          </div>
          {/* Freezer compartment End*/}

        </div>
      </div >
    </>
  )
}

export default FridgeFreezer