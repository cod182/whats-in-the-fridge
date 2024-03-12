import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { executeQuery } from '@/lib/db';

export const POST = async (request: NextRequest, params: any, response: NextResponse) => {
  const { userId, applianceId, itemName, itemQuantity, addedDate, expiryDate, itemType, itemSubType, locationType, compartment, level, position, comment } = await request.json();

  if (!applianceId || !itemName || !itemQuantity || !addedDate || !expiryDate || !itemType || !itemSubType || !locationType || !compartment || !level || !position || !comment) {
    return new Response('Missing Details', { status: 400, statusText: 'Missing Details' })
  }

  if (!userId) {
    return new Response('Error defining User Id', { status: 400, statusText: 'Error defining User Id' })
  }

  if (userId && applianceId && itemName && itemQuantity && addedDate && expiryDate && itemType && itemSubType && locationType && compartment && level && position && comment) {
    console.log('Creating Item')
    try {
      const queryResponse = await executeQuery(`INSERT INTO applianceItems (ownerid, applianceid, name, quantity, addedDate, expiryDate, itemType, itemSubType, locationType, compartment, level, position, comment) VALUES('${userId}', '${applianceId}', '${itemName}', '${itemQuantity}', '${addedDate}', '${expiryDate}', '${itemType}', '${itemSubType}', '${locationType}', '${compartment}', '${level}', '${position}', '${comment})`)
      // return Response.redirect(`${process.env.NEXT_URL}/profile/appliances`);
      return new Response('', { status: 200, statusText: 'Success' })

    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ status: 500, statusText: 'Internal Server Error', message: error.message, ok: false });
    }
  }
}