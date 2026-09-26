import React from 'react'

const RootDashboardLayout = async({children}:{children:React.ReactNode}) => {
  return (
      <div className='flex h-screen overflow-hidden'>
          {/*Dashboard sidebar*/}
          <div className=''>
              <main>
                  <div>
                      {children}
                  </div>
              </main>
          </div>

    </div>
  )
}

export default RootDashboardLayout