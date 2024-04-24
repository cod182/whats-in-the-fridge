import DrawerButton_min from './DrawerButton_min'
import PositionButton_min from './PositionButton_min';
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

const FridgeCompartment_min = ({ appliance, handleMoveItem, currentPlacement }: Props) => {
  const positions = [1, 2, 3];
  return (
    <>
      {appliance?.fridgeCompartment && appliance.fridgeCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
        <div key={index}>
          {/* Shelves */}
          {shelves != undefined && shelves.map((shelfNum) => (
            <div key={shelfNum}>
              <div className={`grid grid-rows-1 mx-auto mt-2 gap-x-2`} style={{ gridTemplateColumns: `repeat(${positions.length},minmax(0,1fr) )` }}>
                {/* Positions */}
                {positions.map((position) => (
                  <PositionButton_min key={position} handleMoveItem={handleMoveItem} compartment='fridge' locationType='shelf' level={shelfNum} position={position} currentPlacement={currentPlacement} />
                ))}
              </div>
              <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />
            </div>
          ))}

          {/* Drawers */}
          {drawers != undefined &&
            <div className={`grid grid-cols-${drawers.length >= 2 ? '2' : '1'} grid-rows-${drawers.length} gap-x-1 mx-auto mt-2`}>
              {drawers.map((drawerNum) => (
                <DrawerButton_min key={drawerNum} handleMoveItem={handleMoveItem} compartment='fridge' locationType='drawer' level={drawerNum} currentPlacement={currentPlacement} />
              ))}
            </div>
          }
        </div>
      ))}
    </>
  )
}

export default FridgeCompartment_min