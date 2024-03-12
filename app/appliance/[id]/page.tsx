'use client'

import { Appliance, FridgeLoader } from '@/components';
import { getAppliance, getApplianceItems } from '@/utilities/functions';
import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AppliancePage = () => {

  const { id } = useParams();
  const applianceId = id;

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

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated') {
        const selectedAppliance = await getAppliance(`SELECT * FROM appliances WHERE ownerid=${user.id} AND id=${applianceId}`);
        if (!selectedAppliance) {
          setError('There has been an error getting the appliance.')
        } else {
          setAppliance(selectedAppliance[0]);
          const selectedApplianceItems = await getApplianceItems(`SELECT * FROM applianceItems WHERE ownerid=${user.id} AND applianceid=${applianceId}`)

          if (selectedApplianceItems) {
            console.log(selectedApplianceItems);
            setApplianceItems(selectedApplianceItems);
            setLoading(false);
          } else {
            setError('There has been an error retrieving the appliance items');
            return;
          }
        }
      }
    };
    fetchData();
  }, [user?.id, status, applianceId]);

  // Error Handling
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <p className='font-bold'>
          {error}
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center w-full my-10 overflow-hidden h-fit'>
        <FridgeLoader />
      </div>
    );
  } else if (!loading && appliance && applianceItems) {
    return (
      <div className="container p-0 mx-auto sm:p-8">
        <h1 className="mb-4 text-3xl font-bold">{appliance.name}</h1>
        <Appliance type={appliance.type} items={applianceItems} updateItems={setApplianceItems} />
      </div>
    )
  }
};

export default AppliancePage;