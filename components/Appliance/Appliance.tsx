'use client'

import { ApplianceDoor, FridgeFreezer, Modal, PositionButton } from '..';
// components/Fridge.tsx
import React, { useState } from 'react';

import DrawerButton from '../Appliances/DrawerButton';
import { appliances } from '@/static/appliances';
import { toggleBodyScrolling } from '@/utilities/functions';
import { useEffect } from 'react';

type Props = {
  onSelect: (area: string, type: string, loc: number, position?: number) => void;
  type: string;
}


const Appliance = ({ onSelect, type = 'fridge_freezer' }: Props) => {

  const [modalState, setModalState] = useState(false)

  const [appliance, setAppliance] = useState<ApplianceProp>();

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
        break;
    }
  }
}
export default Appliance