import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
}

const page = () => {
  return (
    <div className='grow'>
      <object data="/assets/cookies.pdf" type="application/pdf" className="w-full h-[100vh]">
        <p>Alternative text - include a link <a href="/assets/privacy.pdf">to the PDF!</a></p>
      </object>
    </div>
  )
}

export default page