import ApplianceDoor_min from '../ApplianceDoor_min';
import FreezerCompartment_min from '../FreezerCompartment_min';
import FridgeCompartment_min from '../FridgeCompartment_min';

type Props = {
  appliance: ApplianceProp;
  handleMoveItem: (level: number, compartment: string, locationType: string, position?: number) => void
  currentPlacement: {
    compartment: string;
    locationType: string;
    level: number;
    position?: number;
  }
  typeOfAppliance: string;
}

const SmallAppliance_min = ({ appliance, handleMoveItem, currentPlacement, typeOfAppliance }: Props) => {


  const shelfPositions = [1, 2, 3]; // How many areas there are on a shelf



  return (
    <>



      <div className='w-[96%] max-w-[370px] h-fit rounded-md md:p-1 border-2 border-black bg-gray-100 relative mr-[22px]'>

        {typeOfAppliance === 'under_counter_fridge' && (
          <>
            {/* Door Start*/}
            {/* Door Compartment */}
            <div className='h-[90%] absolute top-0 right-0 w-full'>
              <ApplianceDoor_min appliance={appliance!} positions={shelfPositions} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
            </div>
            {/* Door End */}

            <div className='mx-auto flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>
              {/* Fridge compartment Start*/}
              <div className='w-full z-[6] h-full rounded-md border-2 border-black p-2'>
                {/* Fridge Compartment */}
                <FridgeCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
              </div>
              {/* Fridge compartment End */}
            </div>

          </>
        )}

        {typeOfAppliance === 'under_counter_freezer' && (
          // {/* Freezer compartment Start*/ }
          <div className='w-full h-full rounded-md border-2 border-black my-auto p-2 z-[1]'>
            {/* Freezer Compartment */}
            <FreezerCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
          </div>
          // {/* Freezer compartment End */}
        )}

        {typeOfAppliance === 'under_counter_fridge_with_freezer' && (
          <>


            {/* Door Start*/}
            {/* Door Compartment */}
            <div className='h-[90%] absolute top-0 right-0 w-full'>
              <ApplianceDoor_min appliance={appliance!} positions={shelfPositions} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
            </div>
            {/* Door End */}

            <div className='mx-auto z flex flex-col w-full h-full rounded-md p-[2px] border-[1px] border-gray-400 bg-white relative'>

              {/* // Freezer compartment Start */}
              <div className='w-full z-[6] h-full rounded-md border-2 border-black p-2'>
                {/* Freezer Compartment */}
                <FreezerCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
              </div>
              {/* // Freezer compartment End */}

              {/* Fridge compartment Start*/}
              <div className='w-full h-full rounded-md border-2 border-black my-auto p-2 z-[1]'>
                {/* Fridge Compartment */}
                <FridgeCompartment_min appliance={appliance!} handleMoveItem={handleMoveItem} currentPlacement={currentPlacement} />
              </div>
              {/* Fridge compartment End */}
            </div>
          </>
        )}

        {/* Feet Start */}
        <div className='absolute bottom-[-10px] left-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-2]' />
        <div className='absolute bottom-[-10px] right-[2%] w-[30px] h-[20px] bg-black rounded-md z-[-2]' />
        {/* Feet End */}
      </div >
    </>
  )
}

export default SmallAppliance_min