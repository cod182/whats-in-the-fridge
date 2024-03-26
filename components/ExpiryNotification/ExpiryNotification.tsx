'use client'

import { useEffect, useState } from "react";

import { calculateFutureDate } from "@/utilities/functions";
import { time } from "console";

type Props = {
  items: applianceItem[];
}
const ExpiryNotification = ({ items }: Props) => {


  type expiringItem = {
    name: string;
    notificationOpen: boolean;
    items: applianceItem[];
  }
  // States
  const [expiringItems, setExpiringItems] = useState<expiringItem[]>()


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
          console.log(`${item.name} has no expiry set`)
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
              console.log(`${item.name} has a while yet`)
              break;
          }
        } else {
          console.log('pushing expired', item.name)
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
        return 'Items Expiring Tomorrow';
      case '2':
        return `Expiring on the ${calculateFutureDate(2)}`;
      case '3':
        return `Expiring on the ${calculateFutureDate(3)}`;
      case '4':
        return `Expiring on the ${calculateFutureDate(4)}`;
      default:
        break;
    }
  }
  console.log(expiringItems)
  if (expiringItems) {
    return (
      <div className={`flex flex-col items-center justify-normal w-full h-fit bg-gray-400/30 border-[1px] border-black rounded-md p-2`}>
        {expiringItems.map((expiryObj) =>
          expiryObj.items.length > 0 && (
            <div key={expiryObj.name} className={`my-1 py-[2px] flex flex-col items-start justify-center bg-gray-500/60 hover:bg-gray-500/70 active:bg-gray-500/90 ${expiryObj.name === 'expired' && 'bg-red-400 font-bold'} active:shadow-inner w-full px-4 rounded-lg transition-all duration-200 ease cursor-pointer select-none`} >
              {/* Notification Bar */}
              <div className='flex flex-row items-center justify-between w-full' onClick={() => { }}>
                <p className={`text-md text-start ${expiryObj.name === 'expired' && 'font-bold'}`}>{getExpiryText(expiryObj.name)} </p>
                <div className='rounded-full bg-red-600 h-[22px] w-[22px] text-gray-100 text-sm select-none flex flex-col justify-center items-center'>
                  <p>
                    {expiryObj.items.length || 0}
                  </p>
                </div>
              </div>
            </div >
          )
        )}
      </div >
    )
  }
}

export default ExpiryNotification