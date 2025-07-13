import React, { ReactNode } from 'react'
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';

const PublicLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
        <header>
            <Header />
        </header>
        <main>
            {children}
        </main>
        <footer>
            <Footer />
        </footer>
        
    </div>
  )
}

export default PublicLayout;