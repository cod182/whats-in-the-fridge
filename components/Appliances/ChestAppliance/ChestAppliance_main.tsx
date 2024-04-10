import { findItemLocation, getItemsInThisLocation } from '@/utilities/functions';

import ApplianceTitleArea from '../ApplianceTitleArea';
import ChestStorageArea from '../ChestStorageArea';
import DrawerButton from '../DrawerButton';
import ExpiryNotification from '@/components/ExpiryNotification/ExpiryNotification';
import FreezerCompartment from '../FreezerCompartment';
import ItemSearch from '@/components/ItemSearch/ItemSearch';
import React from 'react'

type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void;
  items: applianceItem[];
  handleUpdateItems: (items: applianceItem[]) => void;
}

const ChestAppliance = ({ appliance, handleSelect, handleModalState, items, handleUpdateItems }: Props) => {

  const itemsInLocation = findItemLocation(items);

  return (
    <div className='flex flex-col items-start justify-start w-full h-full'>
      <ApplianceTitleArea appliance={appliance} />

      <ItemSearch items={items} handleUpdateItems={handleUpdateItems} />

      <div className='mx-auto w-fit h-fit'>
        <ExpiryNotification layout='horizontal' items={items} />
      </div>

      <div className='w-full lg:w-[800px] h-[400px] rounded-md md:p-1 border-2 border-black bg-gray-100 mx-auto shadow-2xl'>
        <div className='w-full h-full p-2 border-2 border-black rounded-md'>
          {/* Freezer Compartment */}
          {appliance.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
            <div key={index} className="w-full h-full">
              {/* Drawers */}
              {drawers != undefined &&
                <div className={`flex flex-row items-center gap-2 h-full w-full`}>
                  {drawers.map((drawerNum, index) => (
                    <ChestStorageArea key={index} handleSelection={handleSelect} compartment='freezer' type='drawer' level={drawerNum} handleModalState={handleModalState} items={getItemsInThisLocation(drawerNum, itemsInLocation.freezer, 'drawer', 'freezer', 128)} />
                  ))}
                </div>
              }
            </div>
          ))}

          {/* Fridge Compartment */}
          {appliance.fridgeCompartment && appliance.fridgeCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
            <div key={index} className="w-full h-full">
              {/* Drawers */}
              {drawers != undefined &&
                <div className={`flex flex-row items-center gap-2 h-full w-full`}>
                  {drawers.map((drawerNum, index) => (
                    <ChestStorageArea key={index} handleSelection={handleSelect} compartment='fridge' type='drawer' level={drawerNum} handleModalState={handleModalState} items={getItemsInThisLocation(drawerNum, itemsInLocation.freezer, 'drawer', 'freezer', 128)} />
                  ))}
                </div>
              }
            </div>
          ))}
        </div>

      </div>


    </div>
  )
}

export default ChestAppliance