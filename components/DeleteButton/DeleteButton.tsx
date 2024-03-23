'use client'

import { TiWarning } from "react-icons/ti"
import { signOut } from "next-auth/react"
import { useState } from "react"

type Props = {
  user: { name: string, email: string, image: string, id: string }
  apiRoute: string
}

const DeleteButton = ({ user, apiRoute }: Props) => {
  // States
  const [checkDelete, setCheckDelete] = useState(true)
  const [confirmButton, setConfirmButton] = useState(false)

  // Functions
  const handleDelete = async () => {
    try {
      const response = await fetch(apiRoute, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'userId': user.id.toString(),
          'userEmail': user.email.toString(),
        },
        body: JSON.stringify({ id: user.id, email: user.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Parse the JSON data from the response
      const data = await response.json();
      setConfirmButton(false);
      setCheckDelete(true);
      signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  const handleCheck = () => {
    if (checkDelete) {
      setConfirmButton(true);
      setCheckDelete(false);
    } else {
      handleDelete();
    }
  }

  return (
    <div className='w-[200px] h-full my-2 flex flex-row items-center' >

      <button onClick={() => handleCheck()} className={`border-b-4 border-black hover:border-b-0 hover:translate-y-1 hover:mb-1 bg-red-500/50 hover:bg-red-500/80 hover:font-semibold rounded-lg overflow-hidden ${!confirmButton ? 'w-full px-2' : 'w-0 px-0'} transition-all duration-200 ease`}> Delete</ button>

      <div className={`flex flex-row overflow-hidden items-center justify-center gap-2  h-full group ${confirmButton ? 'w-full' : 'w-0'} transition-all duration-200 ease`}>
        <button className="flex flex-row items-center justify-around border-b-4 border-black hover:border-b-0 hover:translate-y-1 hover:mb-1 bg-red-500/50 hover:bg-red-500/80 hover:font-semibold px-2 w-full rounded-lg" onClick={() => handleCheck()}>
          <TiWarning />
          <span>
            Delete
          </span>
          <TiWarning />
        </button>
        <button className="border-b-4 border-black hover:border-b-0 hover:translate-y-1 hover:mb-1 bg-blue-500/50 hover:bg-blue-500/80 hover:font-semibold px-2 w-full rounded-lg" onClick={() => { setCheckDelete(true); setConfirmButton(false); }}>Cancel</button>
      </div>

    </div >
  )
}

export default DeleteButton