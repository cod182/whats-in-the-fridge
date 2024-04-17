import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export const POST = async (request: NextRequest, params: any, response: NextApiResponse) => {

  // API Protection
  const session = await getServerSession(authOptions);
  if (!session) {
    // Not Signed in
    return NextResponse.json({ error: "You must be logged in': ", status: 401 })
  }


  const { userId, applianceType, applianceName } = await request.json();

  if (!applianceName || !applianceType) {
    return new Response('Please provide both applianceName and applianceType', { status: 400, statusText: 'Please provide both the name and type' })
  }

  if (!userId) {
    return new Response('Error defining User Id', { status: 400, statusText: 'Error defining User Id' })
  }

  if (userId && applianceType && applianceName) {
    console.log('Sending Request')
    try {
      const queryResponse = await executeQuery(`INSERT INTO appliances (ownerid, type, name) VALUES('${userId}', '${applianceType}', '${applianceName}')`);
      // return Response.redirect(`${process.env.NEXT_URL}/profile/appliances`);
      return new Response('', { status: 200, statusText: 'Success' })

    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ status: 500, statusText: 'Internal Server Error', message: error.message, ok: false });
    }
  }
}

