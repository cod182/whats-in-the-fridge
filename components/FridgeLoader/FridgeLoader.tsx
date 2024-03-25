import Image from "next/image"
import fridge from '../../public/assets/images/fridge.webp'

const FridgeLoader = () => {
  return (
    <>
      <Image src={fridge} alt='loading fridge' height={346} width={200} className="animate-pulse" />
      <p className="font-semibold animate-bounce">Loading...</p>
    </>
  )
}

export default FridgeLoader