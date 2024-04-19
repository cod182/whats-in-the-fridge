import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest } from "next";
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
    // console.log(response);
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


  const headersList = headers();
  const ownerId = headersList.get("ownerId");

  if (!ownerId || ownerId === 'undefined') {
    return new Response('No Owner Id Provided', { status: 400, statusText: 'No Owner Id Provided' })
  }

  if (!params.id || params.id === 'undefined') {
    return new Response('No Item Id Provided', { status: 400, statusText: 'No Item Id Provided' })
  }

  try {
    const response = await executeQuery('DELETE FROM applianceItems WHERE id = ? AND ownerid = ?', [params.id, ownerId]);
    console.log('deleted')
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}

export const PUT = async (request: NextRequest, params: any, response: NextResponse) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }


  try {
    const {
      id,
      applianceid,
      ownerid,
      quantity,
      expiryDate,
      comment,
      cookedFromFrozen
    } = await request.json();

    console.log(
      'ID',
      id,
      'appliance id',
      applianceid,
      'owner id',
      ownerid,
      'quantity',
      quantity,
      'exp date',
      expiryDate,
      'comment',
      comment,
      'cookedfromfrozen',
      cookedFromFrozen)

    if (!id || !applianceid || !ownerid) {
      return new Response('An Id is missing', { status: 400, statusText: 'An ID is missing' })
    }

    if (!quantity) {
      return new Response('Quantity is missing', { status: 400, statusText: 'Quantity is missing' })

    }

    // SQL query with parameterized values
    const query = `UPDATE applianceItems SET quantity = ?, cookedFromFrozen=?, expiryDate = ?, comment = ? WHERE id = ? AND ownerid = ? AND applianceid = ?`;
    const queryResponse = await executeQuery(query, [
      quantity,
      cookedFromFrozen,
      expiryDate,
      comment,
      id,
      ownerid,
      applianceid,
    ]);

    console.log('RESPONSE', queryResponse);

    // Return success response
    return new Response('', { status: 200, statusText: 'Success' });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }), { status: 500 });
  }
};