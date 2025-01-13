import Link from 'next/link';
import React from 'react'

const MainNavBar = () => {
  return (
    <div className='flex flex-row bg-black text-white font-semibold justify-center p-3 text-l'>
        <Link href="/" className='px-4'>HOME</Link>
        <Link href="/" className='px-4'>NEW ARRIVALS</Link>
        <Link href="/" className='px-4'>COLLECTIONS</Link>
        <Link href="/" className='px-4'>WORKWEAR</Link>
        <Link href="/" className='px-4'>DENIM</Link>
        <Link href="/" className='px-4'>SCYLLA ZELUS</Link>
        <Link href="/" className='px-4'>SHOP MEN</Link>
        <Link href="/" className='px-4'>50% -70% OFF</Link>
        <Link href="/" className='px-4'>ANGEL CLUB</Link>
    </div>
  )
}

export default MainNavBar;