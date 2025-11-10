"use client"

import { usePathname } from "next/navigation"
import Header from "./header"

export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // Ne pas afficher le Header sur les routes admin
  if (pathname && pathname.startsWith("/admin")) {
    return null
  }
  
  return <Header />
}

