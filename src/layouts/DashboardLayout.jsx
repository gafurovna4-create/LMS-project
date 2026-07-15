import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <Sidebar />
      <div className='flex-1 flex border flex-col'>
        <Header />
        <main className='flex-1 p-8'>
          < Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
