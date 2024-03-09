'use client'

import React, { useEffect, useState } from 'react'
import { getApplianceItems, getAppliances } from '@/utilities/functions';

import ApplianceCard from '../ApplianceCard/ApplianceCard';
import FadeInHOC from '../FadeInHOC/FadeInHOC';
import FridgeLoader from '../FridgeLoader/FridgeLoader';
import { useSession } from 'next-auth/react';

const AppliancesList = () => {

  const { data: session } = useSession();

  const user: any = session?.user;

  const [appliances, setAppliances] = useState<appliance[]>()
  const [items, setItems] = useState<applianceItem[][]>()



  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const appliances: appliance[] = await getAppliances(`SELECT * FROM appliances WHERE ownerid=${user?.id}`);
        setAppliances(appliances)
      }
    };

    fetchData();

  }, [user]);

  const handleGettingItems = async (applianceId: number) => {
    const items = await getApplianceItems(`SELECT * FROM applianceItems WHERE ownerid=${user?.id} AND applianceId=${applianceId}`)
    return items.length;
  }


  if (!session?.user || (appliances === undefined)) {
    return (
      <div className='w-full h-full flex flex-col justify-center'>
        <FridgeLoader />
      </div>
    )
  }

  return (

    <div className='grid grid-flow-col grid-cols-1 sm:grid-cols-2 mx-auto gap-2'>
      {appliances?.map((app, index) => (
        <FadeInHOC key={index} delayNumber={index} direction='up'>
          <ApplianceCard app={app} />
        </FadeInHOC>
      ))}
    </div>
  )

}

export default AppliancesList