import DrawerButton from './DrawerButton'
import PositionButton from './PositionButton';
import React from 'react'
import { getItemsInThisLocation } from '@/utilities/functions';

type Props = {
  appliance: ApplianceProp;
  positions: number[];
  handleSelect: (items: applianceItem[], level: number, compartment: string, position?: number) => void;
  modalState: boolean;
  handleModalState: (state: string) => void
  items: applianceItem[]
}

const FridgeCompartment = ({ appliance, positions, handleSelect, modalState, handleModalState, items }: Props) => {

  return (
    <>
      {appliance?.fridgeCompartment && appliance.fridgeCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
        <div key={index}>
          {/* Shelves */}
          {shelves != undefined && shelves.map((shelfNum, index) => (
            <div key={index}>
              <div className='grid grid-cols-3 grid-rows-1 gap-x-1 mx-auto mt-2'>
                {/* Positions */}
                {positions.map((position, index) => (
                  <PositionButton key={index} handleSelection={handleSelect} compartment='fridge' type='shelf' level={shelfNum} position={position} handleModalState={handleModalState} modalState={modalState} items={getItemsInThisLocation(shelfNum, items, 'shelf', position)} />
                ))}
              </div>
              <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

            </div>
          ))}

          {/* Drawers */}
          {drawers != undefined &&
            <div className={`grid grid-cols-2 grid-rows-1 gap-x-1 mx-auto mt-2`}>
              {drawers.map((drawerNum, index) => (
                <DrawerButton key={index} handleSelection={handleSelect} compartment='fridge' type='drawer' level={drawerNum} handleModalState={handleModalState} modalState={modalState} items={getItemsInThisLocation(drawerNum, items, 'drawer')} />
              ))}
            </div>
          }
        </div>
      ))}
    </>
  )
}

export default FridgeCompartment