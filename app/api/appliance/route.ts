import { NextRequest, NextResponse } from 'next/server';

import { executeQuery } from '@/lib/db';
import { headers } from "next/headers";

export const GET = async (req: any, params: any, res: any) => {

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


export const DELETE = async (req: any, params: any, res: any) => {

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