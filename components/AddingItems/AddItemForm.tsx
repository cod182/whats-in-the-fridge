type Props = {
  selectedItem?: availableItem | userCreatedItem
}

const AddItemForm = ({ selectedItem }: Props) => {
  console.log(selectedItem)
  return (
    <form action='' method=''>
      <input type="text" value={selectedItem?.name} />
    </form>
  )
}

export default AddItemForm