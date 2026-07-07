import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className='flex justify-center items-center min-h-screen bg-slate-100'>
      <Outlet />
    </main>
  )
}

export default AuthLayout
