'use client'

import React, { useState } from 'react'

import { GiSandsOfTime } from "react-icons/gi";
import { ImConnection } from 'react-icons/im'
import { MdDeleteForever } from "react-icons/md";
import { RiUserShared2Line } from 'react-icons/ri'
import { TiTick } from "react-icons/ti";

type Props = {
	applianceData: applianceWithShared;
}



const SharingMenu = ({ applianceData }: Props) => {

	const [menuState, setMenuState] = useState(false)
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

			<div className={` absolute right-0 top-[30px] overflow-hidden   bg-gray-200/80 rounded transition-all duration-200 ease h-auto ${menuState ? 'max-h-[500px] w-[250px] overflow-hidden shadow-xl' : ' max-h-[0px] w-[250px] overflow-hidden shadow-none'}}`}>

				<div className='w-full h-full p-2'>
					{applianceData.sharedWith.length > 0
						?
						(
							<div className='flex flex-col items-start justify-center '>
								<p>{applianceData.name} is shared with</p>
								<hr className='border-gray-500 w-full' />

								{/* All Sharing Data */}
								{applianceData.sharedWith.map((sharedData, index) => (
									<div key={index} className='w-full flex flex-row items-center justify-start gap-4 relative'>
										<p className=''>{sharedData.email} </p>
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
												<MdDeleteForever className='text-red-400 h-[25px] w-[25px]' aria-label='delete share invite' />
											</button>
										</div>

									</div>
								))}

							</div>
						)
						:
						(
							<div className='flex flex-col items-center justify-center w-full'>
								<p>Enter a users email to share {applianceData.name} with them.</p>
							</div>
						)
					}
				</div>

			</div>

		</div>
	)
}

export default SharingMenu