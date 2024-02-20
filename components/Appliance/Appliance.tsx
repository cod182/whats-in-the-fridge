'use client'

import { ApplianceDoor, FridgeFreezer, Modal, PositionButton } from '..';
// components/Fridge.tsx
import React, { useState } from 'react';

import { appliances } from '@/static/appliances';
import { toggleBodyScrolling } from '@/utilities/functions';
import { useEffect } from 'react';

type Props = {
  onSelect: (area: string, type: string, loc: number, position?: number) => void;
  type: string;
  items: applianceItems;
}

const Appliance = ({ onSelect, type = '', items }: Props) => {
  // The modal State for open or closed
  const [modalState, setModalState] = useState(false)

  // The appliance state. Contains the current appliance
  const [appliance, setAppliance] = useState<ApplianceProp>();

  // Static Values for Items in the Appliance
  const itemsInAppliance = {

  }



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



  const handleSelect = (area: string, type: string, loc: number, position?: any) => {
    onSelect(area, type, loc, position);
  };

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
              <p>hi</p>
            </Modal>
            <FridgeFreezer modalState={modalState} handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} />
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