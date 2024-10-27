import { BiCross } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import React from 'react'
import { TiTick } from 'react-icons/ti';

type Props = {
	sharedData: ShareProps;
	updateShare: (newShareData: ShareProps, type: string) => void;

}

const InviteCard = ({ sharedData, updateShare }: Props) => {

	const { email, accepted, applianceName, applianceId, ownerEmail, ownerName, ownerId, id } = sharedData;

	return (
		<div className='max-w-[200px] h-fit overflow-hidden transition-all duration-300 rounded-md hover:scale-105 hover:shadow-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] ease p-4'>
			<p className='text-sm font-normal'>{accepted === 'true' ? 'You are sharing' : 'You have been invited to share the'} <span className='font-semibold'>{applianceName}</span> with <span className='font-semibold'>{ownerName}</span></p>
			{/* Response Panel */}
			<div className='flex flex-row items-center justify-around gap-2 my-2'>

				{/* Button for accepting a share */}

				{accepted === 'false' && (
					<button
						className='hover:bg-gray-300 rounded p-[2px] transition-all duration-200 ease group'
						onClick={() => updateShare({ ...sharedData, accepted: 'true' }, 'accept')}>
						<TiTick className='text-green-700 group-hover:scale-105 h-[25px] w-[25px]' />
					</button>
				)}

				<button
					className='hover:bg-gray-300 rounded p-[2px] transition-all duration-200 ease group'
					onClick={() => updateShare(sharedData, 'delete')}>
					<IoClose className='text-red-700 group-hover:scale-105 h-[25px] w-[25px]' />
				</button>
			</div>
		</div >
	)
}

export default InviteCard