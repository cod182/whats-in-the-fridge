import { icons, vegetables } from '@/static/attribution'

import DropDownItem from '@/components/DropDownItem/DropDownItem'
import { PageTitle } from '@/components'
import React from 'react'

const page = () => {
  return (
    <div>
      <PageTitle title='Attribution' titleClasses='text-2xl text-white border-white' />

      <div className='flex flex-col items-start justify-start gap-2 my-4 text-md'>

        <DropDownItem title='Icons' data={icons} grid={false} disabled={false} />
        <DropDownItem title='Vegetables' data={vegetables} grid={false} disabled={false} />

      </div>
    </div>
  )
}

export default page