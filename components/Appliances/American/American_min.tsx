import AmericanDoorRight from './AmericanDoors';
import AmericanDoors_min from './AmericanDoors_min';
import { ApplianceDoor } from '@/components';
import ApplianceTitleArea from '../ApplianceTitleArea';
import ExpiryNotification from '@/components/ExpiryNotification/ExpiryNotification';
import FreezerCompartment from '../FreezerCompartment';
import FreezerCompartment_min from '../FreezerCompartment_min';
import FridgeCompartment from '../FridgeCompartment';
import FridgeCompartment_min from '../FridgeCompartment_min';
import ItemSearch from '@/components/ItemSearch/ItemSearch';
import React from 'react'
import { findItemLocation } from '@/utilities/functions';

type Props = {
  appliance: ApplianceProp;
  handleMoveItem: (level: number, compartment: string, locationType: string, position?: number) => void
  currentPlacement: {
    compartment: string;
    locationType: string;
    level: number;
    position?: number;
  }
}

const American_min = ({ appliance, handleMoveItem, currentPlacement }: Props) => {

  const shelfPositions = [1, 2]; // How many areas there are on a shelf

  return (
    <>

      {/* Central Compartments Start */}
      <div className='w-[90%] max-w-[370px] max-h-full rounded-md md:p-1 border-2 border-black bg-gray-100 relative mx-auto'>

        {/* Doors Start*/}
        {/* Right Door */}
        <div className='h-[97%] absolute w-full left-0 top-[8px]'>
          < AmericanDoors_min appliance={appliance!} positions={shelfPositions} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
        </div>
        {/* Door End */}

        <div className='mx-auto z-[5] flex flex-row w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>

          {/* Freezer compartment Start*/}
          <div className='w-[50%] z-[6] h-auto rounded-md border-2 border-black p-2'>
            <FreezerCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
          </div>
          {/* Freezer Compartment End*/}

          {/* Fridge Compartment */}
          <div className='w-[50%] z-[6] h-full rounded-md border-2 border-black p-2'>
            <FridgeCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
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

export default American_min;