import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest } from "next";
import { executeQuery } from "@/lib/db";
import { getSession } from "next-auth/react";
import { headers } from "next/headers";

export const DELETE = async (req: any, { params }: any, res: any) => {
  const headersList = headers();
  const ownerId = headersList.get("ownerId");

  console.log(params)
  if (!ownerId || ownerId === 'undefined') {
    return new Response('No Owner Id Provided', { status: 400, statusText: 'No Owner Id Provided' })
  }

  if (!params.id || params.id === 'undefined') {
    return new Response('No Item Id Provided', { status: 400, statusText: 'No Item Id Provided' })
  }

  try {
    const response = await executeQuery('DELETE FROM applianceItems WHERE id = ? AND ownerid = ?', [params.id, ownerId]);
    console.log('deleted')
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}