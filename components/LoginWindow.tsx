'use client'

import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LoginWindow = () => {

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <div className='mt-4 p-4 w-full h-full flex flex-col justify-center items-center'>
      <h1 className=''>Login</h1>
      <div className='bg-gray-500/80'>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => {
                signIn(provider.id);
              }}
              className="black_btn"
            >
              Sign in
            </button>
          ))}
      </div>
    </div>
  )
}

export default LoginWindow