'use client'

import React, { useEffect, useState } from 'react'

import InviteCard from './InviteCard'
import { getSharingInvites } from '@/utilities/functions'

type Props = {
	email: string
}

const SharingInvites = ({ email }: Props) => {

	// States

	const [sharingInvites, setSharingInvites] = useState<ShareProps[]>()

	// Use Effects

	useEffect(() => {
		const getInvitesForSharing = async () => {
			const shares: ShareProps[] = await getSharingInvites();
			setSharingInvites(shares)
		};

		// Matches the type to type of appliance
		getInvitesForSharing();

	}, [email])


	// Functions

	type UpdatingShareProps = {
		newShareData: ShareProps,
		type: string
	}

	const updateShare = async (newShareData: ShareProps, type: string) => {
		let updatedShares = sharingInvites || []; // Fallback to an empty array if sharingInvites is undefined

		if (type === 'delete') {
			const choice = confirm('Are you sure you want to cancel this share?')
			if (choice) {
				// Filter out the share with the same id as shareUpdate
				updatedShares = sharingInvites?.filter((i) => i.id !== newShareData.id) || [];
			}
		}

		if (type === 'accept') {
			// Update the share with the same id as shareUpdate
			updatedShares = sharingInvites?.map((i) =>
				i.id === newShareData.id ? { ...i, accepted: 'true' } : i
			) || [];
		}

		// Update the sharingInvites state
		setSharingInvites(updatedShares);
	};


	// Returns

	if (!sharingInvites) return null

	return (
		<>
			<hr className='w-full border-t-gray-700 border-t-[1px] my-4' />
			<section>
				<h4 className='font-semibold font-gray-600 text-lg'>Sharing Area</h4>
				<div className='flex flex-row items-center justify-start gap-2'>
					{sharingInvites.map((share, index) => {
						return (
							<InviteCard key={index} sharedData={share} updateShare={updateShare} />
						)
					})}
				</div>

			</section>
		</>
	)
}

export default SharingInvites