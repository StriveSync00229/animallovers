"use client"

import type React from "react"

import AuthGuard from "./auth-guard"
import AdminSidebar from "./admin-sidebar"
import AdminHeader from "./admin-header"

export default function AdminLayoutWrapper({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="ml-64 transition-all duration-300">
          <AdminHeader title={title} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
