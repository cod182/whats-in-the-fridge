import { useEffect, useState } from "react";

import Appliance from '../Appliance/Appliance';
import FridgeFreezer_min from "./FridgeFreezer/FridgeFreezer_min";
import { MdCancel } from "react-icons/md";
import { appliances } from "@/static/appliances";
import { getAvailableCompartments } from "@/utilities/functions";

type Props = {
  setMoveArea: (bool: boolean) => void;
  moveArea: boolean;
  item: applianceItem;
  applianceType: string;
  selectedArea: selectionProps;
}



const MoveArea = ({ setMoveArea, moveArea, item, applianceType, selectedArea }: Props) => {
  const [appliance, setAppliance] = useState<ApplianceProp>()



  useEffect(() => {
    const getAppliance = () => {
      appliances.map((applianceChoice: ApplianceProp) => {
        if (applianceChoice.name.toLowerCase().replace(/\s/g, '_') === applianceType.toLowerCase().replace(/\s/g, '_')) {
          setAppliance(applianceChoice);
        }
      })
    }
    getAppliance();
  }, [applianceType])

  if (appliance) {

    return (
      <div className={`${moveArea ? 'h-[100%] py-2' : 'h-[0%] py-0'} overflow-hidden flex flex-col items-start px-2 absolute top-0 left-0 z-[999] w-full bg-gray-500/90 transition-all duration-200 ease`} >
        <div className="flex flex-row items-center justify-between w-full">
          <p className="underline my-2 font-bold text-2xl ">Move Item!</p>


          {/* Cancel Button */}
          <div className="relative group">
            <div className="overflow-hidden absolute select-none top-[7px] right-[38px] group-hover:flex w-fit md:w-0 group-hover:w-fit flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300 md:bg-none  group-hover:bg-gray-300 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
              <p className="text-xs font-normal md:text-sm">Cancel</p>
            </div>
            <button className='relative'
              onClick={(e) => { e.preventDefault(); setMoveArea(false); }}
            >
              <div className="w-[35px] h-[35px] rounded-full bg-gray-700 flex flex-col items-center justify-center group-inner">
                <MdCancel className='h-[25px] w-[25px] text-red-500 group-inner-hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
              </div>
            </button>
          </div>
        </div>

        {/* Item Locator Are */}

        <div className="w-full h-full">
          <FridgeFreezer_min appliance={appliance} handleMoveItem={() => { }} currentPlacement={{ compartment: item.compartment, locationType: item.locationType, level: item.level, position: item.position ? item.position : 128 }} />
        </div>
      </div>
    )
  }
}

export default MoveArea