import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
}

const page = () => {
  return (
    <div className='grow'>
      <object data="/assets/cookies.pdf" type="application/pdf" className="w-full h-[100vh]">
        <p><a href="/assets/privacy.pdf">Click to view cookies PDF!</a></p>
      </object>
    </div>
  )
}

export default page