'use client'

import React, { useEffect, useState } from 'react'
import { acceptShareInvite, getSharingInvites, rejectShareInvite } from '@/utilities/functions'

import InviteCard from './InviteCard'

type Props = {
	email: string
}

const SharingInvites = ({ email }: Props) => {

	// States

	const [sharingInvites, setSharingInvites] = useState<ShareProps[]>()
	const [shareInviteUpdating, setShareInviteUpdating] = useState(false)

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


	const updateShare = async (newShareData: ShareProps, type: string) => {
		setShareInviteUpdating(true);
		let updatedShares = sharingInvites || []; // Fallback to an empty array if sharingInvites is undefined

		if (type === 'delete') {
			const choice = confirm('Are you sure you want to cancel this share?')
			if (choice) {
				// Call functions to delete the share invite
				const response = await rejectShareInvite(newShareData.id);
				if (response.status === 200) {
					// Filter out the share with the same id as shareUpdate
					updatedShares = sharingInvites?.filter((i) => i.id !== newShareData.id) || [];
				} else {
					console.log(response.message)
					setShareInviteUpdating(false);
				}
			}

		}

		if (type === 'accept') {
			// Call function to accept the share invite
			const response = await acceptShareInvite(newShareData.id);
			if (response.status === 200) {
				// Update the share with the same id as shareUpdate
				updatedShares = sharingInvites?.map((i) =>
					i.id === newShareData.id ? { ...i, accepted: 'true' } : i
				) || [];
			} else {
				console.log(response.message)
				setShareInviteUpdating(false);
			}
		}

		// Update the sharingInvites state
		setSharingInvites(updatedShares);
		setShareInviteUpdating(false);
	};


	// Returns

	if (!sharingInvites || sharingInvites.length < 1) return null

	return (
		<>
			<hr className='w-full border-t-gray-700 border-t-[1px] my-4' />
			<section>
				<h4 className='font-semibold font-gray-600 text-lg'>Sharing Area</h4>
				<div className='flex flex-row items-center justify-start gap-2'>
					{sharingInvites.map((share, index) => {
						console.log(index, share)
						return (
							<InviteCard key={index} sharedData={share} updateShare={updateShare} inviteStatus={shareInviteUpdating} />
						)
					})}
				</div>

			</section>
		</>
	)
}

export default SharingInvites