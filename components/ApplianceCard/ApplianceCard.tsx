import Image from 'next/image'
import React from 'react'
import { getImageForAppliance } from '@/utilities/functions'

const ApplianceCard = (app: any) => {
  const image = getImageForAppliance(app.app.type)
  return (
    <a href={`/appliance/${app.app.id}`} className='flex flex-row flex-wrap items-center justify-around w-full h-full p-4 transition-all duration-300 rounded-md aspect-auto bg-gray-200/30 hover:bg-gray-400/50 hover:shadow-xl ease'>
      <div className='mx-2'>
        {/* Image */}
        <Image src={image} alt={app.app.name} width={100} height={100} />
      </div>

      <div className='flex flex-col items-center justify-start mx-auto '>
        <p>{app.app.name}</p>
        <p className='text-sm font-normal capitalize'>{app.app.type.replace("_", " ")}</p>
      </div>
    </a>
  )
}

export default ApplianceCard