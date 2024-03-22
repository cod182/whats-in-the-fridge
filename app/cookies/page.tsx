import React from 'react'

const page = () => {
  return (
    <div>
      <object data="/assets/cookies.pdf" type="application/pdf" className="w-full h-[100vh]">
        <p>Alternative text - include a link <a href="/assets/privacy.pdf">to the PDF!</a></p>
      </object>
    </div>
  )
}

export default page