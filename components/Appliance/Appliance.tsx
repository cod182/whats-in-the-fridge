'use client'
// components/Fridge.tsx
import React, { useState } from 'react';
import { appliances } from '@/static/appliances';
import { useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GiOpenedFoodCan } from "react-icons/gi";




type Props = {
  onSelect: (area: string, type: string, loc: number, position: number) => void;
  type: string;
}


const Appliance = ({ onSelect, type = 'fridge_freezer' }: Props) => {

  const [appliance, setAppliance] = useState<ApplianceProp>();
  const [doorStatus, setDoorStatus] = useState(false);

  useEffect(() => {
    const getApplianceType = () => {
      appliances.map((applianceChoice: ApplianceProp) => {
        if (applianceChoice.name.toLowerCase().replace(/\s/g, '_') === type) {
          setAppliance(applianceChoice)
        }
      })
    };
    // Matches the type to type of appliance
    getApplianceType();

  }, [type, appliance])


  const positions = [1, 2, 3];



  const handleSelect = (area: string, type: string, loc: number, position?: any) => {
    onSelect(area, type, loc, position);
  };


  return (
    <>
      {appliance != undefined &&
        <div className='mb-2'>
          <h2 className='text-normal text-gray-800'>{appliance.name}</h2>
          <p className='text-sm italic text-gray-700'>{appliance.description}</p>
        </div>
      }
      <div className='max-w-[400px] h-[780px] rounded-md p-1 border-2 border-black bg-gray-100 relative'>

        {/* Door Start*/}
        <div className={`${doorStatus ? 'left-[380px]' : 'left-[13px]'} z-[0] bg-pink-300 absolute top-[10px] h-[360px] w-[400px] cursor-pointer border-2 border-black rounded-md flex flex-row items-end justify-space overflow-hidden transition-all duration-300 ease-in`}
          onClick={() => { setDoorStatus((prev) => prev ? false : true) }}>
          <div className='w-[95%] px-4 py-2'>
            {/* Door Compartment */}
            {appliance?.doorCompartment && appliance.doorCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
              <div key={index} >
                {/* Shelves */}
                {shelves != undefined && shelves.map((shelf, index) => (
                  <div key={index}>
                    <div className='grid grid-cols-3 grid-rows-1 gap-x-1 mx-auto my-2'>
                      {/* Positions */}
                      {positions.map((position) => (
                        <PositionButton key={position} handleSelection={handleSelect} area='door' type='shelf' loc={shelf} position={position} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className='h-full w-[5%] flex flex-col justify-center items-center hover:bg-gray-400 border-l-[1px] border-gray-600'>
            <p className='transform rotate-90 origin-center'>Door</p>
          </div>
        </div>
        {/* Door End */}

        <div className='z-[5] flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white'>
          {/* Fridge Area Start*/}
          <div className='w-full z-[6] h-[49%] rounded-md border-2 border-black p-2'>
            {/* Fridge Compartment */}
            {appliance?.fridgeCompartment && appliance.fridgeCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
              <div key={index}>

                {/* Shelves */}
                {shelves != undefined && shelves.map((shelf, index) => (
                  <div key={index}>
                    <div className='grid grid-cols-3 grid-rows-1 gap-x-1 mx-auto my-2'>
                      {/* Positions */}
                      {positions.map((position) => (
                        <PositionButton key={position} handleSelection={handleSelect} area='fridge' type='shelf' loc={shelf} position={position} />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Drawers */}
                {drawers != undefined &&
                  <div className={`grid grid-cols-2 grid-rows-1 gap-x-1 mx-auto mt-2`}>
                    {drawers.map((drawer, index) => (
                      <DrawerButton key={index} handleSelection={handleSelect} area='fridge' type='drawer' loc={drawer} />


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
                      <DrawerButton key={index} handleSelection={handleSelect} area='freezer' type='drawer' loc={drawer} />
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





export default Appliance

type PositionProps = {
  handleSelection: (are: string, type: string, loc: number, position?: number) => void;
  area: string;
  type: string;
  loc: number;
  position?: number;
}


const PositionButton = ({ handleSelection, area, type, loc, position }: PositionProps) => {
  return (
    <div

      className="group h-[80px] text-center cursor-pointer border rounded-md flex flex-row items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
    >
      <a href='#' aria-label={`Add an item to ${area} compartment, on ${type} ${loc}, position ${position}`} onClick={() => handleSelection(area, type, loc, position)} className='w-[50%] h-full text-center hover:border-r-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-l-md transition-all duration-300 ease-in'>
        <span className='text-[2.9vw]'>
          <IoIosAddCircleOutline />
        </span>
      </a>
      <a href='#' aria-label={`View items in ${area} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
        <span className='text-[2.9vw]'>
          <GiOpenedFoodCan />
        </span>
      </a>
    </div>
  )
}


const DrawerButton = ({ handleSelection, area, type, loc, position }: PositionProps) => {
  return (
    <div

      className="group h-[80px] w-full text-center cursor-pointer border rounded-md flex flex-row items-center justify-around transition-all duration-200 ease-in hover:bg-gray-500/50 relative"
    >
      <p className='flex group-hover:hidden'>Drawer {loc}</p>
      <a href='#' aria-label={`Add an item to ${area} compartment, on ${type} ${loc}, position ${position}`} onClick={() => handleSelection(area, type, loc, position)} className='w-[50%] h-full text-center hover:border-r-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-l-md transition-all duration-300 ease-in'>
        <span className='text-[2.9vw]'>
          <IoIosAddCircleOutline />
        </span>
      </a>
      <a href='#' aria-label={`View items in ${area} compartment, on ${type} ${loc}, position ${position}`} className='w-[50%] h-full text-center hover:border-l-2 hidden group-hover:flex flex-row justify-center items-center hover:bg-gray-600/80 hover:text-gray-200 rounded-r-md transition-all duration-300 ease-in text-xl'>
        <span className='text-[2.9vw]'>
          <GiOpenedFoodCan />

        </span>
      </a>
    </div>
  )
}