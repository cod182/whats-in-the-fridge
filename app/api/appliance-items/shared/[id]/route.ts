import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import { NextApiRequest } from "next";
import { authOptions } from "@/utilities/authOptions";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

const checkUserAuthorised = async (applianceId: string, id: string) => {
	try {
		// Query to get all the users who have shared the appliance
		const sharingQuery = "SELECT * FROM sharing WHERE applianceId=?";
		const sharingResponse = await executeQuery(sharingQuery, [applianceId]) as RowDataPacket[];


		const isUserShared = sharingResponse.some(
			(record) => {
				return record.sharedUserId === parseInt(id);
			}
		);

		return isUserShared;

	} catch (error) {
		return false;
	}


}

export const GET = async (req: NextApiRequest, { params }: { params: { id: string } }, res: any) => {

	// API Protection
	const session = await getServerSession(authOptions);
	if (!session) {
		// Not Signed in
		return NextResponse.json({ error: "You must be logged in': ", status: 401 })
	}

	if (!params.id) {
		return NextResponse.json({ message: 'No appliance Id provided', status: 403 });
	}

	// Query to get all the items associated withe the applianceid
	const itemsQuery = 'SELECT * FROM applianceItems WHERE applianceid=?'


	try {

		// Check if session.user.id exists in the sharingResponse
		const isUserShared = await checkUserAuthorised(params.id, session.user.id);

		if (!isUserShared) {
			// Return an error if session.user.id does not exist in the sharingResponse

			return NextResponse.json({ message: 'User Not Authorised', status: 401 });
		}

		// session.user.id exists in the sharingResponse
		const itemsResponse = await executeQuery(itemsQuery, [params.id]);

		return NextResponse.json(itemsResponse, { status: 200 });

	} catch (error: any) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
}



export const DELETE = async (req: any, { params }: any, res: any) => {
	// API Protection
	const session = await getServerSession(authOptions);
	if (!session) {
		// Not Signed in
		return NextResponse.json({ error: "You must be logged in': ", status: 401 })
	}
	const { applianceId, ownerId } = await req.json(); // Extract the appliance and from the body

	if (!params.id || params.id === 'undefined') {
		return NextResponse.json({ message: 'Not Item ID Provided', status: 400 });
		// return new Response('No Item Id Provided', { status: 400, statusText: 'No Item Id Provided' })
	}

	try {

		// Check if session.user.id exists in the sharingResponse
		const isUserShared = await checkUserAuthorised(applianceId, session.user.id);

		if (!isUserShared) {
			// Return an error if session.user.id does not exist in the sharingResponse
			return NextResponse.json({ message: 'User Not Authorised', status: 401 });
		}

		const response = await executeQuery('DELETE FROM applianceItems WHERE id = ?', [params.id]) as ResultSetHeader;

		if (response.affectedRows > 0) {
			console.log('Item Has been deleted', response)
			return NextResponse.json({ response, status: 200 });
		} else {
			return NextResponse.json({ message: 'Invalid item ID or unauthorized access', status: 401 });
		}
		return NextResponse.json({ message: 'unauthorized access', status: 401 });



	} catch (error: any) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
}



export const PUT = async (request: NextRequest, { params }: any, response: NextResponse) => {
	// API Protection
	const session = await getServerSession(authOptions);
	if (!session) {
		// Not Signed in
		return NextResponse.json({ message: "You must be logged in': ", status: 401 })
	}


	const headersList = headers();
	const typeOfUpdate = headersList.get("update-type");

	if (typeOfUpdate === 'move') {
		try {

			// Parse the body as JSON
			const body = await request.json();
			const { updatedItem } = body;
			const {
				compartment,
				level,
				locationType,
				position,
				id,
				ownerid,
				applianceid
			} = updatedItem;

			// Check if session.user.id exists in the sharingResponse
			const isUserShared = await checkUserAuthorised(applianceid, session.user.id);

			if (!isUserShared) {
				// Return an error if session.user.id does not exist in the sharingResponse

				return NextResponse.json({ message: 'User Not Authorised', status: 401 });
			}

			// SQL query with parameterized values
			const query = `UPDATE applianceItems SET compartment=?, level=?, locationType=?, position=? WHERE id=? AND ownerid=? AND applianceid=?`;

			const queryResponse = await executeQuery(query, [compartment, level, locationType, position, params.id, session.user.id, applianceid]) as ResultSetHeader;


			if (queryResponse.affectedRows > 0) {
				// Return success response
				// return new NextResponse('', { status: 200, statusText: 'Item Moved' });
				return NextResponse.json({ message: "Item Moved': ", status: 200 })
			} else {
				// return new NextResponse('', { status: 404, statusText: 'Failed to Move item' });
				return NextResponse.json({ message: "Failed to Move item': ", status: 400 })

			}

		} catch (error: any) {
			console.error(error);
			// return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));
			return NextResponse.json({ message: error.message, status: 500 })

		}
	}

	// UPDATING ITEM DETAILS

	if (typeOfUpdate === 'update') {
		try {

			// Parse the body as JSON
			const body = await request.json();
			const { updatedItem } = body;

			const {
				id,
				applianceid,
				ownerid,
				name,
				itemType,
				itemMainType,
				itemSubType,
				quantity,
				expiryDate,
				comment,
				cookedFromFrozen
			} = updatedItem

			// Check if session.user.id exists in the sharingResponse
			const isUserShared = await checkUserAuthorised(applianceid, session.user.id);

			if (!isUserShared) {
				// Return an error if session.user.id does not exist in the sharingResponse

				return NextResponse.json({ message: 'User Not Authorised', status: 401 });
			}

			if (id != params.id) {
				// return new Response('Item ID Doesnt Match', { status: 400, statusText: 'Item ID Doesnt Match' })
				return NextResponse.json({ message: 'Item ID Doesnt Match', status: 400 })
			}


			if (!quantity) {
				// return new Response('Quantity is missing', { status: 400, statusText: 'Quantity is missing' })
				return NextResponse.json({ message: 'Quantity is missing', status: 400 })
			}

			// SQL query with parameterized values
			const query = `UPDATE applianceItems SET name=?, itemType=?, itemMainType=?, itemSubType=?, quantity=?, cookedFromFrozen=?, expiryDate=?, comment=? WHERE id=? AND applianceid=?`;

			const queryResponse = await executeQuery(query, [name, itemType, itemMainType, itemSubType, quantity, cookedFromFrozen, expiryDate, comment, params.id, applianceid]) as ResultSetHeader;


			if (queryResponse && queryResponse.affectedRows && queryResponse.affectedRows > 0) {
				// Return success response
				// return new NextResponse('', { status: 200, statusText: 'Success' });
				return NextResponse.json({ message: 'Success', status: 200 })

			} else {
				// return new NextResponse('', { status: 404, statusText: 'Failed to update item' });
				return NextResponse.json({ message: 'Failed to update Item', status: 400 })
			}

		} catch (error: any) {
			console.error(error);
			// return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));}
			return NextResponse.json({ message: error.message, status: 500 })
		}
	}

	// UPDATING ICON

	if (typeOfUpdate === 'iconUpdate') {
		try {

			// Parse the body as JSON
			const body = await request.json();
			const { updatedItem } = body;

			const {
				id,
				applianceid,
				ownerid,
				image
			} = updatedItem;


			// Check if session.user.id exists in the sharingResponse
			const isUserShared = await checkUserAuthorised(applianceid, session.user.id);

			if (!isUserShared) {
				// Return an error if session.user.id does not exist in the sharingResponse

				return NextResponse.json({ message: 'User Not Authorised', status: 401 });
			}

			// SQL query with parameterized values
			const query = `UPDATE applianceItems SET image=? WHERE id=? AND applianceid=?`;

			const queryResponse = await executeQuery(query, [image, params.id, session.user.id, applianceid]) as ResultSetHeader;


			if (queryResponse.affectedRows > 0) {
				// Return success response
				// return new NextResponse('', { status: 200, statusText: 'Success' });
				return NextResponse.json({ message: 'Success', status: 200 })

			} else {
				// return new NextResponse('', { status: 404, statusText: 'Failed to update image' });
				return NextResponse.json({ message: 'Failed to update Image', status: 400 })

			}

		} catch (error: any) {
			console.error(error);
			// return new Response(JSON.stringify({ status: 500, statusText: 'Internal Server Error', message: error.message }));
			return NextResponse.json({ message: error.message, status: 500 })

		}
	}
};

