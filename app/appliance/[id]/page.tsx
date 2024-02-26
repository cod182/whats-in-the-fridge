'use client'

import { Appliance, FridgeLoader } from '@/components';
import { getAppliance, getApplianceItems } from '@/utilities/functions';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

const AppliancePage = () => {
  const { data: session, status } = useSession();
  let user: any;

  if (session?.user) {
    user = session.user
  }



  // States
  const [loading, setLoading] = useState(true);
  const [appliance, setAppliance] = useState<appliance>({ id: 0, ownerid: 0, name: 'null', type: '' });
  const [applianceItems, setApplianceItems] = useState<applianceItem[]>();
  const [error, setError] = useState<string>();

  const applianceId = 1;


  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated') {

        const selectedAppliance = await getAppliance(`SELECT * FROM appliances WHERE ownerid=${user.id} AND id=${applianceId}`);
        if (!selectedAppliance) {
          setError('There has been an error!')
        } else {
          setAppliance(selectedAppliance[0]);
          const selectedApplianceItems = await getApplianceItems(`SELECT * FROM applianceItems WHERE ownerid=${user.id} AND applianceid=${applianceId}`)

          if (selectedApplianceItems != false) {
            console.log(selectedApplianceItems)
            setApplianceItems(selectedApplianceItems); setLoading(false);
          }
          setError('There has been an error!');
          return;

        }
      }
    };
    fetchData();
  }, [user?.id, status]);




  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-fit my-10 overflow-hidden'>
        <FridgeLoader />
      </div>
    );
  } else if (!loading && appliance && applianceItems) {
    return (
      <div className="container mx-auto p-0 sm:p-8">
        <h1 className="text-3xl font-bold mb-4">{appliance.name}</h1>
        <Appliance type={appliance.type} items={applianceItems} updateItems={setApplianceItems} />
      </div>
    )
  }
};

export default AppliancePage;