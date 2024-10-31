import { NextRequest, NextResponse } from 'next/server';

import { NextApiRequest } from 'next';
import { RowDataPacket } from 'mysql2';
import { authOptions } from '@/utilities/authOptions';
import { checkUserAuthorised } from '@/utilities/functions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export const GET = async (req: NextRequest, params: any, res: any) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }
  // Get all appliances that are shared to the user (const sharedAppliances = await executeQuery('SELECT * FROM sharing WHERE sharedUserId=?', [session.user.id]))
  // IF sharedAppliances.length < 1, Get all items in the applianceItems table that have the owner id(const ownedItems = await executeQuery(ownedItemsQuery, [session.user.id])) 
  // Return the ownedItems (return NextResponse.json(ownedItems);)

  // IF sharedAppliances.length > 1, create an Array (const allApplianceItems = await executeQuery(SELECT * FROM applianceItems))

  // Then filter the array of allApplianceItems, creating a new array: allOwnedAndSharedItems. Return all items that match. Must either have the ownerif of the session.user.id or have the applianceid of once of the objects in the sharedAppliance array( e.g sharedAppliance[0].applianceId)
  //Return the allOwnedAndSharedItems
  const userId = session.user.id;


  try {
    // const ownedItemsQuery = 'SELECT * FROM applianceItems WHERE ownerid=?'
    // const ownedItems = await executeQuery(ownedItemsQuery, [session.user.id]);

    // return NextResponse.json(ownedItems);

    // Query to get all appliances shared with the user
    const sharedAppliancesQuery = 'SELECT * FROM sharing WHERE sharedUserId = ?';
    const sharedAppliances = await executeQuery(sharedAppliancesQuery, [userId]) as RowDataPacket[];
    // Get all the users items

    const ownedItemsQuery = 'SELECT * FROM applianceItems WHERE ownerId = ?';
    const ownedItems = await executeQuery(ownedItemsQuery, [userId]) as RowDataPacket[];

    // If no shared appliances, get all items owned by the user
    if (sharedAppliances.length < 0) {
      console.log('NO APPLIANCES HAVE BEEN SHARED')
      return NextResponse.json({ ownedItems, status: 200 });
    }


    console.log('APPLIANCES HAVE BEEN SHARED')
    // If there are shared appliances, get all items and filter them
    const allItemsQuery = 'SELECT * FROM applianceItems';
    const allApplianceItems = await executeQuery(allItemsQuery) as RowDataPacket[];

    // Filter for items either owned by the user or shared with them
    const allOwnedAndSharedItems = allApplianceItems.filter((item) =>
      sharedAppliances.some((shared) => shared.applianceId === item.applianceid)
    );

    const allItems = allOwnedAndSharedItems.concat(ownedItems);

    return NextResponse.json(allItems);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}

