import { useEffect, useRef } from 'react';

import { BrowserMultiFormatReader } from '@zxing/library';

interface BarcodeScannerProps {
	onScanSuccess: (barcode: string) => void;
	scanState: boolean;
	updateScanningState: (state: boolean) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess, scanState, updateScanningState }) => {

	// States
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const codeReader = useRef<BrowserMultiFormatReader | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);


	// Use Effects
	useEffect(() => {
		codeReader.current = new BrowserMultiFormatReader();

		const startScanning = async () => {
			try {
				mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
				if (videoRef.current) {
					videoRef.current.srcObject = mediaStreamRef.current;

					// Ensure the stream is ready before calling play
					videoRef.current.onloadedmetadata = () => {
						videoRef.current?.play().catch(err => console.error('Play error:', err));
					};
				}

				// Start scanning from the video stream
				await codeReader.current!.decodeFromVideoDevice(null, videoRef.current!, (result, err) => {
					if (result) {
						onScanSuccess(result.getText());
						updateScanningState(false);
					}
					if (err && !(err instanceof Error)) {
						console.warn(err);
					}
				});
			} catch (err) {
				console.error('Error starting scanner:', err);
			}
		};
		if (scanState) {
			startScanning();
		} else {
			stopScanning();
		}

		// Cleanup function to stop scanning and release the camera
		return () => {
			stopScanning();
		};
	}, [onScanSuccess, scanState, updateScanningState]);

	const stopScanning = () => {
		// Stop scanning
		if (codeReader.current) {
			codeReader.current.reset(); // Stop the scanner
			console.log('Scanner stopped.');
		}

		// Stop all media tracks to release the camera
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach(track => {
				track.stop(); // Stop the individual media track
				console.log('Media track stopped.');
			});
			mediaStreamRef.current = null; // Clear the media stream ref
		}

		// Clear the video source
		if (videoRef.current) {
			videoRef.current.srcObject = null; // Clear the media source
			videoRef.current.pause(); // Pause the video element if it's playing
			console.log('Video source cleared.');
		}
	};
	if (scanState) {

		return <video ref={videoRef} style={{ width: '100%' }} />;
	}
	return null
};

export default BarcodeScanner;
