import { drinks, fruits, meats, seafood, snacks, vegetables } from '../../../static/items.js';

import { executeQuery } from '@/lib/db';

export const GET = async (request: any, params: any, response: any) => {
  let arrays = [vegetables, snacks, seafood, drinks, meats, fruits];

  // const resp = await executeQuery(`DELETE FROM availableItems`)

  arrays.forEach(array => {
    array.map(async (item: any) => {
      try {
        const queryResponse = await executeQuery(`INSERT INTO availableItems (name, itemType, itemSubtype, image, itemMainType) VALUES('${item.name}', '${item.type}', '${item.subtype}', '${item.image}', '${item.itemMainType}')`)
        console.log(queryResponse);
        console.log(`added ${item.name}`);

      } catch (error: any) {
        console.log(error);
      }
    })

  });

}