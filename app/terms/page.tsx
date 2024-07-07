import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
}

const page = () => {
  return (
    <div className='grow'>
      <object data="/assets/terms.pdf" type="application/pdf" className="w-full h-[100vh]">
        <p><a href="/assets/terms.pdf">Click to view terms pdf</a></p>
      </object>
    </div>
  )
}

export default page