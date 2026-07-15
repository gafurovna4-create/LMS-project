
import React from 'react'
import { useAuth } from '../../hook/useAuth'
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (



    <div>
      <button
        className='px-8 py-3 rounded-xl bg-linear-to-r from-red-500 to-red-600 text-white font-semibold cursor-pointer shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95'
        onClick={() => logOut()}
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
