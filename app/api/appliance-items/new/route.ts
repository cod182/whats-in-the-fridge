import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export const POST = async (request: NextRequest, params: any, response: NextResponse) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }


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
      image,
      cookedFromFrozen
    } = await request.json();

    // Input validation

    if (!cookedFromFrozen) {
      console.log('id required for item');
      return NextResponse.json({ message: "item cookedFromFrozen is required': ", status: 400, statusText: 'Item cookedFromFrozen is missing' });
      // return new Response('item cookedFromFrozen is required', { status: 400, statusText: 'Item cookedFromFrozen is missing' });
    }

    if (!id) {
      console.log('id required for item');
      return NextResponse.json({ message: "item ID is required': ", status: 400, statusText: 'Item ID is missing' });
      // return new Response('item id is required', { status: 400, statusText: 'Item ID is missing' });
    }
    if (!ownerid) {
      console.log('ownerid required');
      return NextResponse.json({ message: "userID is required': ", status: 401, statusText: 'User is missing' });
      // return new Response('User ID is required', { status: 400, statusText: 'User ID is missing' });
    }

    if (!applianceid) {
      console.log('applianceid required');
      return NextResponse.json({ message: "ApplianceID is required': ", status: 400, statusText: 'ApplianceID is missing' });
      return new Response('Appliance ID is required', { status: 400, statusText: 'Appliance ID is missing' });
    }

    if (!name) {
      console.log('item name required');
      return NextResponse.json({ message: "item name is required': ", status: 400, statusText: 'Item name is missing' });
      // return new Response('Item Name is required', { status: 400, statusText: 'Item Name is missing' });
    }

    if (!quantity) {
      console.log('quantity required');
      return NextResponse.json({ message: "item quantity is required': ", status: 400, statusText: 'Item quantity is missing' });
      // return new Response('Item Quantity is required', { status: 400, statusText: 'Quantity is missing' });
    }
    if (!image) {
      console.log('quantity required');
      return NextResponse.json({ message: "item image is required': ", status: 400, statusText: 'Item image is missing' });
      // return new Response('Image is required', { status: 400, statusText: 'Image has not been selected' });
    }

    if (!addedDate) {
      console.log('added date required');
      return NextResponse.json({ message: "item added date is required': ", status: 400, statusText: 'Item added date is missing' });
      // return new Response('Added Date is required', { status: 400, statusText: 'The dat today is missing' });
    }

    if (!itemType) {
      console.log('item type required');
      return NextResponse.json({ message: "item Type is required': ", status: 400, statusText: 'Item Type is missing' });
      // return new Response('Item Type is required', { status: 400, statusText: 'The Type of item is missing' });
    }

    if (!compartment) {
      console.log('Compartment required');
      return NextResponse.json({ message: "compartment is required': ", status: 400, statusText: 'Compartment is missing' });
      // return new Response('Compartment is required', { status: 400, statusText: 'The compartment is missing' });
    }

    if (!locationType) {
      console.log('Location Required');
      return NextResponse.json({ message: "LocationType is required': ", status: 400, statusText: 'LocationType is missing' });
      // return new Response('LocationType is required', { status: 400, statusText: 'The Location is missing' });
    }

    if (!level) {
      console.log('Level is required');
      return NextResponse.json({ message: "Level is required': ", status: 400, statusText: 'Level is missing' });
      // return new Response('Level is required', { status: 400, statusText: 'The level is missing' });
    }

    // SQL query with parameterized values
    const query = `
      INSERT INTO applianceItems (id, ownerid, applianceid, name, quantity, cookedFromFrozen, addedDate, expiryDate, itemMainType, itemType, itemSubType, compartment, level, locationType,  position, comment, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;
    const queryResponse = await executeQuery(query, [
      id,
      ownerid,
      applianceid,
      name,
      quantity,
      cookedFromFrozen,
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

    // Return success response
    return NextResponse.json({ message: "Success': ", status: 200, statusText: 'Success' });
    // return new Response('', { status: 200, statusText: 'Success' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message, status: 500, statusText: 'Internal Server Error' });
    // return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }), { status: 500 });
  }
};