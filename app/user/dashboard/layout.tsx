import type React from "react"
import UserAuthGuard from "@/components/user/user-auth-guard"
import UserDashboardLayout from "@/components/user/user-dashboard-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserAuthGuard>
      <UserDashboardLayout>{children}</UserDashboardLayout>
    </UserAuthGuard>
  )
}
