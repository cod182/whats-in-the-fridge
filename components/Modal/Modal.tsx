'use client';

import './styles.css'

import { toggleBodyScrolling } from '@/utilities/functions';
import { useEffect } from 'react';

declare type Props = {
  children: any;
  setModalState: (state: string, toDisplay?: 'add' | 'view') => void;
  modalState: boolean;
  dataTest?: string;
};



const Modal = ({ children, setModalState, modalState, dataTest }: Props) => {


  // Used for checking for the esc key to close the modal
  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.key === 'Escape') {
        toggleBodyScrolling(true);
        setModalState('closed');
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [setModalState]);

  return (
    <div
      data-test={dataTest ? dataTest : null}
      className={`fixed top-0 left-0 w-screen z-[998]  flex justify-center items-center transition-all duration-500 ease-in-out ${modalState ? 'h-screen overflow-hidden' : 'h-0 overflow-hidden'
        }`}
    >
      <div
        className={`absolute top-0 left-0 w-screen z-[999] bg-gray-300/80 transition-all duration-500 ease-in-out ${modalState ? 'h-screen' : 'h-0 overflow-hidden'
          }`}
        onClick={() => {
          toggleBodyScrolling(true);
          setModalState('closed');
        }}
      />
      <div
        className="z-[999] flex flex-col w-full sm:w-[90%] max-w-[850px]  h-[100dvh] xs:h-auto xs:max-h-full p-2 xs:p-4 bg-blue-300 rounded-lg drop-shadow-2xl xs:relative absolute top-0"
        onClick={() => { }}
      >
        <div className="w-full h-[60px] flex flex-row justify-end items-center mb-4 sm:mb-0 z-[990]">
          <button
            className="py-2 px-4 bg-blue-300 rounded border-[1px] border-gray-700 border-b-4 hover:border-b-[1px] hover:bg-blue-400 transition-all ease-in duration-100"
            type='button'
            onClick={() => {
              toggleBodyScrolling(true);
              setModalState('closed');
            }}
          >
            Close
          </button>
        </div>
        <div className="overflow-scroll transition-all duration-200 ease rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
