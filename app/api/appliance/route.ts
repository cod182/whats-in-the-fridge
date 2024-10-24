// import { NextRequest, NextResponse } from 'next/server';

// import { authOptions } from '@/utilities/authOptions';
// import { executeQuery } from '@/lib/db';
// import { getServerSession } from 'next-auth/next';
// import { headers } from "next/headers";

// export const GET = async (req: any, params: any, res: any) => {

//   // API Protection
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     // Not Signed in
//     return NextResponse.json({ error: "You must be logged in': ", status: 401 })
//   }


//   const query = "SELECT * FROM appliances WHERE ownerid=?"

//   try {
//     const response = await executeQuery(query, [session.user.id]);
//     return NextResponse.json(response);
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message });

//   }
// }

import { NextRequest, NextResponse } from 'next/server';

import { RowDataPacket } from 'mysql2/promise';
import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { headers } from "next/headers";

export const GET = async (req: any, params: any, res: any) => {
  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in", status: 401 });
  }

  // Query to get appliances
  const appliancesQuery = "SELECT * FROM appliances WHERE ownerid=?";

  try {
    // Fetch appliances for the current user
    const appliances = await executeQuery(appliancesQuery, [session.user.id]) as RowDataPacket[];

    if (!Array.isArray(appliances) || appliances.length === 0) {
      return NextResponse.json({ appliances: [], message: "No appliances found" });
    }

    // Get all appliance ids for the sharing query
    const applianceIds = appliances.map((appliance: RowDataPacket) => appliance.id);

    // Query to get sharing info based on appliance ids
    const sharingQuery = `SELECT * FROM sharing WHERE applianceId IN (?)`;
    const sharedData = await executeQuery(sharingQuery, [applianceIds]) as RowDataPacket[];


    if (!Array.isArray(sharedData)) {
      return NextResponse.json({ message: "Error retrieving shared data" });
    }

    // Map shared data to appliances
    const appliancesWithSharing = appliances.map((appliance: RowDataPacket) => {
      // Filter shared data for the current appliance
      const sharedForAppliance = sharedData.filter((share: any) => share.applianceId === appliance.id);

      // Attach shared data to appliance object
      appliance.sharedWith = sharedForAppliance.map((share: any) => ({
        email: share.email,
        accepted: share.accepted
      }));

      return appliance;
    });

    // Return the appliances with sharing info
    return NextResponse.json(appliancesWithSharing);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};



export const DELETE = async (req: any, params: any, res: any) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  const headersList = headers();
  const query = headersList.get("query-header");
  if (!query) {
    return NextResponse.json({ message: 'No Query Provided' });
  }

  try {
    const response = await executeQuery(query);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}