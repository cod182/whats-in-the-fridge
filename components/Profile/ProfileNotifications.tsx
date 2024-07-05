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
  const [appliances, setAppliances] = useState<appliance[]>();
  const [allItems, setAllItems] = useState<applianceItem[]>();

  // Get All Appliances
  // useEffects
  useEffect(() => {
    // Fetches the list of appliances
    const fetchAppliances = async () => {
      if (user) {
        const appliances: appliance[] = await getAllAppliances();
        setAppliances(appliances)
      }
    };

    const getAllUserItems = async () => {
      const selectedApplianceItems = await getAllApplianceItems()
      if (selectedApplianceItems) {
        setAllItems(selectedApplianceItems);
      } else {
        return;
      }
    }


    // Calls fetch appliances
    fetchAppliances();
    getAllUserItems();
  }, [user]);

  return (
    <>
      <FadeInHOC delayNumber={500} direction='down'>
        <p className='my-2 text-2xl font-bold'>Notifications</p>
      </FadeInHOC>
      <FadeInHOC delayNumber={600} direction='down'>
        <div className='flex flex-row flex-wrap items-start justify-start gap-2'>
          {appliances != undefined && allItems != undefined &&
            appliances.map((appliance: appliance) => {
              const items = allItems.filter(item => item.applianceid === appliance.id)
              if (items.length > 0) {
                return (
                  <div key={appliance.id} className='w-full md:max-w-[250px]'>
                    <ExpiryNotification items={items} message={`${appliance.name}`} linkToAppliance={`/appliance/${appliance.id}`} boxStyles='shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]' />
                  </div>
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