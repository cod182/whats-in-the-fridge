import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { headers } from 'next/headers';

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'Internal Server Error';
};

export const GET = async (request: NextRequest) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  const headersList = await headers();
  const query = headersList.get("query-header");

  if (!query) {
    try {
      const response = await executeQuery(`SELECT * FROM availableItems`);
      return NextResponse.json(response);
    } catch (error: unknown) {
      return NextResponse.json({ message: getErrorMessage(error) });
    }
  } else {
    try {
      const response = await executeQuery(query);
      return NextResponse.json(response);
    } catch (error: unknown) {
      return NextResponse.json({ message: getErrorMessage(error) });
    }
  }


}

