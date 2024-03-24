import { LoginWindow } from "@/components";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login / Register',
}

const page = () => {

  return (
    <div className="grow flex flex-col justify-center items-center">
      <LoginWindow />
    </div>
  )
};

export default page;