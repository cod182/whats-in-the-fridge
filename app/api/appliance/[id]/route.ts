import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

export const GET = async (req: NextRequest, params: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  if (!params.params.id) {
    return NextResponse.json({ message: 'No appliance Id provided' });
  }

  // SQL queries
  const applianceQuery = "SELECT * FROM appliances WHERE ownerid=? AND id=?";
  const sharingQuery = "SELECT * FROM sharing WHERE applianceId=?";

  try {
    // Fetch the appliance
    const appliance = await executeQuery(applianceQuery, [session.user.id, params.params.id]) as RowDataPacket[];

    // Check if the appliance exists
    if (!appliance || appliance.length === 0) {
      return NextResponse.json({ message: 'Appliance not found or unauthorized access' });
    }

    // Fetch the sharing information for the appliance
    const sharingData = await executeQuery(sharingQuery, [params.params.id]) as RowDataPacket[];

    // Combine appliance data with the sharing information
    const applianceWithSharing = {
      ...appliance[0], // Assuming appliance is a single result, we take the first item
      sharedWith: sharingData.map((share: any) => ({
        id: share.id,
        applianceId: share.applianceId,
        email: share.email,
        accepted: share.accepted,
      })),
    };

    // Return the combined result
    return NextResponse.json(applianceWithSharing);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};


export const DELETE = async (req: any, { params }: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  if (!params.id) {
    return NextResponse.json({ message: 'No appliance Id provided' });
  }

  // SQL queries for deleting appliance and sharing records
  const deleteApplianceQuery = 'DELETE FROM appliances WHERE id=? AND ownerid=?';
  const deleteSharingQuery = 'DELETE FROM sharing WHERE applianceId=?';

  try {
    // Delete records from sharing table
    await executeQuery(deleteSharingQuery, [params.id]);

    // Delete the appliance itself
    const response = await executeQuery(deleteApplianceQuery, [params.id, session.user.id]) as ResultSetHeader;

    // Check the affectedRows property
    if (response.affectedRows > 0) {
      return NextResponse.json({ message: 'Appliance and related sharing records deleted successfully' });
    } else {
      return NextResponse.json({ message: 'Invalid appliance ID or unauthorized access' });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};




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
