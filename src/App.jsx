import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Courses from './pages/dashboard/Courses'
import CoursesDetails from './pages/dashboard/CoursesDetails'
import MyLearning from './pages/dashboard/MyLearning'
import Profile from './pages/dashboard/Profile'
import Settings from './pages/dashboard/Settings'
import ProtectedRoute from './routes/ProtectedRoute'
import Users from './pages/dashboard/Users'



const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<RegisterPage/>} />
        </Route>

        <Route path="/" element={<ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:id' element={<CoursesDetails />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users"  element={<Users/>} />
        </Route>
          <Route path='*' element={<p>Not Found 404</p>}/>
      </Routes>




    </>
  )
}

export default App
