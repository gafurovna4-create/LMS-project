import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("myUsers")
    return saved ? JSON.parse(saved) : []
  })
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    avatar: ''
  })

  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    localStorage.setItem("myUsers", JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (users.length === 0) {
      async function getUser() {
        try {
          const response = await axios('https://api.escuelajs.co/api/v1/users?limit=10')
          setUsers(response.data)
        } catch (error) {
          console.log(error.message)
        }
      }
      getUser()
    }
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!newUser.name || !newUser.email || !newUser.password) {
      return
    }

    const userToAdd = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role || 'User',
      avatar: newUser.avatar || ''
    }

    setUsers((prev) => [userToAdd, ...prev])
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: '',
      avatar: ''
    })
    // close the create section after successful creation
    setShowCreate(false)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-325 space-y-6">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">User management</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Create User</h1>
            </div>
            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              {users.length} users
            </div>
          </div>

          {!showCreate && (
            <div className="mt-7 flex justify-end">
              <button
                onClick={() => setShowCreate(true)}
                className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Create User
              </button>
            </div>
          )}

          {showCreate && (
            <form onSubmit={handleSubmit} className="mt-7 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input
                  name="name"
                  value={newUser.name}
                  onChange={handleChange}
                  placeholder="Ism-familiya"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleChange}
                  placeholder="Parol"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Avatar URL</label>
                <input
                  name="avatar"
                  value={newUser.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                <input
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleChange}
                  placeholder="admin@mail.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                <input
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  placeholder="Select role"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                Create User
              </button>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
              <p className="mt-5 text-sm text-slate-500">
                Hisobingiz bormi? <span className="font-semibold text-blue-600">Kiring</span>
              </p>
            </div>
            </form>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {users.map((item, index) => (
            <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full">
                  {item.avatar && item.avatar.startsWith('http') ? (
                    <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-500 to-indigo-500 text-xl font-semibold text-white">
                      {(item.name || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">{item.name || 'Unknown'}</p>
                  <p className="text-sm text-slate-500">{item.role || 'User'}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
                  <p className="mt-1 truncate text-slate-800">{item.email || 'No email available'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">User ID</p>
                  <p className="mt-1 text-slate-500">{item.id || '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Users