import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Courses from './pages/dashboard/Courses'
import CoursesDetails from './pages/dashboard/CoursesDetails'
import MyLearning from './pages/dashboard/MyLearning'
import Profile from './pages/dashboard/Profile'
import Settings from './pages/dashboard/Settings'


const App = () => {
  return (
    <>
     <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/" element={<DashboardLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:id' element={<CoursesDetails />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

     </Routes>




    </>
  )
}

export default App
