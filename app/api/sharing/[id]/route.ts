import { NextRequest, NextResponse } from "next/server";

import { OkPacket } from "mysql2";
import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";

type RouteContext = {
	params: Promise<{ id: string }>;
};

const getErrorMessage = (error: unknown) => {
	return error instanceof Error ? error.message : 'Internal Server Error';
};

export const DELETE = async (req: NextRequest, context: RouteContext) => {
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

	// Parse the request body to get the email
	const { email } = await req.json(); // Extract the email from the body
	if (!email) {
		return NextResponse.json({ message: "No email provided", status: 400 });
	}

	const deleteSharingQuery = "DELETE FROM sharing WHERE applianceid=? AND email=?";

	try {
		// Execute the deletion query and explicitly cast the result to OkPacket
		const response = await executeQuery<OkPacket>(deleteSharingQuery, [paramsId, email]);

		// Check affectedRows to see if a record was deleted
		if (response.affectedRows > 0) {
			return NextResponse.json({
				message: "Appliance and related sharing records deleted successfully",
				status: 200,
			});
		} else {
			return NextResponse.json({
				message: "Invalid appliance ID or unauthorized access",
				status: 404,
			});
		}
	} catch (error: unknown) {
		return NextResponse.json({ message: getErrorMessage(error), status: 500 });
	}
};


