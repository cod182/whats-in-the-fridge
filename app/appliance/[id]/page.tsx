'use client'

import { Appliance, ExpiryNotification, FridgeLoader } from '@/components';
import { getOneAppliance, getOneApplianceItems, getOneSharedAppliance, getOneSharedApplianceItems } from '@/utilities/functions';
import { redirect, useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { RiLoader2Fill } from "react-icons/ri";
import { useSession } from 'next-auth/react';

const AppliancePage = () => {

  // Assignments
  const router = useRouter();

  const { id } = useParams();
  const searchParams = useSearchParams(); // Get query parameters
  const shared = searchParams.get('shared'); // 'shared' query parameter, if exists

  const applianceId: string = id as string;

  // Session
  const { data: session, status } = useSession();
  let user: any;

  if (session?.user) {
    user = session.user
  }


  // FUNCTIONS
  const getAllApplianceItems = async () => {
    if (appliance) {
      let selectedApplianceItems: any;
      if (shared === null) {
        selectedApplianceItems = await getOneApplianceItems(applianceId)
      } else {
        selectedApplianceItems = await getOneSharedApplianceItems(applianceId)

      }
      if (selectedApplianceItems) {
        setApplianceItems(selectedApplianceItems);
        setLoading(false);
      } else {
        setError('There has been an error retrieving the appliance items');
        return;
      }
    }
  }


  // States
  const [loading, setLoading] = useState(true);
  const [appliance, setAppliance] = useState<appliance>({ id: 0, ownerid: 0, name: 'null', type: '' });
  const [applianceItems, setApplianceItems] = useState<applianceItem[]>();
  const [error, setError] = useState<string>();

  // Use Effects
  useEffect(() => {
    const fetchApplianceData = async () => {
      if (status === 'authenticated') {
        let selectedAppliance: any;
        if (shared === null) {
          selectedAppliance = await getOneAppliance(applianceId);
        } else {
          selectedAppliance = await getOneSharedAppliance(applianceId);
        }

        if (selectedAppliance.status && selectedAppliance.status != 200) {
          router.push("/profile");

          setError('There has been an error getting the appliance.')
        } else {
          setAppliance(selectedAppliance);
          getAllApplianceItems();

        }
      }
    };




    fetchApplianceData();
  }, [user?.id, status, applianceId, router]);

  useEffect(() => {


    if (status === 'authenticated') {
      getAllApplianceItems();
    }
  }, [appliance, applianceId, user?.id, status])

  // Error Handling
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full grow'>
        <p className='font-bold'>
          {error}
        </p>
        <RiLoader2Fill className='w-[35px] h-[35px] text-orange-500 animate-spin' />
      </div>
    );
  }

  if (loading || !appliance || !applianceItems) {
    return (
      <div className='flex flex-col items-center justify-center w-full my-10 overflow-hidden h-fit grow'>
        <FridgeLoader />
      </div>
    );
  } else {
    return (
      <div className="sm:container p-0 sm:mx-auto sm:p-8 grow">
        {/* <h1 className="mb-4 text-3xl font-bold">{appliance.name}</h1> */}
        <Appliance type={appliance.type} updateAppliance={setAppliance} applianceData={appliance} items={applianceItems} updateItems={setApplianceItems} user={user} />
      </div>
    )
  }
};

export default AppliancePage;