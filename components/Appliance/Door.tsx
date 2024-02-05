'use client'
import React, { useState } from 'react'
import { PositionButton } from '..'


type Props = {
  appliance: ApplianceProp;
  positions: number[];
  handleSelect: (area: string, type: string, loc: number, position?: number,) => void;
}


const Door = (doorItems: Props) => {
  const [doorStatus, setDoorStatus] = useState(false);

  return (
    <div className={`${doorStatus ? ' left-[13px] midLow:left-[380px] z-[999] midLow:z-[0] bg-blue-300/100' : 'left-[13px] midLow:left-[100px] z-[0] bg-blue-300/0'} absolute top-[10px] h-[360px] w-full sm:w-[400px] midLow:w-[310px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
      onClick={() => { setDoorStatus((prev) => prev ? false : true) }}>
      <div className={`w-[95%] px-4 py-2 `}>
        {
          doorItems.appliance?.doorCompartment && doorItems.appliance.doorCompartment.map(({ shelves }: CompartmentProps, index: number) => (
            <div key={index}>
              {/* Shelves */}
              {shelves != undefined && shelves.map((shelf, index) => (
                <div key={index}>
                  <div className='grid grid-cols-3 grid-rows-1 gap-x-1 mx-auto my-2'>
                    {/* Positions */}
                    {doorItems.positions.map((position) => (
                      <PositionButton key={position} handleSelection={doorItems.handleSelect} area='door' type='shelf' loc={shelf} position={position} />
                    ))}
                  </div>
                  <hr className='w-full h-[4px] bg-gray-300 shadow-xl' />

                </div>
              ))}
            </div>
          ))
        }
      </div >
      <div className='h-full w-[5%] flex flex-col justify-center items-center hover:bg-gray-400 border-l-[1px] border-gray-600 bg-pink-300'>
        <p className='transform rotate-90 origin-center'>Door</p>
      </div>
    </div >
  )

}

export default Door