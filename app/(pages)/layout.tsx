import React, { ReactNode } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default PublicLayout;