import { ApplianceDoor } from '@/components';
import ApplianceTitleArea from '../ApplianceTitleArea';
import ExpiryNotification from '@/components/ExpiryNotification/ExpiryNotification';
import FreezerCompartment from '../FreezerCompartment';
import FridgeCompartment from '../FridgeCompartment';
import ItemSearch from '@/components/ItemSearch/ItemSearch';
import React from 'react'
import SharingMenu from '../SharingMenu';
import { findItemLocation } from '@/utilities/functions';

type Props = {
  applianceData: applianceWithShared;

  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void;
  items: applianceItem[];
  handleUpdateItems: (items: applianceItem[]) => void;
  typeOfAppliance: 'tall_fridge' | 'tall_freezer';
  selectedArea: selectionProps;
}

const TallAppliance_main = ({ applianceData, appliance, handleSelect, handleModalState, items, handleUpdateItems, typeOfAppliance, selectedArea }: Props) => {

  const itemsInLocation = findItemLocation(items);
  const shelfPositions = [1, 2, 3]; // How many areas there are on a shelf



  return (
    <>
      <div className='flex flex-row justify-between items-center'>

        <ApplianceTitleArea appliance={appliance} />

        {/* Start Sharing Section */}
        <div>
          <SharingMenu applianceData={applianceData} />
        </div>
        {/* End Sharing Section */}
      </div>
      <ItemSearch items={items} handleUpdateItems={handleUpdateItems} applianceType={typeOfAppliance} selectedArea={selectedArea} />

      <div className='mx-auto w-fit h-fit'>
        <ExpiryNotification layout='horizontal' items={items} />
      </div>


      <div className={`max-w-[400px] h-fit rounded-md md:p-1 border-2 border-black bg-gray-100 mx-auto relative shadow-inner ${typeOfAppliance === 'tall_fridge' && 'mr-[22px] xs:mx-auto md:mx-0 lg:mx-auto'}`}>

        {typeOfAppliance === 'tall_fridge' ? (
          <>
            {/* Door Start*/}
            {/* Door Compartment */}
            <div className='h-[97%] absolute top-[1px] w-full sm:w-[400px] midLow:w-[310px]'>
              < ApplianceDoor appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.door} />
            </div>
            {/* Door End */}

            <div className='mx-auto z-[5] flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>
              {/* Fridge compartment Start*/}
              <div className='w-full z-[6] h-full rounded-md border-2 border-black p-2'>
                {/* Fridge Compartment */}
                <FridgeCompartment appliance={appliance} positions={shelfPositions} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.fridge} />
              </div>
              {/* Fridge compartment End */}
            </div>

          </>
        )
          :
          (
            // {/* Freezer compartment Start*/ }
            <div className='w-full min-h-[640px] rounded-md border-2 border-black my-auto p-2 flex-flex-col items-center justify-center'>
              {/* Freezer Compartment */}
              <FreezerCompartment appliance={appliance} handleSelect={handleSelect} handleModalState={handleModalState} items={itemsInLocation.freezer} />
            </div>
            // {/* Freezer compartment End */}
          )}
        {/* Feet Start */}
        <div className='absolute bottom-[-10px] left-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-2]' />
        <div className='absolute bottom-[-10px] right-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-2]' />
        {/* Feet End */}
      </div >
    </>
  )
}

export default TallAppliance_main