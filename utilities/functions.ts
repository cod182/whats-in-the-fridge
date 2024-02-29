export const toggleBodyScrolling = (state: boolean) => {
  state ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
};

export const getAppliance = async (query: string) => {
  try {
    const response = await fetch('/api/appliance', {
      method: 'GET',
      headers: {
        'query-header': query,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}

export const getAppliances = async (query: string) => {
  try {
    const response = await fetch('/api/appliance', {
      method: 'GET',
      headers: {
        'query-header': query,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}

export const getApplianceItems = async (query: string) => {
  try {
    const response = await fetch('/api/appliance-items', {
      method: 'GET',
      headers: {
        'query-header': query,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}

export const removeItemFromDb = async (query: string, values: [] = []) => {
  try {
    const response = await fetch('/api/appliance-items', {
      method: 'DELETE',
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

// Takes items and filters them to an array of objects
export const findItemLocation = (items: applianceItem[]) => {
  let doorItems: applianceItem[] = []; // Initialized array
  let fridgeItems: applianceItem[] = []; // Initialized array
  let freezerItems: applianceItem[] = []; // Initialized array

  // Mapping over items and pushing them to their compartment array using a switch
  items.map((item) => {
    switch (item.compartment) { // Condition of the item's compartment (fridge, freezer etc...)
      case 'door': //Checking the condition
        doorItems.push(item) // Push item to array
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

  // return the new filtered object of arrays
  return object;
}


// Find all items with matching compartment, level and position (optional)
// Add to a new array and return
// level X axis
// items = all the items to be filtered
// location type = fridge, freezer, door
// position Y axis
export const getItemsInThisLocation = (level: number, items: applianceItem[], locationType: string, position: number = 999) => {
  let array: applianceItem[] = [] // initialize array
  // Map over all items giving item
  items.map((item) => {
    // Check if optional position is available
    if (position != 999) {
      // Match position, level and location
      if (item.level === level && (item.position === position) && (item.locationType === locationType)) {
        // Add item to array
        array.push(item);
      }
    } else {
      // Match level and location
      if (item.level === level && item.locationType === locationType) {
        // Add item to array
        array.push(item);
      }
    }
  })
  // Return the filtered array
  return array;
}