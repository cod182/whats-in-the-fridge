import React from 'react'
import { PositionButton } from '..'

type Props = {
  appliance: ApplianceProp;
  positions: number[];
  handleSelect: (area: string, type: string, loc: number, position?: number,) => void;
}


const Door = (doorItems: Props) => {
  return (
    <>
      {doorItems.appliance?.doorCompartment && doorItems.appliance.doorCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
        <div key={index} >
          {/* Shelves */}
          {shelves != undefined && shelves.map((shelf, index) => (
            <div key={index}>
              <div className='grid grid-cols-3 grid-rows-1 gap-x-1 mx-auto my-2'>
                {/* Positions */}
                {doorItems.positions.map((position) => (
                  <PositionButton key={position} handleSelection={doorItems.handleSelect} area='door' type='shelf' loc={shelf} position={position} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )

}

export default Door