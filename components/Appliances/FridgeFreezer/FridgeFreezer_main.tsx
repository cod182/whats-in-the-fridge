import { ApplianceDoor, ExpiryNotification, ItemSearch, PositionButton } from '../..'

import ApplianceTitleArea from '../ApplianceTitleArea';
import DrawerButton from '../DrawerButton'
import FreezerCompartment from '../FreezerCompartment';
import FridgeCompartment from '../FridgeCompartment';
import { ImConnection } from 'react-icons/im';
import React from 'react'
import { RiUserShared2Line } from 'react-icons/ri';
import SharingMenu from '../SharingMenu';
import { findItemLocation } from '@/utilities/functions';

type Props = {
  applianceData: applianceWithShared;
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void;
  items: applianceItem[];
  handleUpdateItems: (items: applianceItem[]) => void;
  selectedArea: selectionProps;
  applianceType: string;
}

const FridgeFreezer = ({ applianceData, appliance, handleSelect, handleModalState, items, handleUpdateItems, selectedArea, applianceType }: Props) => {

  const itemsInLocation = findItemLocation(items);
  const shelfPositions = [1, 2, 3]; // How many areas there are on a shelf

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>

        <ApplianceTitleArea appliance={appliance} />

        {/* Start Sharing Section */}
        <div>
          <SharingMenu applianceData={applianceData} />
        </div>
        {/* End Sharing Section */}
      </div>

      <ItemSearch items={items} handleUpdateItems={handleUpdateItems} applianceType={applianceType} selectedArea={selectedArea} />

      <div className='mx-auto w-fit h-fit'>
        <ExpiryNotification layout='horizontal' items={items} />
      </div>


      <div className='max-w-[400px] h-[800px] rounded-md md:p-1 border-2 border-black bg-gray-100 relative mr-[22px] xs:mx-auto ml-1 md:mx-0 lg:mx-auto shadow-inner'>

        {/* Door Start*/}
        {/* Door Compartment */}
        <div className='h-[360px] absolute top-[10px] w-full sm:w-[400px] midLow:w-[310px]'>
          <ApplianceDoor appliance={appliance!} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.door} />
        </div>
        {/* Door End */}

        <div className='mx-auto z-[5] flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>
          {/* Fridge compartment Start*/}
          <div className='w-full z-[6] h-[49%] rounded-md border-2 border-black p-2'>
            {/* Fridge Compartment */}
            <FridgeCompartment appliance={appliance!} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.fridge} />
          </div>
          {/* Fridge compartment End */}

          {/* Middle Bar Start*/}
          <hr className='border-2 border-gray-500 bg-gray-200 w-full h-[2%] flex flex-row justify-center items-center' />
          {/* Middle Bar End*/}

          {/* Freezer compartment Start*/}
          <div className='w-full h-[49%] rounded-md border-2 border-black my-auto p-2 z-[1]'>
            {/* Freezer Compartment */}
            <FreezerCompartment appliance={appliance!} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.freezer} />
          </div>
          {/* Freezer compartment End*/}



        </div>
        {/* Feet Start */}
        <div className='absolute bottom-[-10px] left-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-10]' />
        <div className='absolute bottom-[-10px] right-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-10]' />
        {/* Feet End */}
      </div >
    </div>
  )
}

export default FridgeFreezer