import { Metadata } from 'next'
import { ProfileHome } from "@/components"

export const metadata: Metadata = {
  title: 'Profile Home',
}
const page = () => {

  return (
    <div className="grow">
      <ProfileHome />
    </div>
  )
}

export default page