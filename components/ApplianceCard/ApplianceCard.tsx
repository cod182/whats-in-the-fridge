import { ImConnection } from "react-icons/im";
import Image from 'next/image'
import { IoCloseSharp } from 'react-icons/io5';
import { RiUserShared2Line } from 'react-icons/ri';
import { getImageForAppliance } from '@/utilities/functions'

type Props = {
  app: appliance;
  handleDelete: (applianceId: number) => void;
}

const ApplianceCard = ({ app, handleDelete }: Props) => {

  const handleDeleteAppliance = async (e: any) => {
    let result = confirm('Are you sure you want to delete?')

    if (result) {
      handleDelete(app.id);
    } else {
      e.preventDefault();
    }
  }



  // Get the image for the appliance type
  const image = getImageForAppliance(app.type)

  return (
    <div className='relative p-4 flex flex-row items-center justify-between w-full h-full overflow-hidden transition-all duration-300 rounded-md hover:scale-105 hover:shadow-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] ease'>

      {/* Banner shown when appliance is shared */}
      {app.sharedFrom && (
        <div className="rotate-45 absolute w-[100px] h-[50px] bg-gradient-to-t from-blue-700/30 to-blue-700/70 right-[-40px] top-[-15px] flex items-end pb-[3px] justify-center group">
          <ImConnection className="w-[25px] h-[25px] text-white" />

          {/* Tooltip */}
          <span className="absolute z-[99] bottom-[-40px] left-[-50px] rotate-[-45deg] bg-gray-300/90 text-black text-xs font-normal rounded-md px-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Shared Appliance
          </span>
        </div>
      )}

      <a href={`/appliance/${app.id}${app.sharedFrom ? '?shared' : ''}`} className='flex flex-row items-center justify-center h-full gap-2 w-full'>
        <div className='flex items-center justify-center'>
          {/* Image */}
          <Image src={image} alt={app.name} width={100} height={100} />
        </div>

        <div className='flex flex-col items-start justify-center w-full h-full mx-auto'>
          <p>{app.name}</p>
          <p className='hidden text-sm font-normal capitalize xxs:inline'>{app.type.replace(/_/g, " ")}</p>
          {app.sharedFrom && (<p className="text-xs font-normal italic">Shared by {app.sharedFrom.ownerName}</p>)}
        </div>
      </a>

      {/* Only show if there is sharedWith in the appliance - means there is ownership of the appliances */}
      {app.sharedWith &&
        <div className='h-full md:relative w-fit flex flex-col items-center justify-between'>
          {/* Delete Button */}
          <button className='relative flex flex-row items-center justify-center rounded-md group bg-gray-300/30 md:bg-transparent'
            onClick={(e) => handleDeleteAppliance(e)}
          >
            <div className="overflow-hidden select-none hidden md:flex  absolute top-[2px] right-[25px] group-hover:md:flex md:w-0 group-hover:sm:w-fit flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300/70 md:bg-none  group-hover:bg-gray-300/80 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
              <p className="text-xs font-normal md:text-sm">Delete</p>
            </div>
            <p className="inline ml-2 text-xs font-normal transition-all duration-200 w-fit md:hidden md:text-sm group-hover:font-bold ease">Delete</p>

            <IoCloseSharp className='h-[25px] w-[25px] text-red-500 hover:text-red-600 active:text-red-700 group-hover:scale-110 transition-all duration-200 ease-in-out' />
          </button>

          {/* Share Icon */}
          {app.sharedWith && app.sharedWith.length > 0 &&
            <div className='relative flex flex-row items-center justify-center rounded-md group bg-gray-300/30 md:bg-transparent'
            >
              <div className="overflow-hidden select-none hidden md:flex absolute top-[2px] right-[25px] group-hover:md:flex md:w-0 group-hover:sm:w-max flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300/70 md:bg-none  group-hover:bg-gray-300/80 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
                <p className="text-xs font-normal md:text-sm">Shared</p>
              </div>

              <>
                <ImConnection className={`h-[25px] w-[25px] rotate-[45deg]  hover:text-blue-600 active:text-blue-700 group-hover:scale-105 transition-all duration-200 ease-in-out text-blue-500 }`} />
              </>
            </div>
          }

        </div>
      }

    </div>
  )
}

export default ApplianceCard