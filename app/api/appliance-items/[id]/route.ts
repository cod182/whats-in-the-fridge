import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest } from "next";
import { ResultSetHeader } from "mysql2";
import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

export const GET = async (req: NextApiRequest, params: any, res: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  if (!params.params.id) {
    return NextResponse.json({ message: 'No item Id provided' });
  }

  const query = 'SELECT * FROM applianceItems WHERE ownerid=? AND applianceid=?'

  try {
    const response = await executeQuery(query, [session.user.id, params.params.id]);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}


export const DELETE = async (req: any, { params }: any, res: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  if (!params.id || params.id === 'undefined') {
    return new Response('No Item Id Provided', { status: 400, statusText: 'No Item Id Provided' })
  }

  try {
    const response = await executeQuery('DELETE FROM applianceItems WHERE id = ? AND ownerid = ?', [params.id, session.user.id]) as ResultSetHeader;

    if (response && response?.affectedRows && response?.affectedRows > 0) {
      console.log('Item Has been deleted', response)
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ message: 'Invalid item ID or unauthorized access' });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export const PUT = async (request: NextRequest, { params }: any, response: NextResponse) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  const headersList = headers();
  const typeOfUpdate = headersList.get("update-type");


  if (typeOfUpdate === 'move') {
    try {
      const {
        compartment,
        level,
        locationType,
        position,
        id,
        ownerid,
        applianceid
      } = await request.json();


      if (id != params.id) {
        return new Response('Item ID Doesnt Match', { status: 400, statusText: 'Item ID Doesnt Match' })
      }


      if (ownerid != session.user.id) {
        return new Response('Owner ID Doesnt match', {
          status: 400, statusText: 'Owner ID Doesnt match'
        })
      }

      // SQL query with parameterized values
      const query = `UPDATE applianceItems SET compartment=?, level=?, locationType=?, position=? WHERE id=? AND ownerid=? AND applianceid=?`;

      const queryResponse = await executeQuery(query, [compartment, level, locationType, position, params.id, session.user.id, applianceid]) as ResultSetHeader;


      if (queryResponse && queryResponse.affectedRows && queryResponse.affectedRows > 0) {
        // Return success response
        return new NextResponse('', { status: 200, statusText: 'Item Moved' });
      } else {
        return new NextResponse('', { status: 404, statusText: 'Failed to Move item' });
      }

    } catch (error: any) {
      console.error(error);
      return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));
    }
  } else {
    try {
      const {
        id,
        applianceid,
        ownerid,
        name,
        itemType,
        itemMainType,
        itemSubType,
        quantity,
        expiryDate,
        comment,
        cookedFromFrozen
      } = await request.json();


      if (id != params.id) {
        return new Response('Item ID Doesnt Match', { status: 400, statusText: 'Item ID Doesnt Match' })
      }


      if (ownerid != session.user.id) {
        return new Response('Owner ID Doesnt match', {
          status: 400, statusText: 'Owner ID Doesnt match'
        })
      }

      if (!quantity) {
        return new Response('Quantity is missing', { status: 400, statusText: 'Quantity is missing' })
      }

      // SQL query with parameterized values
      const query = `UPDATE applianceItems SET name=?, itemType=?, itemMainType=?, itemSubType=?, quantity=?, cookedFromFrozen=?, expiryDate=?, comment=? WHERE id=? AND ownerid=? AND applianceid=?`;

      const queryResponse = await executeQuery(query, [name, itemType, itemMainType, itemSubType, quantity, cookedFromFrozen, expiryDate, comment, params.id, session.user.id, applianceid]) as ResultSetHeader;


      if (queryResponse && queryResponse.affectedRows && queryResponse.affectedRows > 0) {
        // Return success response
        return new NextResponse('', { status: 200, statusText: 'Success' });
      } else {
        return new NextResponse('', { status: 404, statusText: 'Failed to update item' });
      }

    } catch (error: any) {
      console.error(error);
      return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));
    }
  }
};

