import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

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

  try {
    let query = `SELECT * FROM customAvailableItems WHERE creatorId=${session.user.id}`
    const response = await executeQuery(query);
    return NextResponse.json(response);
  } catch (error: unknown) {
    return NextResponse.json({ message: getErrorMessage(error) });

  }
}

