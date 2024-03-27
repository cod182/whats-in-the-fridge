'use client'

import { getApplianceItems, getAppliances } from '@/utilities/functions';
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
        const appliances: appliance[] = await getAppliances(`SELECT * FROM appliances WHERE ownerid=${user?.id}`);
        setAppliances(appliances)
      }
    };

    const getAllUserItems = async () => {
      const selectedApplianceItems = await getApplianceItems(`SELECT * FROM applianceItems WHERE ownerid=${user.id}`)
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
        <p className='font-bold my-2 text-2xl'>Notifications</p>
      </FadeInHOC>
      <FadeInHOC delayNumber={600} direction='down'>
        <div className='flex flex-wrap flex-row justify-start items-start gap-2'>
          {appliances != undefined && allItems != undefined &&
            appliances.map((appliance: appliance) => {
              const items = allItems.filter(item => item.applianceid === appliance.id)
              if (items.length > 0) {
                return (
                  <div key={appliance.id} className='bg-gray-500/50 rounded-lg px-4 py-2 max-w-[250px]'>
                    <p className='capitalize w-full font-semibold'>{appliance.type.replace('_', " ")}: {appliance.name} has expiring items!</p>
                    <div className='w-fit'>
                      <ExpiryNotification items={items} />
                    </div>
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