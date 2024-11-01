// components/BarcodeScanner.tsx
import { useEffect, useRef, useState } from 'react';

import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerProps {
	onScanSuccess: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess }) => {
	const scannerRef = useRef<HTMLDivElement | null>(null);
	const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
	const [scannerRunning, setScannerRunning] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined' || !scannerRef.current) return;

		const html5QrCode = new Html5Qrcode(scannerRef.current.id);
		html5QrCodeRef.current = html5QrCode;

		html5QrCode
			.start(
				{ facingMode: 'environment' }, // Use the rear camera
				{
					fps: 10, // Frames per second for scanning
					qrbox: { width: 250, height: 250 }, // Define the scanning box size
				},
				(decodedText) => {
					onScanSuccess(decodedText);
					// Stop the scanner after a successful scan
					if (scannerRunning) {
						html5QrCode.stop().catch((stopError) => {
							console.error('Error stopping scanner: ', stopError);
						});
						setScannerRunning(false);
					}
				},
				(errorMessage) => {
					console.warn('Scanning failed: ', errorMessage);
				}
			)
			.then(() => {
				setScannerRunning(true); // Scanner started successfully
			})
			.catch((err) => {
				console.error('Error starting scanner: ', err);
				setError('Camera streaming not supported or initialization failed.');
			});

		// Cleanup on component unmount
		return () => {
			if (html5QrCodeRef.current && scannerRunning) {
				html5QrCodeRef.current
					.stop()
					.then(() => html5QrCodeRef.current?.clear())
					.catch((stopError) => {
						console.warn('Error stopping scanner on unmount: ', stopError);
					});
			}
		};
	}, [onScanSuccess, scannerRunning]);

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	return <div ref={scannerRef} id="scanner" />;
};

export default BarcodeScanner;
