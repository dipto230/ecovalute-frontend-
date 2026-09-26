import React from 'react'
import DashboardNavbar from '../components/modules/Dashboard/DashboardNavbar'

const RootDashboardLayout = async({children}:{children:React.ReactNode}) => {
  return (
      <div className='flex h-screen overflow-hidden'>
          {/*Dashboard sidebar*/}
          <Dashboard
          <div className='flex flex-1 flex-col overflow-hidden'>
            <DashboardNavbar/>
              <main className='flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6'>
                  <div>
                      {children}
                  </div>
              </main>
          </div>

    </div>
  )
}

export default RootDashboardLayout