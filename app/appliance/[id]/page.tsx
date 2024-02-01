'use client'
import { Appliance } from '@/components';
import { useState } from 'react';

const AppliancePage = () => {
  const [selectedArea, setSelectedArea] = useState<string>();


  const handleSelect = (area: string, type: string, loc: number, position?: any) => {
    const selectedItem = `in the ${area} compartment - ${type}: ${loc} ${position != undefined ? `- Position: ${position}` : ''} `;
    setSelectedArea(selectedItem);
  };

  const applianceType = 'fridge_freezer'

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Your Fridge</h1>
      <Appliance onSelect={handleSelect} type={applianceType} />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Selected Items:</h2>
        <ul>
          {selectedArea}
        </ul>
      </div>
    </div>
  );
};

export default AppliancePage;