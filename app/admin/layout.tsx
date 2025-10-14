import React, { Suspense } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardNav } from "@/components/admin/dashboard-nav"
import DashboardHeader from "@/components/admin/dashboard-header"
import { AuthGuard } from "@/components/admin/auth-guard"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <SidebarInset>
          {/* Contenu global */}
          <div className="flex flex-1 overflow-auto">
            {/* Sidebar moderne */}
            <aside className="hidden w-80 border-r bg-white md:block">
              <div className="flex h-full flex-col gap-6 p-6">
                <DashboardNav />
              </div>
            </aside>

            {/* Main area */}
            <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
              {/* Header */}
              <DashboardHeader />
              
              {/* Conteneur principal avec padding adaptatif */}
              <div className="min-h-screen p-6">
                <Suspense
                  fallback={
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Skeleton className="h-8 w-1/3 rounded-lg" />
                        <Skeleton className="h-4 w-2/3 rounded-lg" />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Skeleton key={i} className="h-32 w-full rounded-lg" />
                        ))}
                      </div>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
