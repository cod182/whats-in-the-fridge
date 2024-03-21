import DeleteButton from './DeleteButton'
import Image from 'next/image'
import { getImageForAppliance } from '@/utilities/functions'

type Props = {
  app: appliance;
  handleDelete: (applianceId: number) => void;
}

const ApplianceCard = ({ app, handleDelete }: Props) => {
  // Get the image for the appliance type
  const image = getImageForAppliance(app.type)

  return (
    <div className='flex flex-col items-center justify-around w-full h-full overflow-hidden transition-all duration-300 rounded-md aspect-auto bg-gray-200/30 hover:bg-gray-400/50 hover:shadow-xl ease'>
      <a href={`/appliance/${app.id}`} className='flex flex-row flex-wrap items-center justify-around p-4 pb-6'>
        <div className='mx-2'>
          {/* Image */}
          <Image src={image} alt={app.name} width={100} height={100} />
        </div>

        <div className='flex flex-col items-center justify-start mx-auto '>
          <p>{app.name}</p>
          <p className='text-sm font-normal capitalize'>{app.type.replace("_", " ")}</p>
        </div>
      </a>
      <div className='w-full h-[25px] absolute bottom-0 rounded-b-md overflow-hidden'>
        <DeleteButton id={app.id} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default ApplianceCard