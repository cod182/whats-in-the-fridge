'use client'

import { ApplianceDoor, FridgeFreezer, Modal, PositionButton } from '..';
// components/Fridge.tsx
import React, { useState } from 'react';

import { FaEdit } from "react-icons/fa";
import Image from 'next/image';
import { IoCloseSharp } from "react-icons/io5";
import ItemCard from '../Appliances/ItemCard';
import ViewItems from '../Appliances/ViewItems';
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


  const [selectedArea, setSelectedArea] = useState<selectionProps>({
    items: [],
    level: 0,
    compartment: ''
  });

  const handleSelect = (items: applianceItem[], level: number, compartment: string, position?: number) => {
    const obj: selectionProps = {
      items: [],
      level: 0,
      compartment: ''
    };
    obj.items = items;
    obj.level = level;
    obj.compartment = compartment;
    position && (obj.position = position);

    setSelectedArea(obj);
    console.log(obj)
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
      setSelectedArea({
        items: [],
        level: 0,
        compartment: ''
      });
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
                <ViewItems
                  selectedArea={selectedArea}
                />

              </div>
            </Modal>
            <FridgeFreezer modalState={modalState} handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} />
          </>
        )

      default:
        return (
          <p>Not Found</p>
        )
    }
  }
}
export default Appliance