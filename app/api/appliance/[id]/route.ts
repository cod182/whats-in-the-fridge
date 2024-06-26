import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { OkPacket, ResultSetHeader } from "mysql2";

import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

export const GET = async (req: any, params: any, res: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  if (!params.params.id) {
    return NextResponse.json({ message: 'No item Id provided' });
  }
  const query = "SELECT * FROM appliances WHERE ownerid=? AND id=?"
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

  if (!params.id) {
    return NextResponse.json({ message: 'No appliance Id provided' });
  }

  try {

    const query = 'DELETE FROM appliances WHERE id=? AND ownerid=?'

    const response = await executeQuery(query, [params.id, session.user.id]) as ResultSetHeader;

    if (response && response?.affectedRows && response?.affectedRows > 0) {
      console.log('THE RESPONSE', response);
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ message: 'Invalid appliance ID or unauthorized access' });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}


export const PUT = async (request: NextRequest, params: any, response: NextResponse) => {
  try {
    const { newName, userId } = await request.json();

    if (!params.params.id) {
      return new Response('An appliance id is missing', { status: 400, statusText: 'An appliance id is missing' });
    }

    if (!newName) {
      return new Response('A new appliance name is missing', { status: 400, statusText: 'A new appliance name is missing' });
    }

    if (!userId) {
      return new Response('Owner id is missing', { status: 400, statusText: 'Owner id is missing' });
    }

    // SQL query with parameterized values
    const query = `UPDATE appliances SET name = ? WHERE id = ? AND ownerid = ?`;
    const queryResponse = await executeQuery(query, [
      newName,
      params.params.id,
      userId
    ]);

    console.log('RESPONSE', queryResponse);

    // Return success response
    return new Response('', { status: 200, statusText: 'Success: Appliance Renamed' });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error, Please try again', message: error.message }), { status: 500 });
  }
};
