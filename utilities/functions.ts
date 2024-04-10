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

export const getAllAddableItems = async (query?: string) => {
  if (query) {
    try {
      const response = await fetch('/api/items', {
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
  } else {

    try {
      const response = await fetch('/api/items');
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return false;
    }
  }
}

export const getAllUserItems = async () => {
  try {
    const response = await fetch('/api/items');
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
  let doorItemsFreezer: applianceItem[] = []; // Initialized array
  let fridgeItems: applianceItem[] = []; // Initialized array
  let freezerItems: applianceItem[] = []; // Initialized array

  // Mapping over items and pushing them to their compartment array using a switch
  items.map((item) => {
    switch (item.compartment) { // Condition of the item's compartment (fridge, freezer etc...)
      case 'door':
      case 'doorFridge':
        doorItems.push(item) // Push item to array
        break;
      case 'doorFreezer':
        doorItemsFreezer.push(item) // Push item to array
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
  object.doorItemsFreezer = doorItemsFreezer;

  // return the new filtered object of arrays
  return object;
}


// Find all items with matching compartment, level and position (optional)
// Add to a new array and return
// level X axis
// items = all the items to be filtered
// location type = fridge, freezer, door
// position Y axis
export const getItemsInThisLocation = (level: number, items: applianceItem[], locationType: string, compartment: string, position: number) => {
  let array: applianceItem[] = [] // initialize array
  // Map over all items giving item
  items.map((item) => {
    // Check if optional position is available
    if (position) {
      // Match position, level and location
      if (item.level === level && (item.position === position) && (item.locationType === locationType) && (item.compartment === compartment)) {
        // Add item to array
        array.push(item);
      }
    } else {
      // Match level and location
      if ((item.level === level) && (item.locationType === locationType) && (item.compartment === compartment)) {
        // Add item to array
        array.push(item);
      }
    }
  })
  // Return the filtered array
  return array;
}

// Gets the image for th provided appliance name
import { appliances } from '../static/appliances';

export const getImageForAppliance = (applianceName: string) => {
  let imageString = '/assets/images/appliances/not_found.webp'; // Settings the default string as a nor found image 

  const normalizedApplianceName = applianceName.replace(/\s/g, "_").toLowerCase(); // normalizes the appliacen name as lower case and any spaces replaced with _

  // using find to location and appliance in appliances that matches 
  const foundAppliance = appliances.find(appliance => {
    const normalizedAppliance = appliance.name.replace(/\s/g, "_").toLowerCase(); // variable for normalizes appliance name
    return normalizedAppliance === normalizedApplianceName; // check for match
  });

  if (foundAppliance) {
    const imageName = foundAppliance.name.replace(/\s/g, "_").toLowerCase();
    imageString = `/assets/images/appliances/${imageName}.webp`;
  }

  return imageString;
}


export const getCurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  return formattedDate;
}

export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
  const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
  const uniqueId = timestamp + randomString; // Concatenate timestamp and random string
  return uniqueId;
}

export const calculateFutureDate = (daysToAdd: number): string => {
  const now: Date = new Date();
  const futureDate: Date = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // Adding days in milliseconds

  const futureDay: number = futureDate.getDate();
  const futureMonth: number = futureDate.getMonth() + 1; // Month is zero-indexed
  const futureYear: number = futureDate.getFullYear();
  return `${futureDay}${getOrdinalSuffix(futureDay)}`;
  // 
  // return `${futureDay}${getOrdinalSuffix(futureDay)} of ${getMonthName(futureMonth)}, ${futureYear}`;
}

const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

const getMonthName = (month: number): string => {
  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month - 1]; // Month is zero-indexed
}

export const reverseDate = (inputDate: string): string => {
  // Split the input string into day, month, and year components
  const [year, month, day] = inputDate.split('-').map(Number);
  // Form the reversed date string in 'YYYY-MM-DD' format
  const reversedDate: string = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  return reversedDate;
};