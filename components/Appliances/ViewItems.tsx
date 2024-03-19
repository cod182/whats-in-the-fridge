import ItemCard from './ItemCard'

type Props = {
  selectedArea: selectionProps;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[]
  userId: string;
}

const ViewItems = ({ selectedArea, updateItems, items, userId }: Props) => {

  return (
    <>
      <h2 className="text-xl font-bold mb-2 capitalize">Items {selectedArea.type === 'shelf' ? 'on this' : 'in this'} {selectedArea.compartment} {selectedArea.type}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {selectedArea && selectedArea?.items?.map((item: applianceItem, index: number) =>
          <div key={index} className='w-full h-full'>
            <ItemCard item={item} items={items} updateItems={updateItems} userId={userId} />
          </div>
        )}
      </div>
    </>
  )
}

export default ViewItems