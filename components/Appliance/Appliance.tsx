'use client'

import { ChestFreezer, FridgeFreezer, Modal } from '..';
// components/Fridge.tsx
import React, { useState } from 'react';
import { getItemsInThisLocation, toggleBodyScrolling } from '@/utilities/functions';

import ViewItems from '../Appliances/ViewItems';
import { appliances } from '@/static/appliances';
import { useEffect } from 'react';

type Props = {
  type: string;
  items: applianceItem[];
  updateItems: (items: applianceItem[]) => void;
}

const Appliance = ({ type = '', items, updateItems }: Props) => {
  // States

  // The modal State for open or closed
  const [modalState, setModalState] = useState(false)
  // The appliance state. Contains the current appliance
  const [appliance, setAppliance] = useState<ApplianceProp>();
  // The state for the currently selected area (e.g shelf 0 position 0)
  // Contains the level (shelf / drawer number), compartment (e.g fridge, freezer, door), and optional position (0,1,2)
  // Contains all items in the level, compartment and position(optional)
  const [selectedArea, setSelectedArea] = useState<selectionProps>({
    items: [],
    level: 0,
    compartment: ''
  });

  // Use Effects
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

  // Functions

  // Called when a element is selected (e.g clicked on shelf 0 position 0. Gets all the items in the area
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

  // Called to handle what happens when and items is edited or deleted
  // Gets the updated items from as a props
  // Updated the items by callback to items state by updateItems()
  // Filters down the updatedItems to just the items in the current area/level/position
  // updates the selectedArea state just providing the new items list
  const handleUpdateItems = (updatedItems: applianceItem[]) => {
    updateItems(updatedItems);
    const filteredItems = getItemsInThisLocation(selectedArea.level, updatedItems, selectedArea.items[0].locationType, selectedArea?.position);
    setSelectedArea({ ...selectedArea, items: filteredItems })
  }

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
                  updateItems={handleUpdateItems}
                  items={items}
                />
              </div>
            </Modal>
            <FridgeFreezer modalState={modalState} handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} />
          </>
        )

      default:
        return (
          <ChestFreezer modalState={modalState} handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} />
        )
    }
  }
}
export default Appliance