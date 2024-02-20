'use client'

import React, { useState } from 'react'

import { PositionButton } from '..'
import { getItemsInThisLocation } from '@/utilities/functions';

type Props = {
  appliance: ApplianceProp;
  positions: number[];
  handleSelect: (items: applianceItem[], level: number, compartment: string, position?: number) => void;
  modalState: boolean;
  handleModalState: (state: string) => void
  items: applianceItem[]
}


const Door = ({ appliance, positions, handleSelect, modalState, handleModalState, items }: Props) => {
  const [doorStatus, setDoorStatus] = useState(false);

  return (
    <div className={`${doorStatus ? ' left-[13px] midLow:left-[380px] z-[959] midLow:z-[0] bg-blue-300/100' : 'left-[13px] midLow:left-[100px] z-[0] bg-blue-300/0'} absolute top-[10px] h-[360px] w-full sm:w-[400px] midLow:w-[310px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
    >
      <div className={`w-[95%] px-4 py-2 `}>
        {
          appliance?.doorCompartment && appliance.doorCompartment.map(({ shelves }: CompartmentProps, index: number) => (
            <div key={index}>
              {/* Shelves */}
              {shelves != undefined && shelves.map((shelfNum, index) => (
                <div key={index}>
                  <div className='grid grid-cols-3 grid-rows-1 gap-x-1 mx-auto my-2'>
                    {/* Positions */}
                    {positions.map((position) => (
                      <PositionButton key={position} handleSelection={handleSelect} compartment='door' type='shelf' level={shelfNum} position={position} modalState={modalState} handleModalState={handleModalState} items={getItemsInThisLocation(shelfNum, items, 'shelf', position)} />
                    ))}
                  </div>
                  <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

                </div>
              ))}
            </div>
          ))
        }
      </div >
      <div className='h-full w-[5%] flex flex-col justify-center items-center hover:bg-gray-400 border-l-[1px] border-gray-600 bg-pink-300' onClick={() => { setDoorStatus((prev) => prev ? false : true) }}>
        <p className='transform rotate-90 origin-center'>Door</p>
      </div>
    </div >
  )

}

export default Door