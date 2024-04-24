import ApplianceDoor_min from '../ApplianceDoor_min';
import FreezerCompartment_min from '../FreezerCompartment_min';
import FridgeCompartment_min from '../FridgeCompartment_min';
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

const FridgeFreezer_min = ({ appliance, handleMoveItem, currentPlacement }: Props) => {

  const shelfPositions = [1, 2, 3]; // How many areas there are on a shelf

  return (
    <>
      <div className='w-[96%] max-w-[370px] max-h-full rounded-md md:p-1 border-2 border-black bg-gray-100 relative mr-[22px]'>

        {/* Door Start*/}
        {/* Door Compartment */}
        <div className='h-[50%] absolute top-0 right-0 w-full'>
          <ApplianceDoor_min appliance={appliance!} positions={shelfPositions} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
        </div>
        {/* Door End */}

        <div className='mx-auto z-[5] flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>
          {/* Fridge compartment Start*/}
          <div className='w-full z-[6] h-[50%] rounded-md border-2 border-black p-2'>
            {/* Fridge Compartment */}
            <FridgeCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
          </div>
          {/* Fridge compartment End */}

          {/* Middle Bar Start*/}
          <hr className='border-2 border-gray-500 bg-gray-200 w-full h-[2%] flex flex-row justify-center items-center' />
          {/* Middle Bar End*/}

          {/* Freezer compartment Start*/}
          <div className='w-full h-[50%] rounded-md border-2 border-black my-auto p-2 z-[1]'>
            {/* Freezer Compartment */}
            <FreezerCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
          </div>
          {/* Freezer compartment End*/}



        </div>
        {/* Feet Start */}
        <div className='absolute bottom-[-10px] left-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-10]' />
        <div className='absolute bottom-[-10px] right-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-10]' />
        {/* Feet End */}
      </div >
    </>
  )
}

export default FridgeFreezer_min