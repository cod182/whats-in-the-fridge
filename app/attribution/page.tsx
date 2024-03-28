import { PageTitle } from '@/components'
import React from 'react'

const page = () => {
  return (
    <div>
      <PageTitle title='Attribution' titleClasses='text-2xl' />

      <div className='flex flex-col items-start justify-start gap-2 my-4 text-md'>
        <p className='hover:text-blue-700' >
          Fridge Model: <a href="https://www.vecteezy.com/free-vector/food">Food Vectors by Vecteezy</a>
        </p>
        <a className='hover:text-blue-700' href="https://www.flaticon.com/free-icons/deep-freezer" title="deep freezer icons">Deep freezer icons created by ranksol graphics - Flaticon</a>
        <a className='hover:text-blue-700' href="https://www.flaticon.com/free-icons/fridge" title="fridge icons">Fridge icons created by kmg design - Flaticon</a>
        <a className='hover:text-blue-700' href="https://www.flaticon.com/free-icons/freezer" title="freezer icons">Freezer icons created by POD Gladiator - Flaticon</a>
        <a className='hover:text-blue-700' href="https://www.flaticon.com/free-icons/freezer" title="freezer icons">Freezer icons created by Freepik - Flaticon</a>
        <a className='hover:text-blue-700' href="https://www.freepik.com/free-vector/big-set-flat-whole-sliced-fresh-fruits-vegetables-with-carrot-tomato-lemon-avocado-apple-banana-peach-isolated-vector-illustration_32074509.htm#query=vegetables&position=9&from_view=keyword&track=sph&uuid=6ce88b9d-f2f8-4569-bb2e-053c43bae17c">Image by macrovector on Freepik</a>
        <p className='hover:text-blue-700'>frozen food by Studio 365 from <a href="https://thenounproject.com/browse/icons/term/frozen-food/" target="_blank" title="frozen food Icons">Noun Project</a> (CC BY 3.0)</p>
        <p className='hover:text-blue-700'>Defrost by kystudio from <a href="https://thenounproject.com/browse/icons/term/defrost/" target="_blank" title="Defrost Icons">Noun Project</a> (CC BY 3.0)</p>
        <p className='hover:text-blue-700'>Food by Maxie from <a href="https://thenounproject.com/browse/icons/term/food/" target="_blank" title="Food Icons">Noun Project</a> (CC BY 3.0)</p>
      </div>
    </div>
  )
}

export default page