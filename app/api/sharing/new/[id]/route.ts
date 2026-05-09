import { NextRequest, NextResponse } from "next/server";

import { OkPacket } from "mysql2";
import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";

interface Params {
	id: string;   // Appliance ID
}

type RouteContext = {
	params: Promise<Params>;
};

const getErrorMessage = (error: unknown) => {
	return error instanceof Error ? error.message : 'Internal Server Error';
};

export const POST = async (req: NextRequest, context: RouteContext) => {
	const { params } = context;
	// API Protection: Check if the user is authenticated
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "You must be logged in", status: 401 });
	}
	const { id: paramsId } = await params;

	// Check if appliance ID is provided
	if (!paramsId) {
		return NextResponse.json({ message: "No appliance ID provided", status: 400 });
	}


	// Parse the request body and ensure email is a string
	const body = await req.json();
	const { email, applianceName } = body;

	if (!email) {
		return NextResponse.json({ message: "No email provided", status: 400 });
	}

	const insertSharingQuery = "INSERT INTO sharing (applianceId, email, accepted, ownerEmail, ownerName, ownerId, applianceName) VALUES (?, ?, ?,?,?,?,?)";


	try {
		// Execute the INSERT query and explicitly cast the result to OkPacket
		const response = await executeQuery<OkPacket>(insertSharingQuery, [paramsId, email, 'false', session.user.email, session.user.name, session.user.id, applianceName]);

		// Check affectedRows to see if a record was inserted
		if (response.affectedRows > 0) {
			return NextResponse.json({
				message: "Sharing record created successfully",
				status: 200,
			});
		} else {
			return NextResponse.json({
				message: "Failed to create sharing record",
				status: 404,
			});
		}
	} catch (error: unknown) {
		return NextResponse.json({ message: getErrorMessage(error), status: 500 });
	}
};
