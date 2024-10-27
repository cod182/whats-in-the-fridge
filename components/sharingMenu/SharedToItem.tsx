import React, { useState } from 'react'

import { FaSpinner } from 'react-icons/fa6'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdDeleteForever } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { removeShare } from '@/utilities/functions'

type Props = {
	updateAppliance: (removedId: number) => void
	sharedData: { id: number, applianceId: number; email: string; accepted: string }
}

const SharedToItem = ({ sharedData, updateAppliance }: Props) => {
	// STATES
	const [deletingStatus, setDeletingStatus] = useState(false)

	// Functions
	const handleDeletingShare = async (email: string) => {
		setDeletingStatus(true)
		const result = confirm('Are you sure you want to delete?');
		if (result) {
			let deleteStatus = await removeShare(sharedData.applianceId, email)
			if (deleteStatus.status === 200) {
				setDeletingStatus(false)
				updateAppliance(sharedData.id);
			} else {
				setDeletingStatus(false)
			}
		} else {
			setDeletingStatus(false);
		}
	}


	return (

		<div className="w-full flex flex-row items-center justify-between gap-4 relative">
			<p>{sharedData.email}</p>
			<div className="flex flex-row items-center justify-center gap-2">
				<div className="relative flex flex-row items-center justify-start group z-[1] hover:z-[4]">
					{/* Tooltip */}
					<p className="right-[20px] absolute text-xs font-normal overflow-hidden w-0 group-hover:w-fit group-hover:px-2 transition-all duration-400 ease min-w-[0px] group-hover:min-w-[10px] bg-gray-300/90 group-hover:border-[1px] group-hover:border-black rounded">
						{sharedData.accepted === 'true' ? 'Accepted' : 'Pending'}
					</p>
					{/* Icon */}
					{sharedData.accepted === 'true' ? (
						<TiTick className="text-green-600 h-[20px] w-[20px] group-icon" aria-label="accepted share" />
					) : (
						<GiSandsOfTime className="group-icon h-[20px] w-[20px]" aria-label="Pending share" />
					)}
				</div>

				{/* Delete button */}
				<div className="relative flex flex-row items-center justify-start group z-[1] hover:z-[4]">
					{/* Tooltip */}
					<p className="right-[22px] absolute text-xs font-normal overflow-hidden w-0 group-hover:w-fit group-hover:px-2 transition-all duration-400 ease min-w-[0px] group-hover:min-w-[20px] bg-gray-300/90 group-hover:border-[1px] group-hover:border-black rounded">
						Remove
					</p>
					{/* Button */}
					{deletingStatus ? (
						<FaSpinner className="text-blue-400 h-[20px] w-[20px] animate-spin" />
					) : (
						<button>
							<MdDeleteForever
								className="text-red-400 hover:text-red-500 transition-all duration-200 ease h-[25px] w-[25px]"
								aria-label="delete share invite"
								onClick={() => handleDeletingShare(sharedData.email)}
							/>
						</button>
					)}
				</div>
			</div>
		</div>


	)
}

export default SharedToItem
