'use client'

import React, { useState } from 'react'

import Image from 'next/image';
import PositionButton from '../PositionButton';
import PositionButton_min from '../PositionButton_min';
import { getItemsInThisLocation } from '@/utilities/functions';

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


const AmericanDoors_min = ({ appliance, positions, handleMoveItem, currentPlacement }: Props) => {
  const [doorLeftStatus, setDoorLeftStatus] = useState(false);
  const [doorRightStatus, setDoorRightStatus] = useState(false);


  return (
    <>
      <div className={`shadow-inner ${doorRightStatus ? 'right-[-24px] z-[959] bg-gray-100/100' : 'right-[-24px] z-[0] bg-gray-400/100'} absolute top-[0px] h-full w-[220px] midLow:w-[200px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
      >

        <div className={`w-[95%] px-4 py-2 `}>
          {
            appliance?.doorCompartment && appliance.doorCompartment.map(({ shelves }: CompartmentProps, index: number) => (
              <div className='' key={index}>
                {/* Shelves */}
                {shelves != undefined && shelves.map((shelfNum) => (
                  <div className='w-full' key={shelfNum}>
                    <div className={`grid grid-cols-${positions.length} grid-rows-1 mx-auto my-2 gap-x-1`}>
                      <span className='absolute text-xs font-normal select-none'>Shelf:{shelfNum}</span>
                      {/* Positions */}
                      {positions.map((position) => (
                        <PositionButton_min key={position} handleMoveItem={handleMoveItem} compartment='doorFridge' locationType='shelf' level={shelfNum} position={position} currentPlacement={currentPlacement} />
                      ))}
                    </div>
                    <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

                  </div>
                ))}
              </div>
            ))
          }
        </div >

        {/* Open / Close Door Area Start*/}
        <div className='h-full w-[6%] min-w-[22px] flex flex-col justify-center items-center hover:bg-blue-600 border-l-[1px] border-gray-600 bg-blue-500 transition-all duration-200 ease select-none' onClick={() => { setDoorRightStatus((prev) => prev ? false : true) }}>
          <p className='origin-center transform rotate-90 w-[100px] text-center text-sm text-white'>{doorRightStatus ? 'Close Door' : 'Open Door'}</p>
        </div>
        {/* Open / Close Door Area End*/}

      </div >



      {/* LEFT DOOR */}
      <div className={`shadow-inner ${doorLeftStatus ? 'left-[-24px] z-[959] bg-gray-100/100' : 'left-[-24px] z-[0] bg-gray-400/100'} absolute top-[0px] h-full w-[220px] midLow:w-[200px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
      >

        {/* Open / Close Door Area Start*/}
        <div className='h-full w-[6%] min-w-[22px] flex flex-col justify-center items-center hover:bg-blue-600 border-l-[1px] border-gray-600 bg-blue-500 transition-all duration-200 ease select-none' onClick={() => { setDoorLeftStatus((prev) => prev ? false : true) }}>
          <p className='origin-center transform rotate-90 w-[100px] text-center text-sm text-white'>{doorLeftStatus ? 'Close Door' : 'Open Door'}</p>
        </div>
        {/* Open / Close Door Area End*/}

        <div className={`w-[95%] px-4 py-2 relative`}>
          <Image src='/assets/images/frozen.svg' alt='freezer icon' className='absolute top-0 left-0 mx-auto text-red-500 fill-current' width={20} height={20} />

          {
            appliance?.doorCompartment && appliance.doorCompartment.map(({ shelves }: CompartmentProps, index: number) => (
              <div className='' key={index}>
                {/* Shelves */}
                {shelves != undefined && shelves.map((shelfNum) => (
                  <div className='w-full' key={shelfNum}>
                    <div className={`grid grid-cols-${positions.length} grid-rows-1 mx-auto my-2 gap-x-1`}>
                      <span className='absolute text-xs font-normal select-none'>Shelf:{shelfNum}</span>
                      {/* Positions */}
                      {positions.map((position) => (
                        <PositionButton_min key={position} handleMoveItem={handleMoveItem} compartment='doorFreezer' locationType='shelf' level={shelfNum} position={position} currentPlacement={currentPlacement} />
                      ))}
                    </div>
                    <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

                  </div>
                ))}
              </div>
            ))
          }
        </div >



      </div >
    </>
  )
}

export default AmericanDoors_min