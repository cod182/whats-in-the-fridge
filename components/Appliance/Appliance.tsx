'use client'

import { ExpiryNotification, FridgeFreezer, ItemSearch, Modal } from '..';
import React, { useState } from 'react';
import { getAllAddableItems, getItemsInThisLocation, getUserCustomItems, toggleBodyScrolling } from '@/utilities/functions';

import AddItem from '../AddingItems/AddItem';
import American from '../Appliances/American/American_main';
import ApplianceTitleArea from '../Appliances/ApplianceTitleArea';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import ChestAppliance from '../Appliances/ChestAppliance/ChestAppliance_main';
import { DefaultUser } from 'next-auth';
import { FaEdit } from 'react-icons/fa';
import { ImConnection } from 'react-icons/im';
import { IoSaveSharp } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import SharingMenu from '../sharingMenu/SharingMenu';
import SmallAppliance_main from '../Appliances/SmallAppliance/SmallAppliance_main';
import TallAppliance_main from '../Appliances/TallAppliance/TallAppliance_main';
import { TiTick } from 'react-icons/ti';
import ViewItems from '../Appliances/ViewItems';
import { appliances } from '@/static/appliances';
import { useEffect } from 'react';

type Props = {
  type: string;
  items: applianceItem[];
  updateItems: (items: applianceItem[]) => void;
  updateAppliance: (appliance: appliance) => void;
  user: { id: string, name: string, email: string };
  applianceData: appliance;
}

const Appliance = ({ type = '', items, updateItems, updateAppliance, user, applianceData }: Props) => {
  // States

  // The modal State for open or closed
  const [modalState, setModalState] = useState(false)

  // The appliance state. Contains the current appliance
  const [appliance, setAppliance] = useState<ApplianceProp>();

  // State for the type of modal
  const [modalType, setModalType] = useState<'add' | 'view'>();
  const [availableItems, setAvailableItems] = useState<availableItem[]>([])
  const [userCreatedItems, setUserCreatedItems] = useState<userCreatedItem[]>([])

  // Related to updating the name of the appliance
  const [currentApplianceName, setCurrentApplianceName] = useState(applianceData.name)
  const [editName, setEditName] = useState<boolean>(false)
  const [applianceName, setApplianceName] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const [success, setSuccess] = useState(false)


  // The state for the currently selected area (e.g shelf 0 position 0)
  // Contains the level (shelf / drawer number), compartment (e.g fridge, freezer, door), and optional position (0,1,2)
  // Contains all items in the level, compartment and position(optional)
  const [selectedArea, setSelectedArea] = useState<selectionProps>({
    items: [],
    level: 999,
    compartment: '',
    type: '',
    position: 128,
  });


  // Use Effects
  useEffect(() => {
    const getApplianceType = () => {
      appliances.map((applianceChoice: ApplianceProp) => {
        if (applianceChoice.name.toLowerCase().replace(/\s/g, '_') === type) {
          setAppliance(applianceChoice);
        }
      })
      setCurrentApplianceName(applianceData.name)
      setApplianceName(applianceData.name)
    };

    // Fetches all the available items to add
    const getAvailableItemsToAdd = async () => {
      const itemsArray: availableItem[] = await getAllAddableItems();
      setAvailableItems(itemsArray)

      const userItemsArray: userCreatedItem[] = await getUserCustomItems();
      setUserCreatedItems(userItemsArray)
    }

    // Matches the type to type of appliance
    getApplianceType();
    // Gets all the items in teh database that can be added to the appliance
    getAvailableItemsToAdd();

  }, [type, appliance, user.id, applianceData.name])


  // Functions


  // Called when a element is selected (e.g clicked on shelf 0 position 0. Gets all the items in the area
  const handleSelect = (items: applianceItem[], level: number, compartment: string, type: string, position: number) => {
    const obj: selectionProps = {
      items: [],
      level: 0,
      compartment: '',
      type: '',
      position: 128,
    };
    obj.items = items;
    obj.level = level;
    obj.compartment = compartment;
    obj.type = type;
    position && (obj.position = position);
    setSelectedArea(obj);
  };

  // Handles the Modal and scrolling on body
  const handleModalState = (state: string, toDisplay?: 'add' | 'view') => {
    if (state === 'open') {
      toggleBodyScrolling(false);
      setModalState(true);
      setModalType(toDisplay);
    } else if (state === 'closed') {
      toggleBodyScrolling(true);
      setModalState(false);
      setSelectedArea({
        items: [],
        level: 0,
        compartment: '',
        type: '',
        position: 128,
      });
    }
  };

  const handleChangeApplianceName = async (e: any) => {
    e.preventDefault()
    setLoading(true);
    try {
      let response = await fetch(`/api/appliance/${applianceData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName: applianceName, userId: user.id.toString(), })
      });
      if (response.ok) {
        setCurrentApplianceName(applianceName)
        setLoading(false);
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          setEditName(false)
        }, 1000);
      } if (!response.ok) {
        setErrorMessage(response.statusText)
        setLoading(false);
        setTimeout(() => {
          setErrorMessage(null)
          setApplianceName(applianceData.name)
        }, 1500);

      }
    } catch (error: any) {
      console.log(error)
    }
  }

  // Called to handle what happens when and items is edited or deleted
  // Gets the updated items from as a props
  // Updated the items by callback to items state by updateItems()
  // Filters down the updatedItems to just the items in the current area/level/position
  // updates the selectedArea state just providing the new items list
  const handleUpdateItems = async (updatedItems: applianceItem[]) => {
    updateItems(updatedItems);
    const filteredItems = getItemsInThisLocation(selectedArea.level, updatedItems, selectedArea.type, selectedArea.compartment, selectedArea?.position);
    setSelectedArea({ ...selectedArea, items: filteredItems })
    const userItemsArray: userCreatedItem[] = await getUserCustomItems();
    setUserCreatedItems(userItemsArray)
  }




  const getApplianceComponent = () => {
    if (appliance != null) {

      switch (type) {
        case 'fridge_freezer':
          return <FridgeFreezer updateAppliance={updateAppliance} applianceData={applianceData} handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} handleUpdateItems={handleUpdateItems} selectedArea={selectedArea} applianceType={type} />;

        case 'tall_freezer':
        case 'tall_fridge':
          return <TallAppliance_main updateAppliance={updateAppliance} applianceData={applianceData} handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} handleUpdateItems={handleUpdateItems} selectedArea={selectedArea} typeOfAppliance={type} />;

        case 'chest_freezer':
        case 'chest_fridge':
          return <ChestAppliance handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} handleUpdateItems={handleUpdateItems} selectedArea={selectedArea} applianceType={type} />;

        case 'under_counter_fridge':
        case 'under_counter_freezer':
        case 'under_counter_fridge_with_freezer':
          return <SmallAppliance_main handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} handleUpdateItems={handleUpdateItems} selectedArea={selectedArea} typeOfAppliance={type} />;

        case 'american_fridge_freezer':
          return <American handleModalState={handleModalState} appliance={appliance} handleSelect={handleSelect} items={items} handleUpdateItems={handleUpdateItems} selectedArea={selectedArea} applianceType={type} />;

        default:
          return (<div>Unknown</div>)
      }
    }
  }

  // Checks appliance exists
  if (appliance != null) {
    return (
      <>
        {/* Modal Start */}
        <Modal modalState={modalState} setModalState={handleModalState}>
          <div className="mt-4 mb-4 sm:mb-4">
            {modalType === 'view' &&
              <ViewItems
                selectedArea={selectedArea}
                applianceType={type}
                updateItems={handleUpdateItems}
                items={items}
                userId={user.id}
                shared={applianceData.sharedFrom && applianceData.sharedFrom}
              />
            }

            {modalType === 'add' &&
              <AddItem userId={user.id} selectedArea={selectedArea} availableItems={availableItems} userCreatedItems={userCreatedItems} updateItems={handleUpdateItems} items={items} shared={applianceData.sharedFrom}
              />
            }
          </div>
        </Modal>
        {/* Modal End */}

        <div className='my-4 grow'>
          {/* Fridge Name */}
          <div className='flex flex-row items-center justify-start gap-2 mb-2'>
            <h1 className={`${editName ? 'max-w-[0px]' : 'max-w-[300px]'}  h-[36px] overflow-hidden text-3xl font-bold transition-all duration-200 ease`}>{currentApplianceName} </h1>

            {/* Edit Form */}
            {!applianceData.sharedFrom && (<>
              <form action="" method='PUT' onSubmit={(e) => handleChangeApplianceName(e)} className={`${!editName ? 'max-w-[0px]' : 'max-w-[1000px]'} left-0 text-3xl font-bold overflow-hidden transition-all duration-200 ease flex flex-row items-center gap-2`}>
                <input id='nameInput' className={`py-[5px] px-2 rounded-md ${!applianceName ? 'border-red-400' : 'border-black'}`} type="text" value={applianceName} onChange={(e) => setApplianceName(e.target.value)} />
                <button className='' type="submit"><IoSaveSharp className={`w-[25px] h-[25px] hover:text-green-600 transition-all duration-200 ease ${loading || success ? 'hidden' : ''}`} /></button>
              </form>
              <MdCancel className={`w-[25px] h-[25px] hover:text-red-500 transition-all duration-200 ease cursor-pointer ${editName ? (loading || success ? 'hidden' : '') : 'hidden'}`} onClick={() => { setEditName(false); setApplianceName(currentApplianceName) }} />
              {/* Edit BUtton */}
              <FaEdit className={`${editName ? 'hidden' : ''} text-2xl text-blue-600 hover:scale-110 hover:text-gray-200 transition-all duration-200 ease cursor-pointer`} onClick={() => { setEditName(true); }} />
              <div className={`bg-gray-800/60 text-red-500 font-semibold overflow-hidden transition-all duration-200 ease  ${errorMessage ? 'max-w-[1000px] overflow-scroll py-[5px] px-2 rounded-lg' : 'max-w-[0px] p-0'}`}>{errorMessage}</div>
              <TiTick className={`${success && editName ? 'h-[40px] w-[40px] text-green-500' : 'hidden'} transition-all duration-200 ease`} />
              <BiDotsHorizontalRounded className={`${loading && editName ? 'h-[40px] w-[40px] text-blue-500' : 'hidden'} animate-spin transition-all duration-200 ease`} />
            </>)}

          </div>

          {/* Title Area */}
          <div className='flex flex-row justify-between items-center'>
            {/* Title */}
            <ApplianceTitleArea appliance={appliance} />

            {/* Start Sharing Section */}
            {applianceData.sharedFrom ? (
              <div className='flex flex-col items-center justify-center'>
                <ImConnection className='rotate-45 w-[30px] h-[30px] text-blue-500' />
                <p className='text-sm text-gray-600 font-normal italic'>Owned by: {applianceData.sharedFrom.ownerName}</p>
              </div>
            )
              :
              (
                <SharingMenu applianceData={applianceData} updateAppliance={updateAppliance} user={user} />

              )
            }

          </div>

          {/* Item search */}
          <ItemSearch items={items} handleUpdateItems={handleUpdateItems} applianceType={type} selectedArea={selectedArea} />

          {/* Expiry area */}
          <div className='mx-auto w-fit h-fit'>
            <ExpiryNotification layout='horizontal' items={items} />
          </div>

          {getApplianceComponent()}
        </div >

      </>
    )

  }
}
export default Appliance