'use client'

import { ApplianceDoor, FridgeFreezer, Modal, PositionButton } from '..';
// components/Fridge.tsx
import React, { useState } from 'react';

import { appliances } from '@/static/appliances';
import { toggleBodyScrolling } from '@/utilities/functions';
import { useEffect } from 'react';

type Props = {

  type: string;
  items: applianceItem[];
}

const Appliance = ({ type = '', items }: Props) => {
  // The modal State for open or closed
  const [modalState, setModalState] = useState(false)

  // The appliance state. Contains the current appliance
  const [appliance, setAppliance] = useState<ApplianceProp>();

  const [selectedArea, setSelectedArea] = useState<applianceItem[]>();
  const handleSelect = (items: applianceItem[]) => {
    setSelectedArea(items);
  };

  useEffect(() => {
    const getApplianceType = () => {

      appliances.map((applianceChoice: ApplianceProp) => {
        if (applianceChoice.name.toLowerCase().replace(/\s/g, '_') === type) {
          setAppliance(applianceChoice);
        } else {
          console.log('Appliance Not Found')
        }
      })
    };
    // Matches the type to type of appliance
    getApplianceType();

  }, [type, appliance])

  // Handles the Modal and scrolling on body
  const handleModalState = (state: string) => {
    if (state === 'open') {
      toggleBodyScrolling(false);
      setModalState(true);
    } else if (state === 'closed') {
      toggleBodyScrolling(true);
      setModalState(false);
    }
  };

  // Checks appliance exists
  if (appliance != null) {
    // Switch for choosing correct appliance component
    switch (type) {
      case 'fridge_freezer':
        return (
          <>
            <Modal modalState={modalState} setModalState={handleModalState}>
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Items:</h2>
                <ul>
                  {selectedArea != undefined && selectedArea?.map((item: applianceItem, index) => { return (<p key={index}>{item.name}</p>) })}
                </ul>
              </div>
            </Modal>
            <FridgeFreezer modalState={modalState} handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} />
          </>
        )

      default:
        return (
          <p>Not Found</p>
        )
        break;
    }
  }
}
export default Appliance