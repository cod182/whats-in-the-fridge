
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
}

const PositionButton_min = ({ handleMoveItem, compartment, locationType, level, position, currentPlacement }: Props) => {

  return (
    <>

      <div className={`flex group w-full min-h-[30px] max-h-[80px] text-center cursor-pointer border rounded-md flex-col items-center justify-around transition-all duration-300 ease-in relative ${compartment === currentPlacement.compartment && locationType === currentPlacement.locationType && level === currentPlacement.level && position === currentPlacement.position ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700' : 'bg-gray-400'}`}
        onClick={() => handleMoveItem(level, compartment, locationType, position)}
      >

        {compartment === currentPlacement.compartment && locationType === currentPlacement.locationType && level === currentPlacement.level && (position && position === currentPlacement.position) ?
          <p className='text-white text-xs select-none text-center'>Current Location</p>
          :
          <>
            <p className='block text-xs font-normal select-none'>Shelf:{level}</p>
            <p className='block text-xs font-normal select-none'>Position:{position}</p>
          </>
        }
      </div >
    </>
  )
}

export default PositionButton_min