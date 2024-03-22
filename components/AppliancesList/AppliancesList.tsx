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
  const [numberOfResults, setNumberOfResults] = useState(11)
  const [filteredAppliances, setFilteredAppliances] = useState<appliance[]>()



  useEffect(() => {
    // Fetches the list of appliances
    const fetchAppliances = async () => {
      if (user) {
        const appliances: appliance[] = await getAppliances(`SELECT * FROM appliances WHERE ownerid=${user?.id}`);
        setAppliances(appliances)
      }
    };
    // Calls fetch appliances
    fetchAppliances();
  }, [user]);

  useEffect(() => {
    // Paginates the appliances
    const paginateAppliances = () => {
      if (appliances != undefined) {
        let pagAppliances: appliance[] = appliances.slice(0, numberOfResults);
        setFilteredAppliances(pagAppliances);
      } else {
        setFilteredAppliances(appliances);
      }
    }

    paginateAppliances();
  }, [appliances, numberOfResults])





  // Called for deleting an appliance from the databaase then updaing the current state of items instead ot calling the db again
  const handleDeleteAppliance = async (applianceId: number) => {
    try {
      // await removeItemFromDb(`DELETE FROM appliances WHERE id=${applianceId} AND ownerid=${user.id}`)
      await fetch(`/api/appliance/${applianceId}`, {
        method: 'DELETE',
        headers: {
          'ownerid': user.id.toString()
        }
      });
      const filteredItems = appliances!.filter(
        (i) => i.id != applianceId
      )
      setAppliances(filteredItems);
    } catch (error) {
      console.log(error)
    }
  }


  if (!session?.user || (appliances === undefined)) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <FridgeLoader />
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4'>
        {filteredAppliances?.map((app, index) => (
          <FadeInHOC key={index} delayNumber={index === 0 ? 200 : (index + 1) * 200} direction='up'>
            <ApplianceCard app={app} handleDelete={handleDeleteAppliance} />
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
      {
        filteredAppliances != undefined &&
          filteredAppliances?.length > 0 ? (
          <button
            type="button"
            className={`w-full h-fit px-6 py-2 my-6 bg-blue-500 hover:bg-blue-600 hover:shadow-inner text-white rounded-lg font-semibold ease-in-out transition-all duration-500
            ${numberOfResults >= appliances.length && 'hidden'
              }`}
            onClick={() => {
              setNumberOfResults((prev: number) => {
                return prev + 10;
              });
            }}
          >
            Load More&nbsp;
            <span className="block text-sm font-normal">
              Showing {filteredAppliances?.length} of {appliances.length}
            </span>
          </button>
        ) : filteredAppliances != undefined && filteredAppliances.length >= appliances.length ? null : null
      }
    </>
  )

}

export default AppliancesList