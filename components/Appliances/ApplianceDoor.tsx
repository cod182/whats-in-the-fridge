'use client'

import React, { useState } from 'react'

import PositionButton from './PositionButton';
import { getItemsInThisLocation } from '@/utilities/functions';

type Props = {
  appliance: ApplianceProp;
  positions: number[];
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void
  items: applianceItem[]
}


const Door = ({ appliance, positions, handleSelect, handleModalState, items }: Props) => {
  const [doorStatus, setDoorStatus] = useState(false);

  return (
    <div className={`shadow-inner ${doorStatus ? ' left-[13px] midLow:left-[380px] z-[959] midLow:z-[0] bg-gray-100/100' : 'left-[13px] midLow:left-[100px] z-[0] bg-gray-400/100'} absolute top-[10px] h-full w-full sm:w-[400px] midLow:w-[310px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
    >
      <div className={`w-[95%] px-4 py-2 `}>
        {
          appliance?.doorCompartment && appliance.doorCompartment.map(({ shelves }: CompartmentProps, index: number) => (
            <div key={index}>
              {/* Shelves */}
              {shelves != undefined && shelves.map((shelfNum) => (
                <div key={shelfNum}>
                  <div className='grid grid-cols-3 grid-rows-1 mx-auto my-2 gap-x-1'>
                    <span className='absolute text-xs font-normal select-none'>Shelf:{shelfNum}</span>
                    {/* Positions */}
                    {positions.map((position) => (
                      <PositionButton key={position} handleSelection={handleSelect} compartment='door' type='shelf' level={shelfNum} position={position} handleModalState={handleModalState} items={getItemsInThisLocation(shelfNum, items, 'shelf', 'door', position)} />
                    ))}
                  </div>
                  <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

                </div>
              ))}
            </div>
          ))
        }
      </div >
      <div className='h-full w-[5%] flex flex-col justify-center items-center hover:bg-blue-600 border-l-[1px] border-gray-600 bg-blue-500 transition-all duration-200 ease select-none' onClick={() => { setDoorStatus((prev) => prev ? false : true) }}>
        <p className='origin-center transform rotate-90 w-[100px] text-center text-sm text-white'>{doorStatus ? 'Close Door' : 'Open Door'}</p>
      </div>
    </div >
  )

}

export default Door