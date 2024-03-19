import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { executeQuery } from '@/lib/db';

export const POST = async (request: NextRequest, params: any, response: NextResponse) => {
  try {
    const {
      id,
      userId,
      applianceId,
      itemName,
      itemQuantity,
      addedDate,
      expiryDate,
      itemType,
      itemSubType,
      itemMainType,
      compartment,
      level,
      locationType,
      position,
      comment
    } = await request.json();

    console.log('new item id', id);
    // Input validation
    if (!id) {
      console.log('id required for item');
      return new Response('item id is required', { status: 400, statusText: 'Bad Request' });
    }
    if (!userId) {
      console.log('userId required');
      return new Response('User ID is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!applianceId) {
      console.log('applianceId required');
      return new Response('Appliance ID is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!itemName) {
      console.log('item name required');
      return new Response('Item Name is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!itemQuantity) {
      console.log('quantity required');
      return new Response('Item Quantity is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!addedDate) {
      console.log('added date required');
      return new Response('Added Date is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!itemType) {
      console.log('item type required');
      return new Response('Item Type is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!compartment) {
      console.log('Compartment required');
      return new Response('Compartment is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!locationType) {
      console.log('Location Required');
      return new Response('LocationType is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!level) {
      console.log('Level is required');
      return new Response('Level is required', { status: 400, statusText: 'Bad Request' });
    }

    // SQL query with parameterized values
    const query = `
      INSERT INTO applianceItems (id, ownerid, applianceid, name, quantity, addedDate, expiryDate, itemMainType, itemType, itemSubType, compartment, level, locationType,  position, comment) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;
    const queryResponse = await executeQuery(query, [
      id,
      userId,
      applianceId,
      itemName,
      itemQuantity,
      addedDate,
      expiryDate,
      itemMainType,
      itemType,
      itemSubType,
      compartment,
      parseInt(level),
      locationType,
      position,
      comment
    ]);

    console.log(queryResponse);

    // Return success response
    return new Response('', { status: 200, statusText: 'Success' });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }), { status: 500 });
  }
};