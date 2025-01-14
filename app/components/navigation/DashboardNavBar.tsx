'use client'
import React, {ReactNode} from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogClose
} from "@/components/ui/dialog"
import { Banknote, HamIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


const DashboardNavBar = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex flex-col'>
      <header className='flex h-14 lg:h-[55px] items-center gap-4 border-b px-6'>
        <Dialog>
          <SheetTrigger className='min-[1024px]:hidden p-2 transition'>
            <MenuIcon />
            <Link href="/dashboard">
              <span className='sr-only'></span>
            </Link>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Admin</SheetTitle>
              </Link>
            </SheetHeader>
            <div className='flex flex-col space-y-3 mt-[1rem]'>
              <DialogClose asChild>
                <Link href='/dashboard'>
                  <Button variant='outline' className='w-full'>
                    <Banknote className='mr-2 h-4 w-4' />
                    Finance
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
      </header>
      <section>
        {children}
      </section>
    </div>
  )
}

export default DashboardNavBar;