import React from 'react'
import { findItemLocation } from '@/utilities/functions';
type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position?: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void;
  items: applianceItem[];
}

const ChestFreezer = ({ appliance, handleSelect, handleModalState, items }: Props) => {

  const itemsInLocation = findItemLocation(items);
  const position = [0, 1, 2, 4]; // How many areas there are on a shelf


  return (
    <>
      <div className='mb-2'>
        <h2 className='text-gray-800 text-normal'>{appliance.name}</h2>
        <p className='text-sm italic text-gray-700'>{appliance.description}</p>

      </div>


    </>
  )
}

export default ChestFreezer