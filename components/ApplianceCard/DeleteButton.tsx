'use client'

import { useState } from "react"

type Props = {
  onDelete: (applianceId: number) => void
  id: number;
}

const DeleteButton = ({ onDelete, id }: Props) => {

  const [checkDelete, setCheckDelete] = useState(true)
  const [confirmButton, setConfirmButton] = useState(false)

  const handleDelete = () => {
    if (checkDelete) {
      setConfirmButton(true);
      setCheckDelete(false);
    } else {
      onDelete(id);
      setConfirmButton(false);
      setCheckDelete(true);
    }
  }

  return (
    <div className='w-full h-full bg-red-400/50 hover:bg-red-400/80 z-2' >
      {!confirmButton ?
        (
          <button onClick={() => handleDelete()} className="w-full h-full"> Delete</ button>
        ) :
        (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <button className="border-r-[1px] border-black bg-red-500/50 hover:bg-red-500/80 hover:font-semibold px-2 w-full" onClick={() => handleDelete()}>Delete</button>
            <button className="border-l-[1px] border-black bg-blue-500/50 hover:bg-blue-500/80 hover:font-semibold px-2 w-full" onClick={() => { setCheckDelete(true); setConfirmButton(false); }}>Cancel</button>
          </div>
        )
      }
    </div >
  )
}

export default DeleteButton