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

  // Use Effects
  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated') {
        const selectedAppliance = await getAppliance(`SELECT * FROM appliances WHERE ownerid=${user.id} AND id=${applianceId}`);
        if (!selectedAppliance) {
          setError('There has been an error getting the appliance.')
        } else {
          setAppliance(selectedAppliance[0]);
        }
      }
    };
    fetchData();
  }, [user?.id, status, applianceId]);

  useEffect(() => {
    const getAllApplianceItems = async () => {
      if (appliance) {
        const selectedApplianceItems = await getApplianceItems(`SELECT * FROM applianceItems WHERE ownerid=${user.id} AND applianceid=${applianceId}`)
        if (selectedApplianceItems) {
          setApplianceItems(selectedApplianceItems);
          setLoading(false);
        } else {
          setError('There has been an error retrieving the appliance items');
          return;
        }
      }
    }

    if (status === 'authenticated') {
      getAllApplianceItems();
    }
  }, [appliance, applianceId, user?.id, status])


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
      <div className='flex flex-col items-center justify-center w-full my-10 overflow-hidden h-fit grow'>
        <FridgeLoader />
      </div>
    );
  } else if (!loading && appliance && applianceItems) {
    return (
      <div className="container p-0 mx-auto sm:p-8 grow">
        {/* <h1 className="mb-4 text-3xl font-bold">{appliance.name}</h1> */}
        <Appliance type={appliance.type} applianceData={appliance} items={applianceItems} updateItems={setApplianceItems} userId={user.id} />
      </div>
    )
  }
};

export default AppliancePage;