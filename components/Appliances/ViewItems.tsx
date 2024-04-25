import ItemCard from './ItemCard'

type Props = {
  selectedArea: selectionProps;
  updateItems: (items: applianceItem[]) => void;
  items: applianceItem[]
  userId: string;
  applianceType: string;
}

const ViewItems = ({ selectedArea, updateItems, items, userId, applianceType }: Props) => {

  return (
    <>
      <h2 className="pl-2 mb-2 text-xl font-bold capitalize md:p-0">Items {selectedArea.type === 'shelf' ? 'on this' : 'in this'} {selectedArea.compartment} {selectedArea.type}</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {selectedArea && selectedArea?.items?.map((item: applianceItem, index: number) =>
          <div key={index} className='w-full h-full px-[1px]'>
            <ItemCard item={item} items={items} updateItems={updateItems} applianceType={applianceType} selectedArea={selectedArea} />
          </div>
        )}
      </div>
    </>
  )
}

export default ViewItems