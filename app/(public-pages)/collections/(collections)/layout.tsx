'use client'

import AccordionComponent from '@/components/ui-tools/AccordionComponent';
import BreadCrumbComponent from '@/components/ui-tools/BreadCrumbComponent';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react'

const CollectionLayout = ({children}: {children: ReactNode}) => {

  const pathname = usePathname()

  return (
    <div className='lg:max-w-[1200px] m-auto'>
        <div className='py-5'>
            <BreadCrumbComponent />
        </div>
        <div className='flex flex-row w-full'>
            <div className='w-1/5'>
                <AccordionComponent />
            </div>
            <div className='w-full'>{children}</div>
        </div>
    </div>
  )
}

export default CollectionLayout;