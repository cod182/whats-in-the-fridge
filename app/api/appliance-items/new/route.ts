import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { executeQuery } from '@/lib/db';

export const POST = async (request: NextRequest, params: any, response: NextResponse) => {
  try {
    const {
      id,
      ownerid,
      applianceid,
      name,
      quantity,
      addedDate,
      expiryDate,
      itemType,
      itemSubType,
      itemMainType,
      compartment,
      level,
      locationType,
      position,
      comment,
      image
    } = await request.json();

    console.log('new item id', id);
    // Input validation
    if (!id) {
      console.log('id required for item');
      return new Response('item id is required', { status: 400, statusText: 'Item ID is missing' });
    }
    if (!ownerid) {
      console.log('ownerid required');
      return new Response('User ID is required', { status: 400, statusText: 'User ID is missing' });
    }

    if (!applianceid) {
      console.log('applianceid required');
      return new Response('Appliance ID is required', { status: 400, statusText: 'Appliance ID is missing' });
    }

    if (!name) {
      console.log('item name required');
      return new Response('Item Name is required', { status: 400, statusText: 'Item Name is missing' });
    }

    if (!quantity) {
      console.log('quantity required');
      return new Response('Item Quantity is required', { status: 400, statusText: 'Quantity is missing' });
    }
    if (!image) {
      console.log('quantity required');
      return new Response('Image is required', { status: 400, statusText: 'Image has not been selected' });
    }

    if (!addedDate) {
      console.log('added date required');
      return new Response('Added Date is required', { status: 400, statusText: 'The dat today is missing' });
    }

    if (!itemType) {
      console.log('item type required');
      return new Response('Item Type is required', { status: 400, statusText: 'The Type of item is missing' });
    }

    if (!compartment) {
      console.log('Compartment required');
      return new Response('Compartment is required', { status: 400, statusText: 'The compartment is missing' });
    }

    if (!locationType) {
      console.log('Location Required');
      return new Response('LocationType is required', { status: 400, statusText: 'The Location is missing' });
    }

    if (!level) {
      console.log('Level is required');
      return new Response('Level is required', { status: 400, statusText: 'The level is missing' });
    }

    // SQL query with parameterized values
    const query = `
      INSERT INTO applianceItems (id, ownerid, applianceid, name, quantity, addedDate, expiryDate, itemMainType, itemType, itemSubType, compartment, level, locationType,  position, comment, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
    `;
    const queryResponse = await executeQuery(query, [
      id,
      ownerid,
      applianceid,
      name,
      quantity,
      addedDate,
      expiryDate,
      itemMainType,
      itemType,
      itemSubType,
      compartment,
      parseInt(level),
      locationType,
      position,
      comment,
      image
    ]);

    console.log(queryResponse);

    // Return success response
    return new Response('', { status: 200, statusText: 'Success' });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }), { status: 500 });
  }
};