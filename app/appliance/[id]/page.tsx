'use client'

import { useEffect, useState } from 'react';

import { Appliance } from '@/components';
import { queryDatabase } from '@/utilities/functions';

const AppliancePage = () => {

  const [loading, setLoading] = useState(true);
  const [appliance, setAppliance] = useState<appliance>({ id: 0, ownerid: 0, name: 'null', type: '' });
  const [applianceItems, setApplianceItems] = useState<applianceItem[]>();
  const [error, setError] = useState<string>();

  const userId = 1;
  const applianceId = 1;


  useEffect(() => {
    const fetchData = async () => {
      const selectedAppliance = await queryDatabase(`SELECT * FROM appliances WHERE ownerid = ${userId} AND id = ${applianceId}`);
      if (!selectedAppliance) {
        setError('There has been an error!')
      } else {
        setAppliance(selectedAppliance[0]);
        const selectedApplianceItems = await queryDatabase(`SELECT * FROM applianceItems WHERE ownerid = ${userId} AND applianceid = ${applianceId}`)
        selectedApplianceItems != false && setApplianceItems(selectedApplianceItems);
        setLoading(false);
      }
    };
    fetchData();
  }, []);




  if (loading) {
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <h1 className='text-bold text-2xl'>Loading...</h1>
    </div>
  } else if (!loading && appliance && applianceItems) {
    return (
      <div className="container mx-auto p-0 sm:p-8">
        <h1 className="text-3xl font-bold mb-4">{appliance.name}</h1>
        <Appliance type={appliance.type} items={applianceItems} />
      </div>
    )
  }
};

export default AppliancePage;