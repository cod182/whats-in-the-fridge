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

type Params = {
	id: string;
}
export const DELETE = async (req: NextRequest) => {
	// API Protection: Check if the user is authenticated
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "You must be logged in", status: 401 });
	}

	// Parse the request body and ensure email is a string
	const body = await req.json();
	const { id } = body;

	const deleteSharingQuery = "DELETE FROM sharing WHERE id=? AND email=?";

	try {
		// Execute the deletion query and explicitly cast the result to OkPacket
		const response = await executeQuery<OkPacket>(deleteSharingQuery, [id, session.user.email]);

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




export const PUT = async (req: NextRequest) => {
	// API Protection: Check if the user is authenticated
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: 'You must be logged in', status: 401 });
	}

	// Parse the request body and ensure email is a string
	const body = await req.json();
	const { id } = body;

	const updateSharing = 'UPDATE sharing SET accepted = ? WHERE id = ? AND email = ?';

	try {
		// Execute the update query and explicitly cast the result to OkPacket
		const response = await executeQuery<OkPacket>(updateSharing, ['true', id, session.user.email]);

		// Check the affectedRows to see if any record was updated
		if (response.affectedRows > 0) {
			return NextResponse.json({
				message: 'Sharing invite updated successfully',
				status: 200,
			});
		} else {
			return NextResponse.json({
				message: "Couldn't update sharing invite",
				status: 404,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
};
