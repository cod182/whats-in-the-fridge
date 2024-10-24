import { ImConnection } from "react-icons/im";
import Image from 'next/image'
import { IoCloseSharp } from 'react-icons/io5';
import { RiUserShared2Line } from 'react-icons/ri';
import { getImageForAppliance } from '@/utilities/functions'

type Props = {
  app: applianceWithShared;
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


  const handleShareAppliance = async (e: any) => {



  }

  // Get the image for the appliance type
  const image = getImageForAppliance(app.type)

  return (
    <div className='p-4 flex flex-row items-center justify-between w-full h-full overflow-hidden transition-all duration-300 rounded-md hover:scale-105 hover:shadow-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] ease'>

      <a href={`/appliance/${app.id}`} className='flex flex-row items-center justify-center h-full gap-2 w-fit'>
        <div className='flex items-center justify-center'>
          {/* Image */}
          <Image src={image} alt={app.name} width={100} height={100} />
        </div>

        <div className='flex flex-col items-start justify-center w-full h-full mx-auto'>
          <p>{app.name}</p>
          <p className='hidden text-sm font-normal capitalize xxs:inline'>{app.type.replace(/_/g, " ")}</p>
        </div>
      </a>

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

        {/* Share Button */}
        <button className='relative flex flex-row items-center justify-center rounded-md group bg-gray-300/30 md:bg-transparent'
          onClick={(e) => handleShareAppliance(e)}
        >
          <div className="overflow-hidden select-none hidden md:flex absolute top-[2px] right-[25px] group-hover:md:flex md:w-0 group-hover:sm:w-max flex-row items-center justify-center px-2 md:p-0 group-hover:px-2 py-[2px] md:bg-transparent bg-gray-300/70 md:bg-none  group-hover:bg-gray-300/80 rounded-lg gap-x-2 z-2 transition-all duration-200 ease">
            <p className="text-xs font-normal md:text-sm">{app.sharedWith.length > 0 ? 'Stop Sharing' : 'Share'}</p>
          </div>

          {app.sharedWith.length > 0 ?
            <>
              <p className="inline ml-2 text-xs font-normal transition-all duration-200 w-fit md:hidden md:text-sm group-hover:font-bold ease">Stop Sharing</p>
              <ImConnection className={`h-[25px] w-[25px] rotate-[45deg]  hover:text-blue-600 active:text-blue-700 group-hover:scale-105 transition-all duration-200 ease-in-out text-blue-500 }`} />
            </>

            :
            <>
              <p className="inline ml-2 text-xs font-normal transition-all duration-200 w-fit md:hidden md:text-sm group-hover:font-bold ease">Share</p>
              <RiUserShared2Line className={`h-[20px] w-[20px]  hover:text-blue-600 active:text-blue-700 group-hover:scale-105 transition-all duration-200 ease-in-out text-black`} />
            </>
          }

        </button>

      </div>

    </div>
  )
}

export default ApplianceCard