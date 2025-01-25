import React, { ReactNode } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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