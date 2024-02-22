'use client'

import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { BuiltInProviderType } from "next-auth/providers/index";
import { IoLogoGoogle } from "react-icons/io5";

const LoginWindow = () => {


  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <div className='mt-4 p-4 w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-bold text-5xl underline'>Login</h1>
      <div className='mt-4 flex flex-col justify-center items-center '>
        {providers ?
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => {
                signIn(provider.id);
              }}
              className="py-2 px-4 bg-gray-100 rounded-md border-gray-500 border-[1px] border-b-[5px] hover:border-b-[1px] hover:translate-y-1 transition-all duration-200 ease flex flex-row justify-around items-center"
            >
              {provider.id === 'google' && (
                <IoLogoGoogle />
              )}
              <span className="ml-2 text-semibold">
                Sign in with {provider.name}
              </span>
            </button>
          )) : (
            <>
              <p>Loading...</p>
            </>
          )}
      </div>
    </div>
  )
}

export default LoginWindow