import { BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';
import React, { useEffect, useRef, useState } from 'react'
import { generateUniqueId, getBarcodeScanInfo, getCurrentDate } from '@/utilities/functions';

import AddItemForm from './AddItemForm';
import BarcodeScanner from './BarcodeScanner';
import Image from 'next/image';

type Props = {
	selectedArea: selectionProps;
	availableItems: availableItem[]
	userId: string;
	handleAddingToCurrentItems: (item: applianceItem) => void;
	shared?: sharedFromProps;
}

const AddByScanner = ({ availableItems, selectedArea, userId, handleAddingToCurrentItems, shared }: Props) => {

	// DECLARATIONS
	const { compartment, position, level, type: locationType } = selectedArea;


	// STATE
	const [product, setProduct] = useState<any | null>(null);
	const [barcodeError, setBarcodeError] = useState<string | null>(null);
	const [barcodeScannerState, setBarcodeScannerState] = useState(false)
	const [formOpen, setFormOpen] = useState(false)
	const [quantity, setQuantity] = useState(1)
	const [error, setError] = useState<string>();
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState<string>();
	const [applianceId, setApplianceId] = useState<number>()
	console.log(product);


	// USE EFFECTS
	// This is getting the id of the appliance from the url
	useEffect(() => {
		const pathname = window.location.pathname;
		const segments = pathname.split('/');
		const idFromUrl = segments[segments.length - 1];
		setApplianceId(parseInt(idFromUrl));
	}, []);

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
		setFormOpen(false);
		setProduct(null);
		if (!barcodeScannerState) {
			handleScroll();
		}
	}

	// Handles scrolling to the scanner
	const handleScroll = () => {
		if (scannerRef.current) {
			scannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const quantityChange = (type: 'increment' | 'decrement') => {
		if (type === 'increment') {
			setQuantity((prev => prev + 1));
		} else if (type === 'decrement') {
			if (quantity === 1) {
				console.log('Must be above zero')
			}
			setQuantity((prev => prev - 1));
		}
	};

	// Handles teh submitting of the form
	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		setError('');

		const formData = new FormData(e.target as HTMLFormElement);
		const formValues: Record<string, string> = {};

		formData.forEach((value, key) => {
			formValues[key] = value.toString();
		});

		// Validate quantity
		const quantity = parseInt(formValues['quantity']);
		let isValid = true;

		if (isNaN(quantity) || quantity < 1) {
			console.error('Quantity must be a number greater than or equal to 1.');
			isValid = false;
		}

		if (isValid && product && applianceId) {

			// Proceed to send this data to the api
			const newItemId = generateUniqueId();
			let newItemObject = {
				id: newItemId,
				ownerid: shared ? shared.ownerId : parseInt(userId),
				applianceid: applianceId,
				name: product.product_name,
				itemType: (product.categories_hierarchy && product.categories_hierarchy[0]) ? product.categories_hierarchy[0].replace(/^[^:]*:/, "") : 'Unknown',
				itemMainType: (product.categories_hierarchy && product.categories_hierarchy[1]) ? product.categories_hierarchy[1].replace(/^[^:]*:/, "") : '',
				itemSubType: (product.categories_hierarchy && product.categories_hierarchy[2]) ? product.categories_hierarchy[2].replace(/^[^:]*:/, "") : '',
				addedDate: getCurrentDate(),
				expiryDate: formValues.expiryDate,
				quantity: parseInt(formValues.quantity),
				cookedFromFrozen: formValues.cookedFromFrozen ? formValues.cookedFromFrozen : 'NA',
				comment: formValues.comment ? formValues.comment : '',
				compartment: compartment,
				level: level,
				locationType: locationType,
				position: position ? position : 0,
				image: product && product.image_url ? product?.image_url : '',
			};
			console.log(newItemObject)

			try {
				setSubmitting(true)
				// Defining the apiUrl depending on if the item is shared or not
				const apiUrl = shared ? '/api/appliance-items/shared/new' : '/api/appliance-items/new'

				const response = await fetch(apiUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newItemObject),
				});
				if (response.ok) {

					setSubmitting(false)
					handleAddingToCurrentItems(newItemObject);
					setMessage('Item Added')

				} else {
					setError(response.statusText);
					setSubmitting(false)
					setMessage('')
				}
			} catch (error) {
				console.error('Error while sending data', error);
				setError('Error while sending data, please try again');
				setSubmitting(false)
			}
		} else {
			setError('Error checking form validation')
		}
	}


	// REFS
	const scannerRef = useRef<HTMLDivElement | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);



	return (
		<div className='w-full'>
			{/* Scanner Start/Stop Area */}
			<div className='w-full flex flex-col items-center justify-center my-2'>
				<button onClick={handleActivateScanner} className={`w-full px-8 rounded-lg h-[50px] font-semibold flex flex-row items-center justify-center gap-2 transition-all ease duration-200 ${barcodeScannerState ? 'bg-red-500/70 hover:bg-red-500/90' : 'bg-green-500/70 hover:bg-green-500/90'}`}>
					{barcodeScannerState ? (<BsCameraVideoOffFill className='w-[35px] h-[35px]' />) : (<BsCameraVideoFill className='w-[35px] h-[35px]' />)}
					<p>{barcodeScannerState ? 'Close Camera' : 'Open Camera'}</p>
				</button>
			</div>
			{/* End Scanner Start/Stop Area */}

			<div className='relative w-full h-fit'>
				{/* Notification Start */}
				<div className={` w-full top-0 ${barcodeError ? 'h-[80px]' : 'h-[0px] overflow-hidden'} transition-all duration-200 ease bg-red-500/70 rounded-lg flex flex-col items-center justify-center`}>
					<p className='text-black font-bold text-lg'>
						{barcodeError}
					</p>
				</div>
				{/* Notification End */}

				{/* Scanner Start */}
				<div className='overflow-hidden w-full h-fit' ref={scannerRef}>
					<BarcodeScanner onScanSuccess={handleBarcodeScan} scanState={barcodeScannerState} updateScanningState={setBarcodeScannerState} />
				</div>
				{/* Scanner End */}

				{/* Product Info */}
				<div className={`my-2 w-full rounded-lg transition ease duration-200 px-4 bg-gray-200/40 ${product && !formOpen ? 'min-h-[50px] py-4' : 'min-h-[0px] py-0 overflow-hidden'}  flex flex-col items-center justify-start}`}>
					{(product && !formOpen) && (
						<>
							<p className='text-black font-bold text-lg'>Is this your item?</p>

							{/* Name */}
							<p>{product && product.product_name}</p>

							{/* Image */}
							{product.image_url && (
								<Image src={product && product?.image_url} alt="product image" width={200} height={200} className='w-full h-auto max-w-[200px] object-contain ' />
							)}

							{/* Categories */}
							{product.categories_hierarchy &&
								product.categories_hierarchy.map((category: string, index: number) => (
									<p className='capitalize' key={index}>{category.replace(/^[^:]*:/, "")}</p>
								))
							}

							<div className='flex flex-row items-center justify-center gap-2 my-2'>
								<button onClick={() => setFormOpen(true)} className='bg-green-500/70 hover:bg-green-500/90 h-fit- w-fit min-w-[42px] p-2 rounded-lg hover:scale-105 transition-all duration-200 ease'>
									{/* <TiTick className='h-[25px] w-[25px]' /> */}
									<p className='font-semibold'>Yes</p>
								</button>

								<button onClick={() => handleActivateScanner()} className='bg-red-500/70 hover:bg-red-500/90 h-fit w-fit min-w-[42px] p-2 rounded-lg transition-all duration-200 ease hover:scale-105'>
									{/* <TiCancel className='h-[25px] w-[25px]' /> */}
									<p className='font-semibold'>No</p>
								</button>
							</div>
						</>
					)}
				</div>

				{/* Item Form */}
				{formOpen && (
					<div>
						<AddItemForm compartment={compartment} handleFormSubmit={handleFormSubmit} quantity={quantity} setQuantity={setQuantity} quantityChange={quantityChange} />
						{/* Error Message */}
						{error &&
							<div className='flex flex-col justify-center items-center w-[90%] mx-auto h-fit bg-red-500/80 py-2 px-4 rounded-b-md'>
								<p className='italic font-normal'>Error: {error}</p>
							</div>
						}
						{/* Error Message End */}
					</div>
				)}
			</div>

		</div>
	)
}

export default AddByScanner