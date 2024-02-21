import { FaEdit } from 'react-icons/fa'
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5'

type Props = {
  item: applianceItem;
}

const ItemCard = ({ item }: Props) => {

  let containerStatus = false;

  // Function for increasing and decreasing the size of a container
  const toggleContainer = (containerId: string) => {
    const itemContainer = document.getElementById(containerId);
    const button = document.getElementById(`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-button`);
    if (containerStatus) {
      itemContainer?.classList.remove('max-h-[500px]');
      itemContainer?.classList.add('max-h-[110px]');
      containerStatus = false;
      button!.textContent = 'More Info';
    } else {
      itemContainer?.classList.remove('max-h-[110px]');
      itemContainer?.classList.add('max-h-[500px]');
      containerStatus = true;
      button!.textContent = 'Less Info';

    }
  }


  const handleClickDelete = (e: any) => {
    let result = confirm('Are you sure you want to delete?')

    if (result) {
      console.log('DELETE')
    } else {
      e.preventDefault();
    }
  }


  return (
    <div
      id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-container`}
      className='flex flex-col justify-start items-start p-2 w-full max-h-[110px] rounded-md relative border-[1px] border-gray-400 bg-gray-200 overflow-hidden transition-all duration-200 ease-in-out'
    >

      <div className='flex flex-row items-start justify-around w-full mb-2'>
        {/* Item info */}
        <div className='flex flex-row justify-start items-center w-full' >
          <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
            <Image alt={`${item.name}`} src={`/assets/images/items/${item.name.toLowerCase().replace(/\s/g, '-')}.png`} fill className='object-fill' />
          </div>
          <div>
            <p className='capitalize text-md'>{item.name}</p>
            <p className='text-sm'>Quantity: {item.quantity}</p>
          </div>
        </div>

        {/* Buttons */}
        <div
          className='flex flex-col flex-wrap justify-between items-center h-[75px]'>
          {/* Edit Button */}
          <button>
            <FaEdit className='h-[20px] w-[20px] text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-200 ease-in-out' />
          </button>

          {/* Remove Buttons */}
          <button className='relative'
            onClick={(e) => handleClickDelete(e)}
          >
            <IoCloseSharp className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
          </button>
        </div>
        {/* More Info Button */}
        <p
          id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-button`}
          className='w-full h-[15px] select-none cursor-pointer text-center rounded-t-md absolute text-xs bottom-0 bg-gray-300 hover:bg-gray-400 hover:text-gray-300 border-t-[1px] border-gray-600 transition-all duration-200 ease-in-out'
          onClick={() => toggleContainer(`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-container`)}
        >
          More Info
        </p>
      </div>
      <div className='w-full h-fit mb-2'>
        <p className='text-sm'>Expiry: {item.expiryDate}</p>
        <p className='text-sm'>Date Added: {item.addedDate}</p>


      </div>
    </div >
  )
}

export default ItemCard