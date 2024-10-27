import { NextRequest, NextResponse } from "next/server";

import { OkPacket } from "mysql2";
import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export const GET = async (req: NextRequest) => {
	// API Protection: Check if the user is authenticated
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "You must be logged in", status: 401 });
	}

	const query = `SELECT * FROM sharing WHERE email=?`;

	try {
		const response = await executeQuery(query, [session.user.email]);
		// console.log(response);
		return NextResponse.json(response);
	} catch (error: any) {
		return NextResponse.json({ message: error.message });

	}
};
