import { useEffect, useState } from "react";

import American_min from "./American/American_min";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ChestAppliance_min from "./ChestAppliance/ChestAppliance_min";
import FridgeFreezer_min from './FridgeFreezer/FridgeFreezer_min';
import { MdCancel } from "react-icons/md";
import SmallAppliance_min from "./SmallAppliance/SmallAppliance_min";
import TallAppliance_min from "./TallAppliance/TallAppliance_min";
import { TiTick } from "react-icons/ti";
import { appliances } from "@/static/appliances";

type Props = {
  setMoveArea: (bool: boolean) => void;
  moveArea: boolean;
  item: applianceItem;
  applianceType: string;
  selectedArea: selectionProps;
  items: applianceItem[];
  updateItems: (items: applianceItem[]) => void;
  setEditActivated: (state: boolean) => void;
}



const MoveArea = ({ setEditActivated, updateItems, items, setMoveArea, moveArea, item, applianceType, selectedArea }: Props) => {

  // UseStates
  const [appliance, setAppliance] = useState<ApplianceProp>()
  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false)


  // Use Effects
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


  // FUNCTIONS

  // Function for handling the movement of an item
  const handleMoveItem = async (level: number, compartment: string, locationType: string, position?: number) => {
    // make sure error message is blank
    setErrorMessage('');

    // Building the updated item
    const updatedItem = {
      id: item.id,
      ownerid: item.ownerid,
      applianceid: item.applianceid,
      compartment: compartment,
      level: level,
      locationType: locationType,
      position: position ? position : 128,
    }

    try {
      // Start the updating process
      setUpdating(true);
      // Api Call
      const response = await fetch(`/api/appliance-items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'update-type': 'move'
        },
        body: JSON.stringify(updatedItem),
      });
      // If response is pk
      if (response.ok) {
        // Updating off
        setUpdating(false)
        // Success off
        setSuccess(true);
        // Set states to false after 1 second
        setTimeout(() => {
          // Call to the function to update the local items
          handlingUpdateLocalItem(updatedItem);
          setSuccess(false);
          setMoveArea(false);
          setEditActivated(false);
        }, 500);
      } else {
        // Response no ok
        // Set the message from the error
        setErrorMessage(response.statusText);
        // Set success to false after 1 second
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        setUpdating(false)
        setSuccess(false)
      }
    } catch (error) {
      console.error('Error while sending data', error);
      setErrorMessage('Error while sending data, please try again');
      setUpdating(false)
    }
  };

  // Takes the updated item, adds the uneffected original item parts. Find the item, removes it and adds it to a new array then updates the local array
  const handlingUpdateLocalItem = (updatedItemPart: any) => {
    const index = items.findIndex(item => item.id === updatedItemPart.id); // finds the item that matches

    const updatedItem = {
      id: updatedItemPart.id,
      ownerid: updatedItemPart.ownerid,
      applianceid: updatedItemPart.applianceid,
      name: item.name,
      itemType: item.itemType,
      itemMainType: item.itemMainType,
      itemSubType: item.itemSubType,
      addedDate: item.addedDate,
      expiryDate: updatedItemPart.expiryDate,
      cookedFromFrozen: item.cookedFromFrozen,
      quantity: item.quantity,
      comment: updatedItemPart.comment,
      compartment: updatedItemPart.compartment,
      level: updatedItemPart.level,
      locationType: updatedItemPart.locationType,
      position: updatedItemPart.position,
      image: item.image,
    }

    if (index === -1) {
      // If the item is not found, return the original array
      console.log('item not found')
      return items;
    }

    const updatedItems = [...items]; // creates new array of item
    updatedItems.splice(index, 1, updatedItem); // Replace the item at the found index with the updated item
    updateItems(updatedItems);
  };


  const getApplianceComponent = () => {
    if (appliance != null) {


      switch (applianceType.replace(/\s/g, "_").toLowerCase()) {
        case 'fridge_freezer':
          return <FridgeFreezer_min appliance={appliance} handleMoveItem={handleMoveItem} currentPlacement={{ compartment: item.compartment, locationType: item.locationType, level: item.level, position: item.position ? item.position : 128 }} />

        case 'tall_freezer':
        case 'tall_fridge':
          return <TallAppliance_min appliance={appliance} handleMoveItem={handleMoveItem} currentPlacement={{ compartment: item.compartment, locationType: item.locationType, level: item.level, position: item.position ? item.position : 128 }} typeOfAppliance={applianceType.replace(/\s/g, "_").toLowerCase()} />;

        case 'chest_freezer':
        case 'chest_fridge':
          return <ChestAppliance_min appliance={appliance} handleMoveItem={handleMoveItem} currentPlacement={{ compartment: item.compartment, locationType: item.locationType, level: item.level, position: item.position ? item.position : 128 }} />;

        case 'under_counter_fridge':
        case 'under_counter_freezer':
        case 'under_counter_fridge_with_freezer':
          return <SmallAppliance_min appliance={appliance} handleMoveItem={handleMoveItem} currentPlacement={{ compartment: item.compartment, locationType: item.locationType, level: item.level, position: item.position ? item.position : 128 }} typeOfAppliance={applianceType} />;

        case 'american_fridge_freezer':
          return <American_min appliance={appliance} handleMoveItem={handleMoveItem} currentPlacement={{ compartment: item.compartment, locationType: item.locationType, level: item.level, position: item.position ? item.position : 128 }} />;

        default:
          return (<div>Unknown</div>)
      }
    }
  }


  // Only retuns if there is an application
  if (appliance) {
    return (
      <div className={`${moveArea ? 'h-[100%] py-2' : 'h-[0%] py-0'} overflow-hidden flex flex-col items-start px-2 absolute top-0 left-0 z-[999] w-full bg-gray-500/90 transition-all duration-200 ease`} >
        <div className="flex flex-row items-center justify-between w-full">
          <p className="underline my-2 font-bold text-2xl text-gray-100">Move Item!</p>


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
        <div
          className={`flex flex-col flex-wrap justify-center items-center ${updating || success || errorMessage !== '' ? 'max-h-[200px] py-4' : 'max-h-[0px]'} overflow-hidden w-full transition-all duration-200 ease`}>

          {updating &&
            (
              <div className="flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                <p className="text-xs font-normal md:text-sm">Moving!</p>
                <BiDotsHorizontalRounded className='h-[20px] w-[20px] text-blue-500  hover:scale-110 transition-all duration-200 ease-in-out animate-spin' />
              </div>

            )
          }

          {success &&
            (
              <div className="flex flex-row items-center justify-center px-2 bg-gray-300 rounded-lg gap-x-2 z-2">
                <p className="text-xs font-normal md:text-sm">Moved!</p>
                <TiTick className='h-[25px] w-[25px] text-green-500  hover:scale-110 transition-all duration-200 ease-in-out' />
              </div>
            )
          }
        </div>
        <div className="w-full h-full">
          {getApplianceComponent()}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        Error
      </div>
    )
  }
}

export default MoveArea