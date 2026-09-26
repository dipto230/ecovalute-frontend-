import React from 'react'

const RootDashboardLayout = async({children}:{children:React.ReactNode}) => {
  return (
      <div>
          {/*Dashboard sidebar*/}
          <div>
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