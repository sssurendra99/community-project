import React, { ReactNode } from 'react'
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
        <header>
            <Header />
        </header>
        <main className='h-full flex items-center justify-center'>
            {children}
        </main>
        <footer>
            <Footer />
        </footer>
        
    </div>
  )
}

export default AuthLayout;