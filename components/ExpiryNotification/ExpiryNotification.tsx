'use client'

import { useState } from "react";

type Props = {
  items: applianceItem[];
}
const ExpiryNotification = ({ items }: Props) => {

  const [expiredItems, setExpiredItems] = useState()
  const [expiringOneDay, setExpiringOneDay] = useState<applianceItem[] | undefined>()
  const [expiringTwoDay, setExpiringTwoDay] = useState<applianceItem[] | undefined>()
  const [expiringThreeDay, setExpiringThreeDay] = useState<applianceItem[] | undefined>()
  const [expiringFourDay, setExpiringFourDay] = useState<applianceItem[] | undefined>()

  return (
    <div className={`flex flex-col items-center justify-normal w-full h-fit bg-gray-400 border-[1px] border-black rounded-lg`}>
      {/* Only Show If There are Applicable items */}
      {/* // Expiring Soon 1 Day */}
      <div className="flex flex-col items-start justify-center">
        {/* Notification Bar */}
        <div>
          <p className="font-semibold text-md">Expiring in 1 day <span className=' rounded-full bg-red-600 min-h-[40px] h-auto px-1 aspect-square text-white text-sm select-none'>{expiringOneDay?.length || 0}</span></p>
        </div>
      </div>



    </div >
  )
}

export default ExpiryNotification