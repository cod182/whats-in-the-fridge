import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { OkPacket, RowDataPacket } from 'mysql2';

import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

const checkUserAuthorised = (sharingResponse: RowDataPacket[], id: string) => {
  const isUserShared = sharingResponse.some(
    (record) => {
      return record.sharedUserId === parseInt(id);
    }
  );
  return isUserShared;
}

export const POST = async (request: NextRequest) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  try {


    const sharingQuery = "SELECT * FROM sharing WHERE applianceId=?";

    const sharingResponse = await executeQuery(sharingQuery, [session.user.id]) as RowDataPacket[];




    // Check if session.user.id exists in the sharingResponse
    const isUserShared = checkUserAuthorised(sharingResponse, session.user.id);

    if (!isUserShared) {


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
        cookedFromFrozen,
      } = await request.json();

      // Input validation
      if (!cookedFromFrozen) {
        return NextResponse.json({ message: "Item cookedFromFrozen is required", status: 400, statusText: 'Item cookedFromFrozen is missing' });
      }
      if (!id) {
        return NextResponse.json({ message: "Item ID is required", status: 400, statusText: 'Item ID is missing' });
      }
      if (!ownerid) {
        return NextResponse.json({ message: "User ID is required", status: 401, statusText: 'User ID is missing' });
      }
      if (!applianceid) {
        return NextResponse.json({ message: "Appliance ID is required", status: 400, statusText: 'Appliance ID is missing' });
      }
      if (!name) {
        return NextResponse.json({ message: "Item name is required", status: 400, statusText: 'Item name is missing' });
      }
      if (!quantity) {
        return NextResponse.json({ message: "Item quantity is required", status: 400, statusText: 'Item quantity is missing' });
      }
      if (!image) {
        return NextResponse.json({ message: "Item image is required", status: 400, statusText: 'Item image is missing' });
      }
      if (!addedDate) {
        return NextResponse.json({ message: "Item added date is required", status: 400, statusText: 'Item added date is missing' });
      }
      if (!itemType) {
        return NextResponse.json({ message: "Item type is required", status: 400, statusText: 'Item type is missing' });
      }
      if (!compartment) {
        return NextResponse.json({ message: "Compartment is required", status: 400, statusText: 'Compartment is missing' });
      }
      if (!locationType) {
        return NextResponse.json({ message: "Location type is required", status: 400, statusText: 'Location type is missing' });
      }
      if (!level) {
        return NextResponse.json({ message: "Level is required", status: 400, statusText: 'Level is missing' });
      }


      // SQL query with parameterized values
      const query = `
      INSERT INTO applianceItems (id, ownerid, applianceid, name, quantity, cookedFromFrozen, addedDate, expiryDate, itemMainType, itemType, itemSubType, compartment, level, locationType, position, comment, image, sharedUserId) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        image,
        session?.user?.id,
      ]);


      if ((queryResponse as OkPacket).affectedRows !== undefined) {
        const { affectedRows } = queryResponse as OkPacket;
        if (affectedRows === 1) {
          // Return success response
          return NextResponse.json({ message: "Success", status: 200, statusText: 'Success' });
        } else {
          return NextResponse.json({ message: "No rows affected", status: 400, statusText: 'No rows affected' });
        }
      } else {
        // Handle case where queryResponse is not OkPacket
        return NextResponse.json({ message: "Unexpected response format", status: 500, statusText: 'Unexpected response' });
      }
    } else {
      return NextResponse.json({ message: "User not authorised", status: 401, statusText: 'User not authorised' });

    }

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message, status: 500, statusText: 'Internal Server Error' });
  }
};
