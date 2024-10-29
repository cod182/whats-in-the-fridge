import { NextRequest, NextResponse } from 'next/server';

import { NextApiRequest } from 'next';
import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export const GET = async (req: NextApiRequest, params: any, res: any) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }

  const query = 'SELECT * FROM applianceItems WHERE ownerid=?'

  try {
    const response = await executeQuery(query, [session.user.id]);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}

