import React from 'react'
import { Bell, Search } from "lucide-react"; 


function Header() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search courses..."
          className="pl-11 pr-5 py-2 w-80 rounded-lg border outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />
        
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
            className="w-10 h-10 rounded-full object-cover"
            alt="avatar"
          />
          <div>
            <h3 className="font-medium">Munira</h3>
            <p className="text-sm text-gray-500">Frontend Student</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

