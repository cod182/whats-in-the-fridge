import { BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';
import React, { useState } from 'react'
import { TiCancel, TiTick } from 'react-icons/ti';

import BarcodeScanner from './BarcodeScanner';
import CustomButton from '../CustomButton/CustomButton';
import { FaCross } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { MdCancel } from 'react-icons/md';
import { getBarcodeScanInfo } from '@/utilities/functions';

type Props = {
	selectedArea: selectionProps;
	availableItems: availableItem[]
	userId: string;
	handleAddingToCurrentItems: (item: applianceItem) => void;
	shared?: sharedFromProps;
}

const AddByScanner = ({ availableItems, selectedArea, userId, handleAddingToCurrentItems, shared }: Props) => {
	// STATE
	const [product, setProduct] = useState<any | null>(null);
	const [barcodeError, setBarcodeError] = useState<string | null>(null);
	const [barcodeScannerState, setBarcodeScannerState] = useState(false)

	// FUNCTIONS
	const handleBarcodeScan = async (barcode: string) => {
		console.log(barcode);
		try {
			const data = await getBarcodeScanInfo(barcode);

			console.log('PRODUCT', data)
			if (data.status === 1) {
				setProduct(data.product);
				setBarcodeError(null);
			} else {
				setProduct(null);
				setBarcodeError('Product not found.');

				setTimeout(() => {
					setBarcodeError(null);
				}, 2000)
			}
		} catch (err) {
			setProduct(null);
			setBarcodeError('Error fetching product data.');
			setTimeout(() => {
				setBarcodeError(null);
			}, 2000)
		}
	}

	const handleActivateScanner = () => {
		setBarcodeScannerState(!barcodeScannerState);
		setProduct(null);
	}


	return (
		<div className='w-full'>
			<div className='w-full flex flex-col items-center justify-center my-2'>
				<button onClick={handleActivateScanner} className={`w-full px-8 rounded-lg h-[80px] font-semibold flex flex-row items-center justify-center gap-2 transition-all ease duration-200 ${barcodeScannerState ? 'bg-red-500/70 hover:bg-red-500/90' : 'bg-green-500/70 hover:bg-green-500/90'}`}>
					{barcodeScannerState ? (<BsCameraVideoOffFill className='w-[35px] h-[35px]' />) : (<BsCameraVideoFill className='w-[35px] h-[35px]' />)}
					<p>{barcodeScannerState ? 'Close Camera' : 'Open Camera'}</p>
				</button>
			</div>

			<div className='relative w-full h-fit'>
				<div className={` w-full top-0 ${barcodeError ? 'h-[80px]' : 'h-[0px] overflow-hidden'} transition-all duration-200 ease bg-red-500/70 rounded-lg flex flex-col items-center justify-center`}>
					<p className='text-black font-bold text-lg'>
						{barcodeError}
					</p>
				</div>
				<div className='overflow-hidden w-full h-fit'>
					<BarcodeScanner onScanSuccess={handleBarcodeScan} scanState={barcodeScannerState} updateScanningState={setBarcodeScannerState} />
				</div>

				<div className={`my-2 w-full rounded-lg transition ease duration-200 px-4 bg-gray-200/40 ${product ? 'min-h-[50px] py-4' : 'min-h-[0px] py-0 overflow-hidden'}  flex flex-col items-center justify-start}`}>
					{product && (
						<>
							<p className='text-black font-bold text-lg'>Is this your item?</p>
							<p>{product && product.product_name}</p>

							<div className='flex flex-row items-center justify-center gap-2 my-2'>
								<button className='bg-green-500/70 hover:bg-green-500/90 h-fit- w-fit min-w-[42px] p-2 rounded-lg hover:scale-105 transition-all duration-200 ease'>
									{/* <TiTick className='h-[25px] w-[25px]' /> */}
									<p className='font-semibold'>Yes</p>
								</button>

								<button className='bg-red-500/70 hover:bg-red-500/90 h-fit- w-fit min-w-[42px] p-2 rounded-lg transition-all duration-200 ease hover:scale-105'>
									{/* <TiCancel className='h-[25px] w-[25px]' /> */}
									<p className='font-semibold'>No</p>
								</button>
							</div>
						</>
					)}
				</div>
			</div>

		</div>
	)
}

export default AddByScanner