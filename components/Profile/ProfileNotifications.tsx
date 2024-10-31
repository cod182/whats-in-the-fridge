'use client'

import { getAllApplianceItems, getAllAppliances } from '@/utilities/functions';
import { useEffect, useState } from 'react';

import ExpiryNotification from '../ExpiryNotification/ExpiryNotification';
import FadeInHOC from '../FadeInHOC/FadeInHOC';

type Props = {
  user: { name: string; email: string; image: string, id: number }
}
const ProfileNotifications = ({ user }: Props) => {

  // States
  const [appliances, setAppliances] = useState<appliance[]>([]);
  const [allItems, setAllItems] = useState<applianceItem[]>([]);
  // Get All Appliances
  // useEffects
  useEffect(() => {
    // Fetches the list of appliances

    const getAllUserItems = async () => {
      const selectedApplianceItems = await getAllApplianceItems()
      if (selectedApplianceItems) {
        setAllItems(selectedApplianceItems);
      } else {
        return;
      }
    }

    const fetchAppliances = async () => {
      if (user) {
        const appliances: appliance[] = await getAllAppliances();
        setAppliances(appliances)
        if (appliances.length > 0) {
          getAllUserItems();
        }
      }
    };



    // Calls fetch appliances
    fetchAppliances();

  }, [user]);



  if (appliances && appliances.length < 1) return null

  return (
    <>
      <FadeInHOC delayNumber={500} direction='down'>
        <p className='my-2 text-2xl font-bold'>Notifications</p>
      </FadeInHOC>
      <FadeInHOC delayNumber={600} direction='down'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full'>
          {appliances.length > 0 && allItems.length > 0 &&
            appliances.map((appliance: appliance) => {
              const items = allItems.filter(item => item.applianceid === appliance.id)
              if (items) {
                return (
                  <ExpiryNotification key={appliance.id} items={items} message={`${appliance.name}`} linkToAppliance={`/appliance/${appliance.id}${appliance.sharedFrom ? '?shared' : ''}`} boxStyles='shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]' />
                )
              }
            })
          }
        </div>
      </FadeInHOC>
    </>
  )
}

export default ProfileNotifications