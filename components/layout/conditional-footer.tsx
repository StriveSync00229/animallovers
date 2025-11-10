"use client"

import { usePathname } from "next/navigation"
import Footer from "./footer"

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Ne pas afficher le Footer sur les routes admin et user/dashboard
  if (pathname && (pathname.startsWith("/admin") || pathname.startsWith("/user/dashboard"))) {
    return null
  }
  
  return <Footer />
}

