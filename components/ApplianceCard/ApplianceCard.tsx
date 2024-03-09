import Image from 'next/image'
import React from 'react'
import { getImageForAppliance } from '@/utilities/functions'

const ApplianceCard = (app: any) => {
  const image = getImageForAppliance(app.app.type)
  console.log(image)
  return (
    <a href={`/appliance/${app.app.id}`} className='w-full h-full aspect-auto rounded-md bg-gray-300/50 p-3 flex flex-row justify-between items-center'>
      <div className=''>
        {/* Image */}
        <Image src={image} alt={app.app.name} width={100} height={100} />
      </div>

      <div className='flex flex-col justify-start items-center mx-auto '>
        <p>{app.app.name}</p>
        <p className='text-sm font-normal capitalize'>{app.app.type.replace("_", " ")}</p>
        <p>Number of Item: <span className='underline'>10</span></p>
      </div>
    </a>
  )
}

export default ApplianceCard