'use client'

import React, { useState } from 'react';

import Image from 'next/image';
import { appliances } from '../../static/appliances'

interface FormData {
  applianceName: string;
  applianceType: string;
}

type Props = {
  formType: string;
}

const ApplianceForm = ({ formType }: Props) => {

  const [formData, setFormData] = useState<FormData>({
    applianceName: '',
    applianceType: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (type: string) => {
    setFormData({ ...formData, applianceType: type });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/appliance/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
        console.log('Data sent successfully');
      } else {
        // Handle error
        console.error('Error while sending data');
      }
    } catch (error) {
      console.error('Error while sending data', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center max-w-2xl mx-auto my-4 justify-normal'>
      <div className='w-full my-2'>
        <p className='px-4 my-2 text-gray-600 text-normal'>Enter a name for your appliance so you know which one it is!</p>
        <input
          placeholder='Name Your Appliance'
          type="text"
          id="applianceName"
          name="applianceName"
          value={formData.applianceName}
          onChange={handleChange}
          required
          className='w-full rounded h-[40px] px-4 py-2 font-semibold'
        />
      </div>
      <div className='w-full my-2'>
        <p className='px-4 my-2 text-gray-600 text-normal'>Select the type of appliance you want to add.</p>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5'>
          {appliances.map((appliance, index) => (
            <label key={index} className='relative mx-auto'>
              <input
                type="radio"
                value={appliance.name.replace(' ', '_').toLowerCase()}
                checked={formData.applianceType === appliance.name.replace(' ', '_').toLowerCase()}
                onChange={() => handleRadioChange(appliance.name.replace(' ', '_').toLowerCase())}
                className='hidden'
              />
              <Image
                src={`/assets/images/appliances/${appliance.name.replace(' ', '_').toLowerCase()}.webp`}
                alt={appliance.name.replace(' ', '_').toLowerCase()}
                width={100}
                height={100}
                className={`border-[1px] border-black rounded-md p-4 transition-all duration-200 ease hover:shadow-md ${formData.applianceType === appliance.name.replace(' ', '_').toLowerCase() ? 'bg-gradient-to-t from-green-300 to-blue-300' : 'bg-gradient-to-b from-blue-300 to-blue-300'}`}
              />
              <span>{appliance.name}</span>
            </label>
          ))}
        </div>

      </div>
      <button type="submit" className='relative px-4 py-2 my-2 transition-all duration-200 bg-blue-400 border-b-4 border-gray-700 rounded-md hover:border-b-0 hover:translate-y-1 ease focus:border-1 active:bg-blue-500'>{formType} Appliance</button>
    </form>
  );
};

export default ApplianceForm;
