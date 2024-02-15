import { ApplianceDoor, PositionButton } from '..'

import DrawerButton from './DrawerButton'
import React from 'react'

type Props = {
  appliance: ApplianceProp;
  handleSelect: (area: string, type: string, loc: number, position?: number) => void;
  modalState: boolean;
  handleModalState: (state: string) => void
}

const FridgeFreezer = ({ appliance, handleSelect, modalState, handleModalState }: Props) => {

  const shelfPositions = [1, 2, 3]; // How many areas there are on a shelf
  return (
    <>
      <div className='mb-2'>
        <h2 className='text-normal text-gray-800'>{appliance.name}</h2>
        <p className='text-sm italic text-gray-700'>{appliance.description}</p>
        <p className='sm:hidden block z-[999]'>Hi</p>

      </div>

      <div className='max-w-[400px] h-[800px] rounded-md p-1 border-2 border-black bg-gray-100 relative mx-3 sm:mx-auto md:mx-0 midLg:mx-auto lg:mx-auto '>

        {/* Door Start*/}

        {/* Door Compartment */}
        <ApplianceDoor appliance={appliance!} positions={shelfPositions} handleSelect={handleSelect} modalState={modalState} handleModalState={handleModalState} />
        {/* Door End */}

        <div className='z-[5] flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>
          {/* Fridge Area Start*/}
          <div className='w-full z-[6] h-[49%] rounded-md border-2 border-black p-2'>
            {/* Fridge Compartment */}
            {appliance?.fridgeCompartment && appliance.fridgeCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
              <div key={index}>

                {/* Shelves */}
                {shelves != undefined && shelves.map((shelf, index) => (
                  <div key={index}>
                    <div className='grid grid-cols-3 grid-rows-1 gap-x-1 mx-auto mt-2'>
                      {/* Positions */}
                      {shelfPositions.map((position) => (
                        <PositionButton key={position} handleSelection={handleSelect} area='fridge' type='shelf' loc={shelf} position={position} handleModalState={handleModalState} modalState={modalState} />
                      ))}
                    </div>
                    <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

                  </div>
                ))}

                {/* Drawers */}
                {drawers != undefined &&
                  <div className={`grid grid-cols-2 grid-rows-1 gap-x-1 mx-auto mt-2`}>
                    {drawers.map((drawer, index) => (
                      <DrawerButton key={index} handleSelection={handleSelect} area='fridge' type='drawer' loc={drawer} handleModalState={handleModalState} modalState={modalState} />
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
          {/* Fridge Area End */}

          {/* Middle Bar Start*/}
          <hr className='border-2 border-gray-500 bg-gray-200 w-full h-[2%] flex flex-row justify-center items-center' />
          {/* Middle Bar End*/}

          {/* Freezer Area Start*/}
          <div className='w-full h-[49%] rounded-md border-2 border-black my-auto p-2'>
            {/* Freezer Compartment */}
            {appliance?.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
              <div key={index}>
                {/* Drawers */}
                {drawers != undefined &&
                  <div className={`grid grid-cols-1 grid-rows-${drawers.length} gap-2 mx-auto mt-2`}>
                    {drawers.map((drawer, index) => (
                      <DrawerButton key={index} handleSelection={handleSelect} area='freezer' type='drawer' loc={drawer} modalState={modalState} handleModalState={handleModalState} />
                    ))}
                  </div>
                }
              </div>

            ))}
          </div>
          {/* Freezer Area End*/}

        </div>
      </div >
    </>
  )
}

export default FridgeFreezer