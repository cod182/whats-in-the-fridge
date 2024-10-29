import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

import { Appliance } from '@/components';
import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

const hasMatchingSharedUserId = (applianceWithSharing: appliance, userId: string) => {
	return applianceWithSharing!.sharedWith?.some((shared: ShareProps) => shared.sharedUserId === parseInt(userId));
};

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
	const sharingQuery = "SELECT * FROM sharing WHERE applianceId=?";

	try {
		// Fetch the appliance
		const appliance = await executeQuery(applianceQuery, [params.params.id]) as RowDataPacket[];

		// Check if the appliance exists
		if (!appliance || appliance.length === 0) {
			return NextResponse.json({ message: 'Appliance not found or unauthorized access' });
		}

		// Fetch the sharing information for the appliance
		const sharingData = await executeQuery(sharingQuery, [params.params.id]) as RowDataPacket[];

		// Combine appliance data with the sharing information
		const applianceWithSharing: appliance = {
			id: appliance[0].id,
			ownerid: appliance[0].ownerid,
			name: appliance[0].name,
			type: appliance[0].type,
			sharedWith: sharingData.map((share: RowDataPacket) => ({
				id: share.id,
				applianceId: share.applianceId,
				email: share.email,
				sharedUserId: share.sharedUserId,
				accepted: share.accepted,
				ownerEmail: share.ownerEmail,
				ownerName: share.ownerName,
				ownerId: share.ownerName,
				applianceName: share.applianceName,
			})),
		};

		// Call to function to check if user is authorized for the appliance
		const isSharedWithUser = hasMatchingSharedUserId(applianceWithSharing, session.user.id);

		if (isSharedWithUser) {
			// Return the appliance
			const applianceWithSharedFrom = {
				...appliance[0],
				sharedFrom: { ownerName: applianceWithSharing.sharedWith![0].ownerName },
			};
			return NextResponse.json(applianceWithSharedFrom);
		} else {
			// User not authorised
			return NextResponse.json({ message: 'User not authorized', status: 401 });
		}

		// Return the combined result
	} catch (error: any) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
};