import { NextRequest, NextResponse } from 'next/server';

import { NextApiRequest } from 'next';
import { executeQuery } from '@/lib/db';

export const GET = async (req: NextApiRequest, params: any, res: any) => {
  try {
    const response = await executeQuery(`SELECT * FROM availableItems`);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}

