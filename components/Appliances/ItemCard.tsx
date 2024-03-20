import { FaEdit } from 'react-icons/fa'
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5'

type Props = {
  item: applianceItem;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[]
  userId: string;
}

const ItemCard = ({ item, updateItems, items, userId }: Props) => {

  let containerStatus = false;

  // Function for increasing and decreasing the size of a container
  const toggleContainer = (containerId: string) => {
    const itemContainer = document.getElementById(containerId);
    const button = document.getElementById(`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-button`);
    if (containerStatus) {
      itemContainer?.classList.remove('max-h-[500px]');
      itemContainer?.classList.add('max-h-[110px]');
      containerStatus = false;
      if (button) {
        button.textContent = 'More Info';
      }
    } else {
      itemContainer?.classList.remove('max-h-[110px]');
      itemContainer?.classList.add('max-h-[500px]');
      containerStatus = true;
      if (button) {
        button.textContent = 'Less Info';
      }
    }
  }



  const handleDelete = async (e: any) => {
    let result = confirm('Are you sure you want to delete?')

    if (result) {
      console.log('deleting item');
      try {
        let response = await fetch(`/api/appliance-items/${item.id}`, {
          method: 'DELETE',
          headers: {
            'ownerid': userId.toString()
          }
        });
        if (response.ok) {

          const filteredItems = items.filter(
            (i) => i.id != item.id
          )
          updateItems(filteredItems);
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    } else {
      e.preventDefault();
    }
  }


  return (
    <div
      id={`${item.name.toLowerCase().replace(/\s/g, '-')} -${item.id} -container`}
      className='flex flex-col justify-start items-start p-2 w-full max-h-[110px] rounded-md relative border-[1px] border-gray-400 bg-gray-200 overflow-hidden transition-all duration-200 ease-in-out'
    >

      <div className='flex flex-row items-start justify-around w-full mb-2'>
        {/* Item info */}
        <div className='flex flex-row justify-start items-center w-full' >
          <div className='mr-2 flex flex-col justify-center items-center w-[75px] h-[75px] aspect-square relative'>
            <Image alt={`${item.name} `} src={`/assets/images/items/${item.name.toLowerCase().replace(/\s/g, '-')}` + '.webp'} fill className='object-fill' />
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
            onClick={(e) => handleDelete(e)}
          >
            <IoCloseSharp className='h-[25px] w-[25px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 ease-in-out' />
          </button>
        </div>
        {/* More Info Button */}
        <p
          id={`${item.name.toLowerCase().replace(/\s/g, '-')}-${item.id}-button`}
          className='w-full h-[15px] select-none cursor-pointer text-center rounded-t-md absolute text-xs bottom-0 bg-gray-300 hover:bg-gray-400 hover:text-gray-300 border-t-[1px] border-gray-600 transition-all duration-200 ease-in-out'
          onClick={() => toggleContainer(`${item.name.toLowerCase().replace(/\s/g, '-')} -${item.id} -container`)}
        >
          More Info
        </p>
      </div>
      <div className='w-full h-fit my-4 '>
        {item.itemType &&
          <p className='text-sm text-normal text-normal'>Item Type: <span className='italic'>{item.itemType}</span></p>
        }
        {item.itemMainType &&
          <p className='text-sm text-normal text-normal'>Item Type 2: <span className='italic'>{item.itemMainType}</span></p>
        }
        {item.itemSubType &&
          <p className='text-sm text-normal'>Item sub Type: <span className='italic'>{item.itemSubType}</span></p>
        }
        {item.expiryDate &&
          <p className='text-sm text-normal'>Expiry: <span className='italic'>{item.expiryDate}</span></p>
        }
        <p className='text-sm text-normal'>Date Added: <span className='italic'>{item.addedDate}</span></p>
        {item.comment &&
          <p className='mb-2 text-sm text-normal'>Comment: <span className='block text-sm text-normal border-gray-300 border-[1px] rounded-md bg-gray-100 p-2 italic text-gray-600'>{item.comment}</span></p>
        }

      </div>
    </div >
  )
}

export default ItemCard