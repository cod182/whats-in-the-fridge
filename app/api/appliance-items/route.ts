import { NextRequest, NextResponse } from 'next/server';

import { NextApiRequest } from 'next';
import { executeQuery } from '@/lib/db';
import { getSession } from 'next-auth/react';
import { headers } from "next/headers";

export const GET = async (req: NextApiRequest, params: any, res: any) => {


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

