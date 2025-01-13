import Link from 'next/link';
import React from 'react'
import EmailSubmission from './EmailSubmission';

const Footer = () => {
  return (
    <div className='bg-[#232323] text-white p-4'>
        <div className='w-[1200px] m-auto'>
            <div className='flex flex-row justify-around mb-6'>
                <div className='flex flex-col'>
                    <h3 className='font-bold text-l my-4'>SHOP</h3>
                    <Link href="#" className='text-sm my-1 font-semibold'>HOME</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>NEW ARRIVALS</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>VIEW COLLECTIONS</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>KELLY FELDER</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>REDVERS BULLER</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>SCYLLA ZELUS</Link>
                </div>
                <div className='flex flex-col'>
                    <h3 className='font-bold text-l my-4'>INFORMATION</h3>
                    <Link href="#" className='text-sm my-1 font-semibold'>ABOUT US</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>CONTACT US</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>ANGEL CLUB</Link>
                </div>
                <div className='flex flex-col'>
                    <h3 className='font-bold text-l my-4'>SHOP</h3>
                    <Link href="#" className='text-sm my-1 font-semibold'>TERMS & CONDITIONS</Link>
                    <Link href="#" className='text-sm my-1 font-semibold'>PRIVACY POLICY</Link>
                </div>
                <div className='flex flex-col'>
                    <h3 className='font-bold text-l my-4'>NEWSLETTER SIGN UP</h3>
                    <p className='text-sm my-1 font-semibold'>Sign up for exclusive updates, new arrivals & insider only discounts</p>
                    <EmailSubmission />
                </div>
            </div>
            <div className='text-center p-5 text-sm divide-y'>
                <p>&copy; 2025 WITHME</p>
            </div>
        </div>
    </div>
  )
}

export default Footer;