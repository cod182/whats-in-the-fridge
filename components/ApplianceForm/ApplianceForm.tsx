'use client'

import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';

import Image from 'next/image';
import { appliances } from '../../static/appliances'
import { useRouter } from 'next/navigation';

interface FormData {
  applianceName: string;
  applianceType: string;
  userId: string;
}

type Props = {
  formType: string;
  userId: string;
}


const ApplianceForm = ({ formType, userId }: Props) => {
  const router = useRouter();

  // States
  const [formData, setFormData] = useState<FormData>({
    applianceName: '',
    applianceType: '',
    userId: '0',
  });

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Use Effects
  useEffect(() => {
    setFormData({ ...formData, userId: userId });
  }, [userId])


  // Functions

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (type: string) => {
    setFormData({ ...formData, applianceType: type });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.applianceType && formData.applianceName && formData.userId) {
      setSubmitting(true)

      try {
        const response = await fetch('/api/appliance/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log('ok', response);
          router.push('/profile/appliances')
        } else {
          setError(response.statusText);
        }
      } catch (error) {
        console.error('Error while sending data', error);
        setError('Error while sending data, please try again');
        setSubmitting(false)
      }
    } else {
      setSubmitting(false)
      !formData.applianceName && setError('Please provide a name');
      !formData.applianceType && setError('Please provide a type');
      !formData.userId && setError('Error defining user id');
      !formData.applianceName && !formData.applianceType && setError('Please provide a name & type');
    }
  };
  return (
    <>
      <div className={`w-full bg-gray-300/40  border-red-600/40 flex flex-col justify-center items-center transition-opacity duration-200 ease ${error != '' ? 'h-[40px] border-[1px]' : 'h-0 border-0'}`}>
        {error}
      </div>

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
              <label htmlFor={index.toString()} key={index} className='relative mx-auto text-center'>
                <input
                  type="radio"
                  value={appliance.name.replace(/\s/g, "_").toLowerCase()}
                  checked={formData.applianceType === appliance.name.replace(/\s/g, "_").toLowerCase()}
                  onChange={() => handleRadioChange(appliance.name.replace(/\s/g, "_").toLowerCase())}
                  className='hidden'
                  id={index.toString()}
                />
                <Image
                  src={`/assets/images/appliances/${appliance.name.replace(/\s/g, "_").toLowerCase()}.webp`}
                  alt={appliance.name.replace(/\s/g, "_").toLowerCase()}
                  width={100}
                  height={100}
                  className={`mx-auto cursor-pointer shadow-[1px_1px_0px_0px_#80808069] hover:scale-105 rounded-md p-4 transition-all duration-200 ease hover:shadow-md ${formData.applianceType === appliance.name.replace(/\s/g, "_").toLowerCase() ? 'border-2 border-green-400 bg-blue-400' : ''}`}
                />
                <span className='text-sm font-normal'>{appliance.name}</span>
              </label>
            ))}
          </div>

        </div>
        <button disabled={submitting} type="submit" className={`relative px-4 py-2 my-2 transition-all duration-200 border-b-4 border-gray-700 rounded-md hover:border-b-0 hover:translate-y-1 ease focus:border-1 active:bg-blue-500 ${submitting ? 'bg-gray-300 translate-y-1 border-0' : 'bg-blue-400'}`}>{formType} Appliance</button>
      </form>
    </>
  );
};

export default ApplianceForm;
