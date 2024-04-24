import Image from 'next/image';
type Props = {
  handleMoveItem: (level: number, compartment: string, locationType: string, position?: number) => void
  compartment: string;
  locationType: string;
  level: number;
  position?: number;
  currentPlacement: {
    compartment: string;
    locationType: string;
    level: number;
    position?: number;
  }
  rotate?: string;
}
const DrawerButton_min = ({ handleMoveItem, compartment, locationType, level, position, currentPlacement, rotate }: Props) => {

  return (

    <div className={` flex group w-full min-h-[30px] max-h-[80px] text-center cursor-pointer border rounded-md flex-row items-center justify-around transition-all duration-300 ease-in  relative ${compartment === currentPlacement.compartment && locationType === currentPlacement.locationType && level === currentPlacement.level ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700' : 'bg-gray-400 hover:scale-105 hover:bg-green-400 hover:shadow-md'}`}
      onClick={() => { handleMoveItem(level, compartment, locationType) }}
    >
      {compartment === currentPlacement.compartment && locationType === currentPlacement.locationType && level === currentPlacement.level ?
        <p className='text-white text-xs select-none text-center'>Current Location</p>
        :
        <div className='flex flex-col items-center justify-center w-full h-full overflow-hidden transition-all duration-200 ease'>
          {/* <p className='flex'>Drawer {level}</p> */}
        </div>
      }

      {
        compartment === 'freezer' && (
          <Image src='/assets/images/frozen.svg' alt='freezer icon' className='hidden xs:inline absolute text-blue-500 fill-current right-[5px] top-[5px]' width={20} height={20} />
        )
      }

    </div >

  )
}

export default DrawerButton_min