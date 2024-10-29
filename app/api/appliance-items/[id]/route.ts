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
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid item ID or unauthorized access', status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

export const PUT = async (request: NextRequest, { params }: any, response: NextResponse) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ message: "You must be logged in': ", status: 401 })
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
        // return new Response('Item ID Doesnt Match', { status: 404, statusText: 'Item ID Doesnt Match' })
        return NextResponse.json({ message: "Item ID Doesnt Match': ", status: 404 })

      }


      if (ownerid != session.user.id) {
        // return new Response('Owner ID Doesnt match', {status: 400, statusText: 'Owner ID Doesnt match'})
        return NextResponse.json({ message: "Owner ID Doesnt match': ", status: 401 })
      }

      // SQL query with parameterized values
      const query = `UPDATE applianceItems SET compartment=?, level=?, locationType=?, position=? WHERE id=? AND ownerid=? AND applianceid=?`;

      const queryResponse = await executeQuery(query, [compartment, level, locationType, position, params.id, session.user.id, applianceid]) as ResultSetHeader;


      if (queryResponse && queryResponse.affectedRows && queryResponse.affectedRows > 0) {
        // Return success response
        // return new NextResponse('', { status: 200, statusText: 'Item Moved' });
        return NextResponse.json({ message: "Item Moved': ", status: 200 })
      } else {
        // return new NextResponse('', { status: 404, statusText: 'Failed to Move item' });
        return NextResponse.json({ message: "Failed to Move item': ", status: 400 })

      }

    } catch (error: any) {
      console.error(error);
      // return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));
      return NextResponse.json({ message: error.message, status: 500 })

    }
  }

  if (typeOfUpdate === 'update') {
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
        // return new Response('Item ID Doesnt Match', { status: 400, statusText: 'Item ID Doesnt Match' })
        return NextResponse.json({ message: 'Item ID Doesnt Match', status: 400 })

      }


      if (ownerid != session.user.id) {
        // return new Response('Owner ID Doesnt match', {status: 400, statusText: 'Owner ID Doesnt match'})
        return NextResponse.json({ message: 'Owner ID Doesnt Match', status: 401 })

      }

      if (!quantity) {
        // return new Response('Quantity is missing', { status: 400, statusText: 'Quantity is missing' })
        return NextResponse.json({ message: 'Quantity is missing', status: 400 })

      }

      // SQL query with parameterized values
      const query = `UPDATE applianceItems SET name=?, itemType=?, itemMainType=?, itemSubType=?, quantity=?, cookedFromFrozen=?, expiryDate=?, comment=? WHERE id=? AND ownerid=? AND applianceid=?`;

      const queryResponse = await executeQuery(query, [name, itemType, itemMainType, itemSubType, quantity, cookedFromFrozen, expiryDate, comment, params.id, session.user.id, applianceid]) as ResultSetHeader;


      if (queryResponse && queryResponse.affectedRows && queryResponse.affectedRows > 0) {
        // Return success response
        // return new NextResponse('', { status: 200, statusText: 'Success' });
        return NextResponse.json({ message: 'Success', status: 200 })

      } else {
        // return new NextResponse('', { status: 404, statusText: 'Failed to update item' });
        return NextResponse.json({ message: 'Failed to update Item', status: 400 })

      }

    } catch (error: any) {
      console.error(error);
      // return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));}
      return NextResponse.json({ message: error.message, status: 500 })

    }
  }

  if (typeOfUpdate === 'iconUpdate') {
    try {
      const {
        id,
        applianceid,
        ownerid,
        image
      } = await request.json();


      if (id != params.id) {
        // return new Response('Item ID Doesnt Match', { status: 400, statusText: 'Item ID Doesnt Match' })
        return NextResponse.json({ message: 'Item ID Doesnt Match', status: 400 })
      }


      if (ownerid != session.user.id) {
        // return new Response('Owner ID Doesnt match', {status: 400, statusText: 'Owner ID Doesnt match'})
        return NextResponse.json({ message: 'Owner ID Doesnt Match', status: 401 })

      }

      // SQL query with parameterized values
      const query = `UPDATE applianceItems SET image=? WHERE id=? AND ownerid=? AND applianceid=?`;

      const queryResponse = await executeQuery(query, [image, params.id, session.user.id, applianceid]) as ResultSetHeader;


      if (queryResponse && queryResponse.affectedRows && queryResponse.affectedRows > 0) {
        // Return success response
        // return new NextResponse('', { status: 200, statusText: 'Success' });
        return NextResponse.json({ message: 'Success', status: 200 })

      } else {
        // return new NextResponse('', { status: 404, statusText: 'Failed to update image' });
        return NextResponse.json({ message: 'Failed to update Image', status: 400 })

      }

    } catch (error: any) {
      console.error(error);
      // return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));
      return NextResponse.json({ message: error.message, status: 500 })

    }
  }
};

