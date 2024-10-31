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
      name,
      itemType,
      itemSubType,
      itemMainType,
      image,
    } = await request.json();

    // Input validation
    if (!id) {
      console.log('id required for item');
      return new Response('item id is required', { status: 400, statusText: 'Bad Request' });
    }
    if (!ownerid) {
      console.log('ownerid required');
      return new Response('User ID is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!name) {
      console.log('item name required');
      return new Response('Item Name is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!itemType) {
      console.log('item type required');
      return new Response('Item Type is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!itemMainType) {
      console.log('itemMainType Required');
      return new Response('itemMainType is required', { status: 400, statusText: 'Bad Request' });
    }

    if (!image) {
      console.log('image is required');
      return new Response('image is required', { status: 400, statusText: 'Bad Request' });
    }

    // SQL query with parameterized values
    const query = `
      INSERT INTO customAvailableItems (id, creatorid, name, itemMainType, itemType, itemSubType, image) 
      VALUES (?, ?, ?, ?, ?, ?,?)
    `;
    const queryResponse = await executeQuery(query, [
      id,
      session.user.id,
      name,
      itemMainType,
      itemType,
      itemSubType,
      image,
    ]);


    // Return success response
    return new Response('', { status: 200, statusText: 'Success' });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }), { status: 500 });
  }
};