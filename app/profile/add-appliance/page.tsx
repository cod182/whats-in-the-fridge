import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession()

  if (!session?.user) {
    redirect('/login');
  }
  return (
    <div>Add Appliance</div>
  )
}

export default page