'use client'

import React, { useState } from 'react'

import Image from 'next/image';
import PositionButton from '../PositionButton';
import { getItemsInThisLocation } from '@/utilities/functions';

type Props = {
  appliance: ApplianceProp;
  positions: number[];
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void
  itemsFridge: applianceItem[]
  itemsFreezer: applianceItem[]
}


const AmericanDoors = ({ appliance, positions, handleSelect, handleModalState, itemsFridge, itemsFreezer }: Props) => {
  const [doorLeftStatus, setDoorLeftStatus] = useState(false);
  const [doorRightStatus, setDoorRightStatus] = useState(false);


  return (
    <>
      <div className={`shadow-inner ${doorRightStatus ? 'right-[-24px] midLow:right-[-185px] z-[959] midLow:z-[0] bg-gray-100/100' : 'right-[-24px] midLow:right-[-20px] z-[0] bg-gray-400/100'} absolute top-[0px] h-full w-[220px] midLow:w-[200px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
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
                        <PositionButton key={position} handleSelection={handleSelect} compartment='doorFridge' type='shelf' level={shelfNum} position={position} handleModalState={handleModalState} items={getItemsInThisLocation(shelfNum, itemsFridge, 'shelf', 'doorFridge', position)} />
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
      <div className={`shadow-inner ${doorLeftStatus ? 'left-[-24px] midLow:left-[-185px] z-[959] midLow:z-[0] bg-gray-100/100' : 'left-[-24px] midLow:left-[-20px] z-[0] bg-gray-400/100'} absolute top-[0px] h-full w-[220px] midLow:w-[200px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
      >

        {/* Open / Close Door Area Start*/}
        <div className='h-full w-[6%] min-w-[22px] flex flex-col justify-center items-center hover:bg-blue-600 border-l-[1px] border-gray-600 bg-blue-500 transition-all duration-200 ease select-none' onClick={() => { setDoorLeftStatus((prev) => prev ? false : true) }}>
          <p className='origin-center transform rotate-90 w-[100px] text-center text-sm text-white'>{doorLeftStatus ? 'Close Door' : 'Open Door'}</p>
        </div>
        {/* Open / Close Door Area End*/}

        <div className={`w-[95%] px-4 py-2 `}>
          <Image src='/assets/images/frozen.svg' alt='freezer icon' className='mx-auto mb-4 text-red-500 fill-current' width={30} height={30} />

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
                        <PositionButton key={position} handleSelection={handleSelect} compartment='doorFreezer' type='shelf' level={shelfNum} position={position} handleModalState={handleModalState} items={getItemsInThisLocation(shelfNum, itemsFreezer, 'shelf', 'doorFreezer', position)} />
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

export default AmericanDoors