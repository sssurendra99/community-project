'use client'

import clsx from 'clsx'
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { HomeIcon, ShoppingCartIcon } from 'lucide-react';

const DashboardSideBar = () => {

    const pathname = usePathname()
  return (
    <div className='lg:block hidden border-r h-full'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
            <div className='flex h-[55px] items-center justify-between border-b px-3 w-full'>
                <Link className='flex items-center gap-2 font-semibold ml-1' href="/">
                    <span className=''>Admin</span>
                </Link>
            </div>
            <div className='flex-1 overflow-auto py-2'>
                <nav className='grid items-start px-4 text-sm font-medium'>
                    <Link className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 font-semibold dark:hover:text-gray-50", {
                          "lex items-center gap-2 rounded-lg bg-gray-600 px-3 py-2 text-white font-semibold transition-all hover:text-white dark:text-gray-800 dark:hover:text-gray-50": pathname === "/dashboard/admin"
                      })} href={'/dashboard/admin'}>
                        <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
                            <HomeIcon className='h-3 w-3 text-black'/>
                        </div>
                        Home
                    </Link>
                    <Link className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50", {
                          "flex items-center gap-2 rounded-lg bg-gray-600 px-3 py-2 text-white font-semibold transition-all hover:text-white dark:text-gray-800 dark:hover:text-gray-50": pathname === "/dashboard/admin/products"
                      })} href={'/dashboard/admin/products'}>
                        <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
                            <ShoppingCartIcon className='h-3 w-3 text-black' strokeWidth={4} />
                        </div>
                        Products
                    </Link>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default DashboardSideBar