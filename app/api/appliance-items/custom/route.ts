import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { headers } from "next/headers";

export const GET = async (req: NextApiRequest, params: any, res: NextResponse) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }
  console.log(session);
  // const headersList = headers();
  // const query = headersList.get("query-header");
  // if (!query) {
  //   return NextResponse.json({ message: 'No Query Provided' });
  // }
  try {
    let query = `SELECT * FROM customAvailableItems WHERE creatorId=${session.user.id}`
    const response = await executeQuery(query);
    console.log(response)
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}

