import React from 'react'
type Props = {
  appliance: ApplianceProp;
}
const ApplianceTitleArea = ({ appliance }: Props) => {
  return (
    <div className='mb-2'>
      <h2 className='text-gray-800 text-normal'>{appliance.name}</h2>
      <p className='text-sm italic text-gray-700'>
        {appliance.description.map((desc: string, index: number) => (
          <span key={index.toString()}>{desc}{index + 1 === appliance.description.length ? '' : ', '}</span>
        ))}
      </p>
    </div >
  )
}

export default ApplianceTitleArea