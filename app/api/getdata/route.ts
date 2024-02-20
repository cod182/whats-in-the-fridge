import { NextRequest, NextResponse } from 'next/server';

import { executeQuery } from '@/lib/db';
import { headers } from "next/headers";

export const GET = async (req: any, params: any, res: any) => {

  const headersList = headers();
  const query = headersList.get("query-header");


  try {
    const response = await executeQuery(query);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}