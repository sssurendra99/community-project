import React, { ReactNode } from 'react'
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default AuthLayout;