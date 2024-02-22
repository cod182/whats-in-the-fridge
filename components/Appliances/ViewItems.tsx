import ItemCard from './ItemCard'

type Props = {
  selectedArea: selectionProps;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[]
}

const ViewItems = ({ selectedArea, updateItems, items }: Props) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-2 capitalize">Your Items</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {selectedArea && selectedArea?.items?.map((item: applianceItem, index: number) =>
          <div key={index} className='w-full h-full'>
            <ItemCard item={item} items={items} updateItems={updateItems} />
          </div>
        )}
      </div>
    </>
  )
}

export default ViewItems