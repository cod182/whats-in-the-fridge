import { findItemLocation, getItemsInThisLocation } from '@/utilities/functions';

import ApplianceTitleArea from '../ApplianceTitleArea';
import ChestStorageArea from '../ChestStorageArea';
import ChestStorageArea_min from '../ChestStorageArea_min';
import DrawerButton from '../DrawerButton';
import ExpiryNotification from '@/components/ExpiryNotification/ExpiryNotification';
import ItemSearch from '@/components/ItemSearch/ItemSearch';
import React from 'react'

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

const ChestAppliance_min = ({ appliance, handleMoveItem, currentPlacement }: Props) => {

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>

      <div className={`w-full max-w-[370px] h-[50%] max-h-full rounded-md md:p-1 border-2 border-black bg-gray-100 relative mx-auto `}>
        <div className='w-full h-full p-2 border-2 border-black rounded-md'>
          {/* Freezer Compartment */}
          {appliance.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
            <div key={index} className="w-full h-full">
              {/* Drawers */}
              {drawers != undefined &&
                <div className={`flex flex-row items-center gap-2 h-full w-full`}>
                  {drawers.map((drawerNum, index) => (
                    <ChestStorageArea_min key={index} compartment='freezer' locationType='drawer' level={drawerNum} currentPlacement={currentPlacement} handleMoveItem={handleMoveItem} />
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
                    <ChestStorageArea_min key={index} compartment='fridge' locationType='drawer' level={drawerNum} currentPlacement={currentPlacement} handleMoveItem={handleMoveItem} />
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

export default ChestAppliance_min