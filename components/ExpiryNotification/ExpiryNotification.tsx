'use client'

import { calculateFutureDate, reverseDate } from "@/utilities/functions";
import { useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import Link from "next/link";

type Props = {
  items: applianceItem[];
  message?: string;
  linkToAppliance?: string;
  layout?: 'horizontal' | 'vertical';
  boxStyles?: string;
}
const ExpiryNotification = ({ items, message, linkToAppliance, layout = 'vertical', boxStyles }: Props) => {


  type expiringItem = {
    name: string;
    notificationOpen: boolean;
    items: applianceItem[];
  }
  // States
  const [expiringItems, setExpiringItems] = useState<expiringItem[]>()
  const [selectedExpiry, setSelectedExpiry] = useState<string | null>()

  // Use Effects

  useEffect(() => {
    // Take in the items, for each item, in the array, check if expiry is present
    // If expiry exists check how many days until the day
    // Have 5 new arrays, expired, 1 day, 2 days, 3 days, 4 days
    // Match the number of days until expiry and push the items into the new array
    // Update the state with the new array

    const checkExpiryDate = (items: applianceItem[]) => {
      const currentDate: Date = new Date(); // Current date and time


      let expired: applianceItem[] = [];
      let one: applianceItem[] = [];
      let two: applianceItem[] = [];
      let three: applianceItem[] = [];
      let four: applianceItem[] = [];

      items.forEach(item => {
        if (!item.expiryDate) {
          return;
        }

        const expiryDate: Date = new Date(item.expiryDate);
        const timeUntilExpiry: number = expiryDate.getTime() - currentDate.getTime();

        const daysUntilExpiry: number = Math.ceil(timeUntilExpiry / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        if (timeUntilExpiry > 0) {
          switch (daysUntilExpiry) {
            case 1:
              one.push(item)
              break;
            case 2:
              two.push(item)
              break;
            case 3:
              three.push(item)
              break;
            case 4:
              four.push(item)
              break;
            default:
              break;
          }
        } else {
          expired.push(item)
        }
      });

      setExpiringItems([

        {
          name: 'expired',
          notificationOpen: false,
          items: expired,
        },
        {
          name: '1',
          notificationOpen: false,
          items: one,
        },
        {
          name: '2',
          notificationOpen: false,
          items: two,
        },
        {
          name: '3',
          notificationOpen: false,
          items: three,
        },
        {
          name: '4',
          notificationOpen: false,
          items: four,
        }
      ])
    }
    checkExpiryDate(items);

  }, [items])

  // Functions

  // Takes in the expiry name and returns a string for the title
  const getExpiryText = (text: string) => {
    switch (text) {
      case 'expired':
        return 'Expired Items';
      case '1':
        return 'Expiring Tomorrow';
      default:
        return `Expiring on the ${calculateFutureDate(parseInt(text))}`;

    }
  }
  if (expiringItems) {
    if (expiringItems[0].items.length > 0 || expiringItems[1].items.length > 0 || expiringItems[2].items.length > 0 || expiringItems[3].items.length > 0 || expiringItems[4].items.length > 0) {
      return (
        <div className={`w-full ${boxStyles} flex ${layout === 'vertical' ? 'flex-col items-start justify-center' : 'md:flex-row flex-wrap flex-col items-start justify-start gap-x-2'} w-full h-fit rounded-md p-2`}>

          {message && (
            <p className="px-2 font-semibold capitalize">{message}</p>
          )}

          {linkToAppliance && (
            <Link href={linkToAppliance} className="w-full px-2 text-sm italic text-gray-600 transition-all duration-200 ease hover:text-blue-500 active:text-blue-600 text-start text-normal group">Go to Appliance <FaArrowRight className="inline group-hover:translate-x-[5px] group-hover:scale-105 transition-all duration-300 ease" /> </Link>
          )}

          {expiringItems.map((expiryObj) =>
            expiryObj.items.length >= 1 && (
              <button
                key={expiryObj.name.replace(/\s/g, "_")}
                onClick={() => setSelectedExpiry((prev) => prev === expiryObj.name.replace(/\s/g, "_") ? null : expiryObj.name.replace(/\s/g, "_"))}
                className={`w-full group h-fit my-1 py-[2px] flex flex-col items-start justify-center overflow-hidden ${expiryObj.name === 'expired' ? 'bg-red-500/70 font-bold hover:bg-red-500/80 active:bg-red-500/90' : 'bg-gray-500/50 hover:bg-gray-500/70 active:bg-gray-500/90'} active:shadow-inner w-fit rounded-lg transition-all duration-200 ease cursor-pointer select-none`}
              >
                {/* TOP Notification Bar */}
                <div className='flex flex-row items-center justify-between w-full px-2' onClick={() => { }}>
                  <p className={`text-md text-start ${expiryObj.name === 'expired' ? 'font-bold' : 'font-normal'}`}>{getExpiryText(expiryObj.name)} {expiryObj.name === 'expired' && (<IoIosWarning className="inline text-yellow-300" />)}</p>
                  <div className='ml-2 rounded-full bg-red-600 h-[22px] w-[22px] text-gray-100 text-sm select-none flex flex-col justify-center items-center'>
                    <p>
                      {expiryObj.items.length || 0}
                    </p>
                  </div>
                </div>

                {/* Items that have / are expiring */}
                <div className={`${selectedExpiry === expiryObj.name.replace(/\s/g, "_") ? 'max-h-[400px] overflow-scroll py-[5px]' : 'max-h-[0px] overflow-hidden'} transition-all duration-200 ease flex flex-col items-start justify-start gap-y-2 w-full`}>
                  <hr className="w-full border-black" />
                  <div className={`px-2 transition-all duration-200 ease flex flex-col items-start justify-start gap-y-2 w-full`}>
                    {expiryObj.items.map((item) => (
                      <div key={item.id} className="text-gray-300 w-full h-fit flex flex-col items-start justify-start bg-gray-800/60 rounded-lg px-2 py-[5px]">
                        <p className='text-start text-md font-normal min-w-[170px]' >{item.name}</p>
                        {expiryObj.name === 'expired' && (
                          <p className="text-xs font-normal capitalize text-start">Expired: {reverseDate(item.expiryDate)}</p>
                        )}
                        <p className="text-xs font-normal capitalize text-start">Location: {item.compartment} {item.locationType} {item.level}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </button >
            )
          )}
        </div >
      )
    }
  } return
}

export default ExpiryNotification