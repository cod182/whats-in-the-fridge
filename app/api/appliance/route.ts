import { NextRequest, NextResponse } from 'next/server';

import { RowDataPacket } from 'mysql2/promise';
import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { headers } from "next/headers";



const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'Internal Server Error';
};

type SharedApplianceRow = RowDataPacket & {
  sharedFrom: {
    ownerName: string;
    ownerId: number;
  };
  sharedWith?: Array<{
    id: number;
    applianceId: number;
    email: string;
    accepted: string | boolean;
  }>;
};

export const GET = async (req: NextRequest) => {
  // API Protection: Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  // Queries
  const appliancesQuery = "SELECT * FROM appliances WHERE ownerid = ?";
  const sharedAppliancesQuery = 'SELECT * FROM sharing WHERE email IN (?)';
  const sharingQuery = 'SELECT * FROM appliances WHERE id IN (?)';

  try {
    //  Fetch appliances for the current user
    const appliances = await executeQuery<RowDataPacket[]>(appliancesQuery, [session.user.id]);

    // Fetch Shares for the current user
    const sharedAppliances = await executeQuery<RowDataPacket[]>(sharedAppliancesQuery, [session.user.email]);

    // Return no appliances if there are no results
    if (!Array.isArray(appliances) || appliances.length === 0) {
      return NextResponse.json({ appliances: [], message: "No appliances found" });
    }

    // Get all appliance ids for the sharing query
    const applianceIds = sharedAppliances.map((appliance) => appliance.applianceId);

    // Fetch shared appliance data
    let sharedData: SharedApplianceRow[] = [];
    if (applianceIds.length > 0) {
      sharedData = (await executeQuery<RowDataPacket[]>(sharingQuery, [applianceIds])) as SharedApplianceRow[];
    }

    // Attach the correct sharedFrom object to each sharedData item
    sharedData = sharedData.map((data) => {
      // Find the corresponding appliance in sharedAppliances
      const correspondingAppliance = sharedAppliances.find(
        (appliance) => appliance.applianceId === data.id
      );

      // Attach the sharedFrom object with the correct ownerName
      return {
        ...data,
        sharedFrom: {
          ownerName: correspondingAppliance ? correspondingAppliance.ownerName : 'Unknown Owner',
          ownerId: correspondingAppliance ? correspondingAppliance.ownerId : 0,
        },
      };
    });


    // Map shared data to appliances
    const appliancesWithSharing = appliances.map((appliance: RowDataPacket) => {
      // Filter shared data for the current appliance
      const sharedForAppliance = sharedData.filter((share) => share.applianceId === appliance.id);

      // Attach shared data to appliance object
      appliance.sharedWith = sharedForAppliance.map((share) => ({
        id: share.id,
        applianceId: share.applianceId,
        email: share.email,
        accepted: share.accepted
      }));

      return appliance;
    });

    const mergedArray = appliancesWithSharing.concat(sharedData);

    // Return the appliances with sharing info
    return NextResponse.json(mergedArray);
  } catch (error: unknown) {
    return NextResponse.json({ message: getErrorMessage(error) });
  }
};



export const DELETE = async (request: NextRequest) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  // Get headers, expecting an appliance id from the request
  const headersList = await headers();
  const applianceId = headersList.get("appliance-id");
  if (!applianceId) {
    return NextResponse.json({ message: 'No Appliance ID Provided' });
  }

  // SQL query to delete appliance and associated sharing records
  const deleteApplianceQuery = `DELETE FROM appliances WHERE id = ? AND ownerid = ?`;
  const deleteSharingQuery = `DELETE FROM sharing WHERE applianceid = ?`;

  try {

    // Delete from the sharing table where applianceid matches
    await executeQuery(deleteSharingQuery, [applianceId]);

    // Delete the appliance itself
    const deleteResponse = await executeQuery(deleteApplianceQuery, [applianceId, session.user.id]);


    return NextResponse.json({ message: 'Appliance and related sharing records deleted successfully', status: 200 });
  } catch (error: unknown) {
    // Rollback transaction in case of an error
    await executeQuery('ROLLBACK');
    return NextResponse.json({ message: getErrorMessage(error), status: 500 });
  }
};