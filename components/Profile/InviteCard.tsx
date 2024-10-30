import { BiCross } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import React from 'react'
import { TiTick } from 'react-icons/ti';

type Props = {
	sharedData: ShareProps;
	updateShare: (newShareData: ShareProps, type: string) => void;
	inviteStatus: boolean;
}

const InviteCard = ({ sharedData, updateShare, inviteStatus }: Props) => {

	const { email, accepted, applianceName, applianceId, ownerEmail, ownerName, ownerId, id } = sharedData;

	return (
		<div className='max-w-[200px] h-fit overflow-hidden transition-all duration-300 rounded-md  shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] ease p-4'>
			<p
				className='text-sm font-normal'
			>
				<span className='font-semibold capitalize'>{ownerName}</span> {accepted === 'true' ? 'is sharing' : 'has invited you to share'} <span className='font-semibold'>&quot;{applianceName}&quot;</span></p>
			{/* Response Panel */}
			<div className='flex flex-row items-center justify-around gap-2 my-2'>

				{
					inviteStatus
						?
						(
							<FaSpinner className='animate-spin' />
						)
						:
						// {/* Button for accepting a share */ }
						accepted === 'false' && (
							<button
								className='hover:bg-gray-300 rounded p-[2px] transition-all duration-200 ease group relative'
								onClick={() => updateShare({ ...sharedData, accepted: 'true' }, 'accept')}>
								<p className="top-[32px] left-[-10px] absolute px-2 text-xs font-normal overflow-hidden h-0 group-hover:h-fit  transition-all duration-400 ease min-h-[0px] group-hover:min-h-[10px] bg-gray-300/80 group-hover:border-[1px] group-hover:border-black rounded">
									Accept
								</p>
								<TiTick className='text-green-700 group-hover:scale-105 h-[25px] w-[25px]' />
							</button>
						)}

				<button
					className='hover:bg-gray-300 rounded p-[2px] transition-all duration-200 ease group relative'
					onClick={() => updateShare(sharedData, 'delete')}>
					<p className="top-[32px] left-[-14px] absolute px-2 text-xs font-normal overflow-hidden h-0 group-hover:h-fit  transition-all duration-400 ease min-h-[0px] group-hover:min-h-[10px] bg-gray-300/80 group-hover:border-[1px] group-hover:border-black rounded">
						Cancel
					</p>
					<IoClose className='text-red-700 group-hover:scale-105 h-[25px] w-[25px]' />
				</button>


			</div>

		</div >
	)
}

export default InviteCard