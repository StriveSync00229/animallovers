"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import UserSidebar from "./user-sidebar"
import UserHeader from "./user-header"

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50" style={{ userSelect: "none", WebkitUserSelect: "none" }}>
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <UserHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
