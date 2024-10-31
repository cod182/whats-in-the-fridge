import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export const GET = async (req: NextRequest, { params }: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  const { id: paramId } = await params;

  if (!paramId) {
    return NextResponse.json({ message: 'No appliance Id provided' });
  }

  // SQL queries
  const applianceQuery = "SELECT * FROM appliances WHERE ownerid=? AND id=?";
  const sharingQuery = "SELECT * FROM sharing WHERE applianceId=?";

  try {
    // Fetch the appliance
    const appliance = await executeQuery(applianceQuery, [session.user.id, paramId]) as RowDataPacket[];

    // Check if the appliance exists
    if (!appliance || appliance.length === 0) {
      return NextResponse.json({ message: 'Appliance not found or unauthorized access', status: 401 });
    }

    // Fetch the sharing information for the appliance
    const sharingData = await executeQuery(sharingQuery, [paramId]) as RowDataPacket[];

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
    return NextResponse.json(applianceWithSharing, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};


export const DELETE = async (req: any, { params }: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'No appliance Id provided' });
  }

  // SQL queries for deleting appliance and sharing records
  const deleteApplianceQuery = 'DELETE FROM appliances WHERE id=? AND ownerid=?';
  const deleteSharingQuery = 'DELETE FROM sharing WHERE applianceId=?';

  try {
    // Delete records from sharing table
    await executeQuery(deleteSharingQuery, [id]);

    // Delete the appliance itself
    const response = await executeQuery(deleteApplianceQuery, [id, session.user.id]) as ResultSetHeader;

    // Check the affectedRows property
    if (response.affectedRows > 0) {
      return NextResponse.json({ message: 'Appliance and related sharing records deleted successfully', status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid appliance ID or unauthorized access', status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
};




export const PUT = async (request: NextRequest, { params }: any, response: NextResponse) => {
  const { id: paramId } = await params;
  try {
    const { newName, userId } = await request.json();

    if (!paramId) {
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
      paramId,
      userId
    ]);


    // Return success response
    return new Response('', { status: 200, statusText: 'Success: Appliance Renamed' });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error, Please try again', message: error.message }), { status: 500 });
  }
};
