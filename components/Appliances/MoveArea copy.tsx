'use client'

import { useEffect, useState } from "react";

import { MdCancel } from "react-icons/md";
import { getAvailableCompartments } from "@/utilities/functions";

type Props = {
  setMoveArea: (bool: boolean) => void;
  moveArea: boolean;
  item: applianceItem;
  applianceType: string;
  selectedArea: selectionProps;
}

type itemLocationProps = {
  compartment: string;
  level: number;
  position?: number;
  locationType: string;
}

type availableCompartment = {
  name: string;
  drawers?: number;
  shelves?: number;
}


const MoveArea = ({ setMoveArea, moveArea, item, applianceType, selectedArea }: Props) => {

  // Use Effects
  useEffect(() => {
    const returnedValues = getAvailableCompartments(applianceType)
    setAvailableCompartments(returnedValues)
  }, [applianceType])


  // use States
  const [availableCompartments, setAvailableCompartments] = useState<availableCompartment[] | undefined>()
  const [itemLocationUpdate, setItemLocationUpdate] = useState<itemLocationProps>({
    compartment: selectedArea.compartment, level: selectedArea.level, position: selectedArea?.position, locationType: selectedArea.type,
  })
  const [locations, setLocations] = useState<any>()


  useEffect(() => {
    // Function to update locations
    const updateLocations = () => {
      const newLocations = availableCompartments?.map((item) => {
        if (itemLocationUpdate?.compartment.replace(/\s/g, "_").toLowerCase() === item.name.replace(/\s/g, "_").toLowerCase()) {
          // Filter out the 'name' property and return options as objects
          const options = Object.keys(item)
            .filter(key => key !== 'name')
            .map((key) => ({
              name: key,
              amount: item[key] // Set the amount to the value of the key in the item object
            }));

          return options;

        }
        return null;
      }).filter(Boolean); // Filter out null values

      setLocations(newLocations);
    };

    updateLocations(); // Call the function initially and whenever dependencies change
  }, [availableCompartments, itemLocationUpdate, selectedArea]);



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

      <form>
        {/* Compartment */}
        <div className="block w-full my-2">
          <label htmlFor="applianceCompartment" className="mr-2">Compartment:</label>
          <select name="applianceCompartment" id="applianceCompartment" className="capitalize rounded-md min-h-[30px] ml-2 w-max" onChange={(e) => { setItemLocationUpdate({ ...itemLocationUpdate, compartment: e.target.value }) }}>
            <option value={selectedArea.compartment}>Current: {selectedArea.compartment}</option>
            {availableCompartments?.map((item) => (
              <option value="" key={item.name.replace(/\s/g, "_").toLowerCase()}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="block w-full my-2">
          <label htmlFor="applianceLocation" className="mr-2">Location:</label>
          <select name="applianceLocation" id="applianceLocation" className="capitalize rounded-md min-h-[30px] ml-2 w-max" onChange={(e) => { setItemLocationUpdate({ ...itemLocationUpdate, locationType: e.target.value }) }}>
            <option value={selectedArea.type}>Current: {item.locationType}</option>
            {locations?.[0]?.map((availLocation: any, index: any) => {
              return (
                <option key={availLocation.name} value={availLocation.name}>{availLocation.name}</option>
              )
            })}
          </select>
        </div>

        {/* Level */}
        <div className="block w-full my-2">
          <label htmlFor="applianceLevel" className="mr-2">{itemLocationUpdate.locationType === 'drawer' ? 'Drawer' : 'Shelf'}:</label>
          <select name="applianceLevel" id="applianceLevel" className="capitalize rounded-md min-h-[30px] ml-2 w-max" onChange={(e) => { setItemLocationUpdate({ ...itemLocationUpdate, level: parseInt(e.target.value) }) }}>
            <option value={selectedArea.level}>Current: {selectedArea.level}</option>
            {locations?.[0]?.map((availLocation: any, index: any) => {
              if (availLocation.name === itemLocationUpdate.locationType) {
                const options = [];
                for (let i = 1; i <= availLocation.amount; i++) {
                  options.push(<option key={i} value={i}>{i}</option>);
                }
                return options;
              }
              return null; // Return null if condition not met to avoid errors
            })}
          </select>
        </div>

        {
          itemLocationUpdate.position != 128 && itemLocationUpdate.position != undefined && itemLocationUpdate.locationType === 'shelf' && (
            <div className="block w-full my-2">
              <label htmlFor="appliancePosition" className="mr-2">Position:</label>
              <select name="appliancePosition" id="appliancePosition" className="capitalize rounded-md min-h-[30px] ml-2 w-max" onChange={(e) => { setItemLocationUpdate({ ...itemLocationUpdate, position: parseInt(e.target.value) }) }}>
                <option value={selectedArea.position}>Current: {selectedArea.position === 1 && 'Left'}{selectedArea.position === 2 && 'Middle'}{selectedArea.position === 3 && 'Right'}</option>
                <option value="1">Left</option>
                <option value="2">Middle</option>
                <option value="3">Right</option>
              </select>
            </div>
          )
        }


        <button className="px-2 py-[5px] rounded-md bg-blue-500 hover:bg-blue-400 active:bg-blue-700 transition-all duration-200 ease w-full h-fit">Move Item</button>

      </form >
    </div >
  )
}

export default MoveArea