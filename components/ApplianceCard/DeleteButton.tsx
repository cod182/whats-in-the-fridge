'use client'

import { useState } from "react"

type Props = {
  onDelete: (applianceId: number) => void
  id: number;
}

const DeleteButton = ({ onDelete, id }: Props) => {

  const [textString, setTextString] = useState('Delete')
  const [checkDelete, setCheckDelete] = useState(true)

  const handleDelete = (e: any) => {
    if (checkDelete) {
      e.preventDefault();
      setTextString('Are You Sure?');
      setCheckDelete(false);
    } else {
      onDelete(id);
      setTextString('Delete');
      setCheckDelete(true);
    }
  }

  return (
    <button type='submit' className='w-full h-full px-4 bg-red-400/50 hover:bg-red-400/80 z-2' onClick={(e) => handleDelete(e)}>
      {textString}
    </button>
  )
}

export default DeleteButton