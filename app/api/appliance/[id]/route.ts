import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { executeQuery } from "@/lib/db";
import { headers } from "next/headers";

export const DELETE = async (req: any, { params }: any, res: any) => {
  const headersList = headers();
  const ownerId = headersList.get("ownerId");


  if (!ownerId) {
    return NextResponse.json({ message: 'No ownerId Provided' });
  }

  if (!params.id) {
    return NextResponse.json({ message: 'No item Id provided' });
  }

  try {
    const response = await executeQuery(`DELETE FROM appliances WHERE id=${params.id} AND ownerid=${ownerId}`);
    console.log('deleted')
    return NextResponse.json(response);
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
