import { NextRequest, NextResponse } from "next/server";

import { OkPacket } from "mysql2";
import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";

interface Params {
	id: string;   // Appliance ID
}

export const DELETE = async (req: NextRequest, { params }: { params: Params }) => {
	// API Protection: Check if the user is authenticated
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "You must be logged in", status: 401 });
	}

	// Check if appliance ID is provided
	if (!params.id) {
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
		const response = await executeQuery<OkPacket>(deleteSharingQuery, [params.id, email]);

		// Check the affectedRows to see if any record was deleted
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
	} catch (error: any) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
};


