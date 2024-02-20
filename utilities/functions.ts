export const toggleBodyScrolling = (state: boolean) => {
  state ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
};

export const queryDatabase = async (query: string) => {
  try {
    const response = await fetch('/api/getdata', {
      method: 'GET',
      headers: {
        'query-header': query,
      }
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}

export const findItemLocation = (items: applianceItem[]) => {
  let doorItems: applianceItem[] = [];
  let fridgeItems: applianceItem[] = [];
  let freezerItems: applianceItem[] = [];

  // Mapping over items and pushing them to their area array using a switch
  items.map((item) => {
    switch (item.area) {
      case 'door':
        doorItems.push(item)
        break;
      case 'fridge':
        fridgeItems.push(item)
        break;
      case 'freezer':
        freezerItems.push(item)
        break;
      default:
        break;
    }
  })
  // building an object of items by their areas
  const object: any = {};
  object.door = doorItems;
  object.fridge = fridgeItems;
  object.freezer = freezerItems;

  return object;
}

export const getItemsInThisLocation = (position: number, shelf: number, items: applianceItem[]) => {
  // Find all items with matching area and shelf
  let array: applianceItem[] = []
  items.map((item) => {
    if (item.position === position && item.shelf === shelf) {
      array.push(item);
    }
  })
  console.log(array);
  return array;
}