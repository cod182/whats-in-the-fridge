import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

export const GET = async (req: NextRequest, params: any) => {
	// API Protection
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "You must be logged in", status: 401 });
	}

	if (!params.params.id) {
		return NextResponse.json({ message: 'No appliance Id provided' });
	}

	// SQL queries
	const applianceQuery = "SELECT * FROM appliances WHERE id=?";


	try {
		// Fetch the appliance
		const appliance = await executeQuery(applianceQuery, [params.params.id]) as RowDataPacket[];

		// Check if the appliance exists
		if (!appliance || appliance.length === 0) {
			return NextResponse.json({ message: 'Shared Appliance not found or unauthorized access' });
		}

		// Return the result
		return NextResponse.json(appliance);
	} catch (error: any) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
};