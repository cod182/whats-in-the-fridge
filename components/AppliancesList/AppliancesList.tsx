'use client'

import React, { useEffect, useState } from 'react'
import { getAllAppliances, removeApplianceFromDb } from '@/utilities/functions';

import ApplianceCard from '../ApplianceCard/ApplianceCard';
import FadeInHOC from '../FadeInHOC/FadeInHOC';
import FridgeLoader from '../FridgeLoader/FridgeLoader';
import { IoAddOutline } from "react-icons/io5";
import { useSession } from 'next-auth/react';

const AppliancesList = () => {

  const { data: session } = useSession();

  const user: any = session?.user;

  // States
  const [appliances, setAppliances] = useState<appliance[]>()
  const [numberOfResults, setNumberOfResults] = useState(11)
  const [filteredAppliances, setFilteredAppliances] = useState<appliance[]>()
  const [errorMessage, setErrorMessage] = useState<string>()

  console.log(appliances);

  // useEffects
  useEffect(() => {
    // Fetches the list of appliances
    const fetchAllAppliances = async () => {
      if (user) {
        const appliances: appliance[] = await getAllAppliances();
        setAppliances(appliances)
      }
    };
    // Get all user appliances
    fetchAllAppliances();
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
    if (appliances && appliances.length > 0) {
      paginateAppliances();
    }
  }, [appliances, numberOfResults])

  // Functions

  // Called for deleting an appliance from the database then updating the current state of items instead ot calling the db again
  const handleDeleteAppliance = async (applianceId: number) => {
    try {
      const response = await removeApplianceFromDb(applianceId);
      if (response.status != 200) {
        // if there is an error message
        setErrorMessage(response.status)
        setTimeout(() => {
          setErrorMessage(undefined)
        }, 2000)
      } else {
        console.log('request to delete response', response);
        const filteredItems = appliances!.filter(
          (i) => i.id != applianceId
        )
        setAppliances(filteredItems);
      }
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
      <div className={`${errorMessage ? 'max-h-[500px] py-2' : 'max-h-[0px] py-0'} mx-auto w-full sm:w-[80%] bg-gray-400/40 rounded-lg text-center overflow-hidden transition-all duration-200 ease`}>{errorMessage}</div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredAppliances && filteredAppliances?.map((app, index) => {
          return (
            <FadeInHOC key={app.id} delayNumber={index === 0 ? 200 : (index + 1) * 200} direction='up'>
              <>
                <ApplianceCard app={app} handleDelete={handleDeleteAppliance} />
              </>
            </FadeInHOC>
          )
        })
        }

        {/* Add New Appliance Link */}
        <a href={`/profile/add-appliance`} className='flex flex-row items-center px-2 justify-center w-full h-full overflow-hidden transition-all duration-300 rounded-md hover:scale-105 hover:shadow-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] ease'>
          <div className='flex items-center w-full h-full flex-center'>
            {/* Image */}
            <IoAddOutline className='max-w-[100px] max-h-[100px] w-36 h-auto mx-auto' />
          </div>

          <div className='flex flex-col items-center justify-center w-full h-full mx-auto'>
            <p className='font-bold'>New Appliance</p>
          </div>
        </a>
        {/* End Add New Appliance Link */}


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