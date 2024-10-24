'use client'

import React, { FormEvent, useState } from 'react'
import { addShare, removeShare } from '@/utilities/functions';

import { FaShare } from "react-icons/fa";
import { FaSpinner } from 'react-icons/fa6';
import { GiSandsOfTime } from "react-icons/gi";
import { ImConnection } from 'react-icons/im'
import { MdDeleteForever } from "react-icons/md";
import { RiUserShared2Line } from 'react-icons/ri'
import { TiTick } from "react-icons/ti";

type Props = {
	applianceData: applianceWithShared;
}



const SharingMenu = ({ applianceData }: Props) => {

	// States
	const [menuState, setMenuState] = useState(false)
	const [submittingNewShare, setSubmittingNewShare] = useState(false);
	const [newShareStatus, setNewShareStatus] = useState(false)
	// Functions

	const handleDeletingShare = (email: string) => {
		removeShare(applianceData.id, email)
	}

	const handleAddingShare = async (e: FormEvent<HTMLFormElement>) => {
		setSubmittingNewShare(true);
		e.preventDefault();
		const form = e.target as HTMLFormElement;

		let shareStatus = await addShare(applianceData.id, (form.elements[0] as HTMLInputElement).value)
		if (shareStatus.status === 200) {
			setSubmittingNewShare(false);
			setNewShareStatus(true);
			setMenuState(false);
		} else {
			setSubmittingNewShare(false);
			setNewShareStatus(false);
		}

	}

	return (
		<div className='relative flex flex-col items-center justify-center'>
			<div className={`flex flex-row justify-end items-center }`}>

				{applianceData.sharedWith.length > 0 ?
					<button onClick={() => setMenuState(!menuState)}>
						<ImConnection className={`h-[25px] w-[25px] rotate-[45deg]  hover:text-blue-600 active:text-blue-700 group-hover:scale-105 transition-all duration-200 ease-in-out text-blue-500 }`} />
					</button>


					:
					<button onClick={() => setMenuState(!menuState)}>
						<RiUserShared2Line className={`h-[20px] w-[20px]  hover:text-blue-600 active:text-blue-700 group-hover:scale-105 transition-all duration-200 ease-in-out text-black`} />
					</button>
				}

			</div>

			<div className={` absolute right-0 top-[30px]  bg-gray-200/80 rounded transition-all duration-200 ease h-auto ${menuState ? 'max-h-[500px] w-[250px] overflow-hidden shadow-xl' : ' max-h-[0px] w-[250px] overflow-hidden shadow-none'}}`}>

				<div className='w-full h-full p-2'>
					{applianceData.sharedWith.length > 0
						?
						(
							<div className='flex flex-col items-start justify-center '>
								<p>{applianceData.name} is shared with</p>
								<hr className='border-gray-500 w-full' />

								{/* All Sharing Data */}
								{applianceData.sharedWith.map((sharedData, index) => (
									<div key={index} className='w-full flex flex-row items-center justify-between gap-4 relative'>
										<p className=''>{sharedData.email} </p>
										<div className='flex flex-row items-center justify-center gap-2'>
											<div className='relative flex flex-row items-center justify-start group z-[1] hover:z-[4]'>
												{/* Tooltip */}
												<p className="left-[17px] absolute text-xs font-normal overflow-hidden w-0 group-hover:w-fit group-hover:px-2 transition-all duration-400 ease min-w-[0px] group-hover:min-w-[10px] bg-gray-300/90 group-hover:border-[1px] group-hover:border-black rounded">{sharedData.accepted === true ? 'Accepted' : 'Pending'}</p>
												{/* Icon */}
												{sharedData.accepted === true ? (<TiTick className='text-green-600 h-[20px] w-[20px] group-icon' aria-label='accepted share' />) : (<GiSandsOfTime className='group-icon h-[20px] w-[20px]' aria-label='Pending share' />)}
											</div>

											{/* Delete button */}
											<div className='relative flex flex-row items-center justify-start group z-[1] hover:z-[4]'>
												{/* Tooltip */}
												<p className="right-[20px] absolute text-xs font-normal overflow-hidden w-0 group-hover:w-fit group-hover:px-2 transition-all duration-400 ease min-w-[0px] group-hover:min-w-[20px] bg-gray-300/90 group-hover:border-[1px] group-hover:border-black rounded">Remove</p>
												{/* Button */}
												<button>
													<MdDeleteForever className='text-red-400 h-[25px] w-[25px]' aria-label='delete share invite' onClick={() => { handleDeletingShare(sharedData.email) }} />
												</button>
											</div>
										</div>


									</div>
								))}

								<hr className='my-2 border-[1px] border-gray-500 w-full' />
								<div className='flex flex-col items-center justify-center w-full h-fit gap-2'>
									<p className='text-sm font-normal'>Enter a users email to share {applianceData.name} with them.</p>
									<form className='flex flex-row items-center justify-center 2-full gap-2' onSubmit={(e) => { handleAddingShare(e) }}>
										<input type='email' required placeholder='example@email.com' className='w-full px-4 py-2 font-normal rounded-md shadow-inner min-h-[30px] text-sm' />
										<button name='share' type='submit' disabled={submittingNewShare} className='flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-500 hover:shadow-sm active:bg-blue-600/80 transition-all duration-200 ease rounded  w-[36px] h-[36px] p-2'>
											{submittingNewShare
												?
												<FaSpinner className='text-white h-[25px] w-[25px]' />
												:
												<FaShare className='text-white h-[25px] w-[25px]' />

											}
										</button>
									</form>
								</div>

							</div>
						)
						:
						(
							<div className='flex flex-col items-center justify-center w-full h-fit gap-2'>
								<p className='text-sm font-normal'>Enter a users email to share {applianceData.name} with them.</p>
								<form className='flex flex-row items-center justify-center 2-full gap-2' onSubmit={(e) => { handleAddingShare(e) }}>
									<input type='email' required placeholder='example@email.com' className='w-full px-4 py-2 font-normal rounded-md shadow-inner min-h-[30px] text-sm' />
									<button name='share' type='submit' disabled={submittingNewShare} className='flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-500 hover:shadow-sm active:bg-blue-600/80 transition-all duration-200 ease rounded  w-[36px] h-[36px] p-2'>
										{submittingNewShare
											?
											<FaSpinner className='text-white h-[25px] w-[25px]' />
											:
											<FaShare className='text-white h-[25px] w-[25px]' />

										}
									</button>
								</form>
							</div>
						)
					}
				</div>

			</div>

		</div>
	)
}

export default SharingMenu