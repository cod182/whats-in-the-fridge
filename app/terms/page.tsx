import React from 'react'

const page = () => {
  return (
    <div>
      <object data="/assets/terms.pdf" type="application/pdf" className="w-full h-[100vh]">
        <p>Alternative text - include a link <a href="/assets/terms.pdf">to the PDF!</a></p>
      </object>
    </div>
  )
}

export default page