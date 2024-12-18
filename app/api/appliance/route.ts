// // import { NextRequest, NextResponse } from 'next/server';

// // import { authOptions } from '@/utilities/authOptions';
// // import { executeQuery } from '@/lib/db';
// // import { getServerSession } from 'next-auth/next';
// // import { headers } from "next/headers";

// // export const GET = async (req: any, params: any, res: any) => {

// //   // API Protection
// //   const session = await getServerSession(authOptions);
// //   if (!session) {
// //     // Not Signed in
// //     return NextResponse.json({ error: "You must be logged in': ", status: 401 })
// //   }


// //   const query = "SELECT * FROM appliances WHERE ownerid=?"

// //   try {
// //     const response = await executeQuery(query, [session.user.id]);
// //     return NextResponse.json(response);
// //   } catch (error: any) {
// //     return NextResponse.json({ message: error.message });

// //   }
// // }

import { NextRequest, NextResponse } from 'next/server';

import { RowDataPacket } from 'mysql2/promise';
import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { headers } from "next/headers";

// export const GET = async (req: any, params: any, res: any) => {
//   // API Protection
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "You must be logged in", status: 401 });
//   }

//   // Query to get appliances
//   const appliancesQuery = "SELECT * FROM appliances WHERE ownerid=?";

//   const shares = 'SELECT * FROM sharing WHERE email=?';

//   const sharedAppliancesQUery = 'SELECT * FROM appliances WHERE id=?';

//   try {
//     // Fetch appliances for the current user
//     const appliances = await executeQuery(appliancesQuery, [session.user.id]) as RowDataPacket[];

//     if (!Array.isArray(appliances) || appliances.length === 0) {
//       return NextResponse.json({ appliances: [], message: "No appliances found" });
//     }

//     // Get all appliance ids for the sharing query
//     const applianceIds = appliances.map((appliance: RowDataPacket) => appliance.id);

//     // Query to get sharing info based on appliance ids
//     const sharingQuery = `SELECT * FROM sharing WHERE applianceId IN (?)`;
//     const sharedData = await executeQuery(sharingQuery, [applianceIds]) as RowDataPacket[];


//     if (!Array.isArray(sharedData)) {
//       return NextResponse.json({ message: "Error retrieving shared data" });
//     }

//     // Map shared data to appliances
//     const appliancesWithSharing = appliances.map((appliance: RowDataPacket) => {
//       // Filter shared data for the current appliance
//       const sharedForAppliance = sharedData.filter((share: any) => share.applianceId === appliance.id);

//       // Attach shared data to appliance object
//       appliance.sharedWith = sharedForAppliance.map((share: any) => ({
//         id: share.id,
//         applianceId: share.applianceId,
//         email: share.email,
//         accepted: share.accepted
//       }));

//       return appliance;
//     });

//     // Return the appliances with sharing info
//     return NextResponse.json(appliancesWithSharing);
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message });
//   }
// };



// export const DELETE = async (req: any, params: any, res: any) => {
//   // API Protection
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "You must be logged in", status: 401 });
//   }

//   // Get headers, expecting an appliance id from the request
//   const headersList = headers();
//   const applianceId = headersList.get("appliance-id");
//   if (!applianceId) {
//     return NextResponse.json({ message: 'No Appliance ID Provided' });
//   }

//   // SQL query to delete appliance and associated sharing records
//   const deleteApplianceQuery = `DELETE FROM appliances WHERE id = ? AND ownerid = ?`;
//   const deleteSharingQuery = `DELETE FROM sharing WHERE applianceid = ?`;

//   try {
//     // Start transaction to ensure both operations (deleting appliance and sharing records) are atomic
//     await executeQuery('START TRANSACTION');

//     // Delete from the sharing table where applianceid matches
//     await executeQuery(deleteSharingQuery, [applianceId]);

//     // Delete the appliance itself
//     const deleteResponse = await executeQuery(deleteApplianceQuery, [applianceId, session.user.id]);

//     // Commit transaction
//     await executeQuery('COMMIT');

//     return NextResponse.json({ message: 'Appliance and related sharing records deleted successfully' });
//   } catch (error: any) {
//     // Rollback transaction in case of an error
//     await executeQuery('ROLLBACK');
//     return NextResponse.json({ message: error.message });
//   }
// };



export const GET = async (req: any) => {
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
    let sharedData: any[] = [];
    if (applianceIds.length > 0) {
      sharedData = await executeQuery<RowDataPacket[]>(sharingQuery, [applianceIds]);
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
      const sharedForAppliance = sharedData.filter((share: any) => share.applianceId === appliance.id);

      // Attach shared data to appliance object
      appliance.sharedWith = sharedForAppliance.map((share: any) => ({
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
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};



export const DELETE = async (req: any, params: any, res: any) => {
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
  } catch (error: any) {
    // Rollback transaction in case of an error
    await executeQuery('ROLLBACK');
    return NextResponse.json({ message: error.message, status: 500 });
  }
};