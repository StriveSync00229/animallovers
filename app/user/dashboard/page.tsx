"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function UserDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/user/dashboard/don")
  }, [router])

  return null
}
