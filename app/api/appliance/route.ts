import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { headers } from "next/headers";

export const GET = async (req: any, params: any, res: any) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  // const headersList = headers();
  // const query = headersList.get("query-header");

  // if (!query) {
  //   return NextResponse.json({ message: 'No Query Provided' });
  // }

  const query = "SELECT * FROM appliances WHERE ownerid=?"

  try {
    const response = await executeQuery(query, [session.user.id]);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}


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