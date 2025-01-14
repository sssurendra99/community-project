import AccordionComponent from '@/app/components/ui-tools/AccordionComponent';
import BreadCrumbComponent from '@/app/components/ui-tools/BreadCrumbComponent';
import React, { ReactNode } from 'react'

const CollectionLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='lg:max-w-[1200px] m-auto'>
        <div className='py-5'>
            <BreadCrumbComponent />
        </div>
        <div className='flex flex-row w-full'>
            <div className='w-1/5'>
                <AccordionComponent />
            </div>
            <div>{children}</div>
        </div>
    </div>
  )
}

export default CollectionLayout;