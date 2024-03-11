'use client'

import React, { useEffect, useState } from 'react'
import { getApplianceItems, getAppliances } from '@/utilities/functions';

import ApplianceCard from '../ApplianceCard/ApplianceCard';
import FadeInHOC from '../FadeInHOC/FadeInHOC';
import FridgeLoader from '../FridgeLoader/FridgeLoader';
import { IoAddOutline } from "react-icons/io5";
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
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <FridgeLoader />
      </div>
    )
  }

  return (

    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4'>
      {appliances?.map((app, index) => (
        <FadeInHOC key={index} delayNumber={index === 0 ? 200 : (index + 1) * 200} direction='up'>
          <ApplianceCard app={app} />
        </FadeInHOC>
      ))
      }
      <a href={`/profile/add-appliance`} className='flex flex-row flex-wrap items-center justify-around w-full h-full p-4 transition-all duration-300 rounded-md aspect-auto bg-gray-200/30 hover:bg-gray-400/50 hover:shadow-xl ease'>
        <div className='mx-2'>
          {/* Image */}
          <IoAddOutline className='w-[100px] h-[100px]' />
        </div>

        <div className='flex flex-col items-center justify-start mx-auto '>
          <p className='font-bold'>Add New Appliance</p>
        </div>
      </a>
    </div >
  )

}

export default AppliancesList