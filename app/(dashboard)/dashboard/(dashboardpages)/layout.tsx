import DashboardNavBar from '../../../components/navigation/DashboardNavBar'
import DashboardSideBar from '../../../components/DashboardSideBar'
import React, {ReactNode} from 'react'


export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr] '>
      {/* This is for the dashboard side bar */}
      <DashboardSideBar />
      {/* This is for the dashboard nav bar */}
      <DashboardNavBar>
        <main className='flex flex-col gap-4 p-4 lg:gap-6'>
          {children}
        </main>
      </DashboardNavBar>
        
    </div>  
  )
}