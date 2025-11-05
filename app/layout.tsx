import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation"

export const metadata: Metadata = {
  title: "AnimalLovers",
  description: "Plateforme dédiée à la valorisation des chiens et des chats",
    generator: 'v0.dev'
}

function ShowFooter({ children }: { children: React.ReactNode }) {
  // Hack pour SSR/CSR path :
  let pathname = '';
  if (typeof window !== 'undefined') {
    pathname = window.location.pathname;
  }
  // Fallback SSR/Next
  if (!pathname && typeof globalThis !== "undefined") {
    // @ts-ignore
    if (globalThis.window) pathname = globalThis.window.location.pathname;
  }
  if (pathname.startsWith("/user/dashboard")) return null;
  return <Footer />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Happy+Monkey&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/design-mode/lg.png" type="image/png" />
      </head>
      <body>
        <Header />
        {children}
        <ShowFooter />
        <Toaster />
      </body>
    </html>
  )
}
