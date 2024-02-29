'use client'

import React, { useEffect, useState } from 'react'

import FadeInHOC from '../FadeInHOC/FadeInHOC';
import FridgeLoader from '../FridgeLoader/FridgeLoader';
import { getAppliances } from '@/utilities/functions';
import { useSession } from 'next-auth/react';

type user = {
  name: string;
  email: string;
  image: string;
  id: number
}
const AppliancesList = () => {

  const { data: session } = useSession();

  const user: any = session?.user;

  const [appliances, setAppliances] = useState<appliance[]>()

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const appliances = await getAppliances(`SELECT * FROM appliances WHERE ownerid=${user?.id}`);
        setAppliances(appliances)
      }
    };

    fetchData();

  }, [user]);


  if (!session?.user || (appliances === undefined)) {
    return (
      <div className='w-full h-full flex flex-col justify-center'>

        <FridgeLoader />
      </div>
    )
  }

  return (

    <div>
      {appliances?.map((item: appliance, index) => (
        <FadeInHOC key={index} delayNumber={index} direction='up'>
          <div >{item.name}</div>
        </FadeInHOC>
      ))}
    </div>
  )

}

export default AppliancesList