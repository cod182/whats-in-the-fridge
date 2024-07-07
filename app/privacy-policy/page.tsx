import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}
const page = () => {
  return (
    <div className="grow">
      <object data="/assets/privacy.pdf" type="application/pdf" className="w-full h-[100vh]">
        <p><a href="/assets/privacy.pdf">Click to view policy PDF!</a></p>
      </object>
    </div>
  )
}

export default page