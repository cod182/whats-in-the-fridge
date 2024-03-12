import { drinks, itemTypes, meats, snacks, vegetables } from '../../static/items'
type Props = {
  selectedArea: selectionProps;

}

const AddItem = ({ selectedArea }: Props) => {
  const { compartment, position, level } = selectedArea;
  return (
    <div className='flex flex-col p-4'>
      <h2 className='ml-4 text-xl font-semibold'>Add an item to your <span className='capitalize'>{compartment}</span></h2>

      <div className='flex flex-col items-center justify-center'>
        <form action='' method='POST'>
          <select name="itemName" id="itemName">
            <option value="">Choose a Type</option>
            {itemTypes.map((type, index) => (
              <option key={index} value="type" className='capitalize'>{type}</option>
            ))}
          </select>
        </form>
      </div>

    </div >
  )
}

export default AddItem