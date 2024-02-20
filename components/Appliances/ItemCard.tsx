import { FaEdit } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

type Props = {
  item: applianceItem;
}

const ItemCard = ({ item }: Props) => {
  return (
    <div className='flex flex-row items-start justify-between p-2 w-full h-full rounded-md relative border-[1px] border-gray-400 bg-gray-200'>
      <div className='flex flex-row justify-start items-start' >
        <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
          {/* <Image alt={`${item.name}`} src={`/assets/images/items/${item.name.toLowerCase().replace(/\s/g, '-')}.png`} fill className='object-fill' /> */}
        </div>
        <div>
          <p className='capitalize text-md'>{item.name}</p>
          <p className='text-sm'>Quantity: {item.quantity}</p>
          {/* <p className='text-normal text-sm italic text-center'>Date Added: {item.addedDate}</p> */}
          <p className='text-normal text-sm italic text-center'>Expiry Date: {item.expiryDate}</p>
        </div>
      </div>
      <div className='flex flex-col justify-around items-center h-full'>
        <button>
          <FaEdit className='h-[20px] w-[20px] text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-200 ease-in-out' />
        </button>
        <button >
          <IoCloseSharp className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
        </button>
      </div>
    </div>
  )
}

export default ItemCard