import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { headers } from 'next/headers';

export const DELETE = async (req: NextApiRequest, params: any, res: NextApiResponse) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }


  const headersList = headers();
  const id = headersList.get("userId");
  const email = headersList.get("userEmail");

  const query = 'DELETE FROM user WHERE id=? AND email=?';
  const values = [id, session.user.email];

  try {
    const response = await executeQuery(query, values);
    console.log('User deleted successfully.');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Error deleting user.', { status: 500 }); // Return an error response
  }
};