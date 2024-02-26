import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest } from "next";
import { executeQuery } from "@/lib/db";
import { getSession } from "next-auth/react";
import { headers } from "next/headers";

export const DELETE = async (req: any, { params }: any, res: any) => {
  const headersList = headers();
  const ownerId = headersList.get("ownerId");


  if (!ownerId) {
    return NextResponse.json({ message: 'No ownerId Provided' });
  }

  if (!params.id) {
    return NextResponse.json({ message: 'No item Id provided' });
  }

  try {
    const response = await executeQuery(`DELETE FROM applianceItems WHERE id=${params.id} AND ownerid=${ownerId}`);
    console.log('deleted')
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });

  }
}