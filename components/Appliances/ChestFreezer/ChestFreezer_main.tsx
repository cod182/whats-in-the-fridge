import { findItemLocation, getItemsInThisLocation } from '@/utilities/functions';

import ChestStorageArea from '../ChestStorageArea';
import DrawerButton from '../DrawerButton';
import ExpiryNotification from '@/components/ExpiryNotification/ExpiryNotification';
import FreezerCompartment from '../FridgeFreezer/FreezerCompartment';
import ItemSearch from '@/components/ItemSearch/ItemSearch';
import React from 'react'

type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void;
  items: applianceItem[];
  handleUpdateItems: (items: applianceItem[]) => void;
}

const ChestFreezer = ({ appliance, handleSelect, handleModalState, items, handleUpdateItems }: Props) => {

  const itemsInLocation = findItemLocation(items);

  return (
    <div className='w-full h-full'>
      <div className='mb-2'>
        <h2 className='text-gray-800 text-normal'>{appliance.name}</h2>
        <p className='text-sm italic text-gray-700'>{appliance.description}</p>
      </div>

      <ItemSearch items={items} handleUpdateItems={handleUpdateItems} />

      <div className='w-fit mx-auto h-fit'>
        <ExpiryNotification layout='horizontal' items={items} />
      </div>

      <div className='w-[800px] h-[400px] rounded-md md:p-1 border-2 border-black bg-gray-100 mx-auto'>
        {/* Freezer compartment Start*/}
        <div className='w-full h-full rounded-md border-2 border-black p-2'>
          {/* Freezer Compartment */}
          {appliance?.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
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
        </div>
        {/* Freezer compartment End*/}

      </div>


    </div>
  )
}

export default ChestFreezer