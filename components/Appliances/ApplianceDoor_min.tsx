'use client'

import React, { useState } from 'react'

import PositionButton_min from './PositionButton_min';

type Props = {
  appliance: ApplianceProp;
  positions: number[];
  handleMoveItem: (level: number, compartment: string, locationType: string, position?: number) => void
  currentPlacement: {
    compartment: string;
    locationType: string;
    level: number;
    position?: number;
  }
}


const Door_min = ({ appliance, positions, handleMoveItem, currentPlacement }: Props) => {
  const [doorStatus, setDoorStatus] = useState(false);

  return (
    <div className={`shadow-inner ${doorStatus ? ' right-[-20px] z-[959]  bg-gray-100/100' : 'right-[-20px]  z-[0] bg-gray-400/100'} absolute top-[10px] h-full w-full max-w-[370px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
    >
      <div className={`w-[95%] px-4 py-2 `}>
        {
          appliance?.doorCompartment && appliance.doorCompartment.map(({ shelves }: CompartmentProps, index: number) => (
            <div className='' key={index}>
              {/* Shelves */}
              {shelves != undefined && shelves.map((shelfNum) => (
                <div className='w-full' key={shelfNum}>
                  <div className={`grid grid-rows-1 mx-auto my-2 gap-x-1`} style={{ gridTemplateColumns: `repeat(${positions.length},minmax(0,1fr) )` }}>
                    <span className='absolute text-xs font-normal select-none'>Shelf:{shelfNum}</span>
                    {/* Positions */}
                    {positions.map((position) => (
                      <PositionButton_min key={position} handleMoveItem={handleMoveItem} compartment='door' locationType='shelf' level={shelfNum} position={position} currentPlacement={currentPlacement} />
                    ))}
                  </div>
                  <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

                </div>
              ))}
            </div>
          ))
        }
      </div >
      <div className='h-full w-[6%] min-w-[22px] flex flex-col justify-center items-center hover:bg-blue-600 border-l-[1px] border-gray-600 bg-blue-500 transition-all duration-200 ease select-none' onClick={() => { setDoorStatus((prev) => prev ? false : true) }}>
        <p className='origin-center transform rotate-90 w-[100px] text-center text-sm text-white'>{doorStatus ? 'Close Door' : 'Open Door'}</p>
      </div>
    </div >
  )

}

export default Door_min