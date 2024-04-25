import AmericanDoorRight from './AmericanDoors';
import { ApplianceDoor } from '@/components';
import ApplianceTitleArea from '../ApplianceTitleArea';
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
  selectedArea: selectionProps;
  applianceType: string;
}

const American = ({ appliance, handleSelect, handleModalState, items, handleUpdateItems, selectedArea, applianceType }: Props) => {

  const itemsInLocation = findItemLocation(items);
  const shelfPositions = [1, 2]; // How many areas there are on a shelf



  return (
    <>
      <ApplianceTitleArea appliance={appliance} />

      <ItemSearch items={items} handleUpdateItems={handleUpdateItems} applianceType={applianceType} selectedArea={selectedArea} />

      <div className='mx-auto w-fit h-fit'>
        <ExpiryNotification layout='horizontal' items={items} />
      </div>


      {/* Central Compartments Start */}
      <div className={`max-w-[400px] h-fit rounded-md md:p-1 border-2 border-black bg-gray-100 relative shadow-inner mx-6 xs:mx-auto`}>

        {/* Doors Start*/}
        {/* Right Door */}
        <div className='h-[97%] absolute w-full left-0 top-[8px] bg-pink-500]'>
          < AmericanDoorRight appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} itemsFridge={itemsInLocation.door} itemsFreezer={itemsInLocation.doorItemsFreezer} />
        </div>
        {/* Door End */}

        <div className='mx-auto z-[5] flex flex-row w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>

          {/* Freezer compartment Start*/}
          <div className='w-full z-[6] h-auto rounded-md border-2 border-black p-2'>
            <FreezerCompartment appliance={appliance} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.freezer} />
          </div>
          {/* Freezer Compartment End*/}

          {/* Fridge Compartment */}
          <div className='w-full z-[6] h-full rounded-md border-2 border-black p-2'>
            <FridgeCompartment appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.fridge} />
          </div>
          {/* Fridge compartment End */}

        </div>
        {/* Central Compartments End */}


        {/* Feet Start */}
        <div className='absolute bottom-[-10px] left-[1%] w-[98%] h-[20px] border-black border-2 rounded-sm bg-black z-[-2]' />
        {/* Feet End */}

      </div >

    </>
  )
}

export default American;