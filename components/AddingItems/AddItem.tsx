'use client'

import { useEffect, useState } from "react";

import CustomAddItem from "./CustomAddItem";
import FadeInHOC from "../FadeInHOC/FadeInHOC";
import Image from "next/image";
import OptionAddItem from "./OptionAddItem";

type Props = {
  selectedArea: selectionProps;
  availableItems: availableItem[]
}

// Add Item Component
const AddItem = ({ selectedArea, availableItems }: Props) => {
  const { compartment, position, level } = selectedArea;

  useEffect(() => {
    setAddType('')
  }, [compartment, position, level])


  const [addType, setAddType] = useState('')

  return (
    <div className="px-4">
      <FadeInHOC delayNumber={1000} direction='up'>
        <h2 className='mb-2 text-xl font-semibold'>Add an item to your <span className='capitalize'>{compartment}</span></h2>
      </FadeInHOC>

      <div className="px-2 mb-2 ">
        <p>Do you want to create a custom item of find a pre-made one?</p>
        <div className="flex flex-row justify-center items-center gap-4 my-2">

          <button onClick={() => setAddType('custom')}
            className={`${addType === 'custom' ? ' border-green-300 border-2 translate-y-[-10px]' : 'hover:translate-y-1'} flex flex-col items-center justify-center px-2 font-normal bg-from-blue-400 bg-gradient-to-br to-blue-400 from-blue-600 hover:translate-y-[-10px] active:bg-blue-400 aspect-square h-[100px] rounded-full transition-all duration-200 ease`}>
            <Image src='/assets/images/custom.svg' alt='pre-made icon' width={30} height={30} />
            <span className="">
              Custom Item
            </span>
          </button>

          <button onClick={() => setAddType('options')}
            className={`${addType === 'options' ? ' border-green-300 border-2 translate-y-[-10px]' : 'hover:translate-y-1'} flex flex-col items-center justify-center px-2 font-normal bg-gradient-to-bl to-blue-400 from-blue-600 hover:translate-y-[-10px] active:bg-blue-400 aspect-square h-[100px] rounded-full transition-all duration-200 ease`}>
            <Image src='/assets/images/options.svg' alt='pre-made icon' width={25} height={25} />
            <span className="">
              Pre-made Item
            </span>
          </button>
        </div>
      </div>
      <hr />

      {/* Type of item Creation */}
      <div>
        {addType === 'options' ? <OptionAddItem selectedArea={selectedArea} availableItems={availableItems} /> : <CustomAddItem selectedArea={selectedArea} availableItems={availableItems} />}
      </div>

    </div>
  );

}

export default AddItem