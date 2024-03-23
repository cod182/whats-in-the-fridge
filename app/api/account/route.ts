import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { executeQuery } from '@/lib/db';
import { headers } from 'next/headers';

export const DELETE = async (req: NextApiRequest, params: any, res: NextApiResponse) => {
  const headersList = headers();
  const id = headersList.get("userId");
  const email = headersList.get("userEmail");

  const query = 'DELETE FROM user WHERE id=? AND email=?';
  const values = [id, email];

  try {
    const response = await executeQuery(query, values);
    console.log('User deleted successfully.');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Error deleting user.', { status: 500 }); // Return an error response
  }
};