import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth";

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
      creatorId,
      name,
      itemType,
      itemMainType,
      itemSubType,
      image
    } = await request.json();

    if (!id || !creatorId) {
      return new Response('An Id is missing', { status: 400, statusText: 'An ID is missing' })
    }

    // SQL query with parameterized values
    const query = `UPDATE customAvailableItems SET name = ?, itemType=?, itemMainType = ?, itemSubType = ?, image = ? WHERE id = ? AND creatorId = ?`;

    const queryResponse = await executeQuery(query, [
      name,
      itemType,
      itemMainType,
      itemSubType,
      image,
      id,
      creatorId,
    ]);


    // Return success response
    return new Response('', { status: 200, statusText: 'Success' });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }), { status: 500 });
  }
};

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
    const query = 'DELETE FROM customAvailableItems WHERE id = ? AND creatorId = ?';

    const response = await executeQuery(query, [params.id, session.user.id]);
    console.log('deleted')
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}