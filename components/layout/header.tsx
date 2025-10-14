"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Heart, ShoppingBag, BookOpen, DollarSign, ChevronDown, Cat, Dog, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Dressage & Santé", href: "/dressage-sante", icon: <BookOpen className="w-4 h-4 mr-1" /> },
    { name: "Faire un don", href: "/faire-un-don", icon: <DollarSign className="w-4 h-4 mr-1" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-rose-500" />
          <span className="text-xl font-bold">AnimalLovers</span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center text-base font-semibold text-gray-700 tracking-wide transition-colors hover:text-rose-500"
            >
              {item.icon && item.icon}
              {item.name}
            </Link>
          ))}

          {/* Dropdown pour Produits */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-base font-semibold text-gray-700 tracking-wide transition-colors hover:text-rose-500">
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  Produits
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Catégories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/produits/chiens" className="flex items-center w-full cursor-pointer">
                    <Dog className="w-4 h-4 mr-2" />
                    Produits pour chiens
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/produits/chats" className="flex items-center w-full cursor-pointer">
                    <Cat className="w-4 h-4 mr-2" />
                    Produits pour chats
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/produits/catalogue" className="flex items-center w-full cursor-pointer">
                    Catalogue complet
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/produits/populaires" className="flex items-center w-full cursor-pointer">
                    Produits populaires
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Menu Contact après Produits */}
          <Link
            href="/contact"
            className="flex items-center text-base font-semibold text-gray-700 tracking-wide transition-colors hover:text-rose-500"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button asChild size="sm" className="bg-rose-500 hover:bg-rose-600">
            <Link href="/faire-un-don">Faire un don</Link>
          </Button>
        </div>

        {/* Menu mobile */}
        <button
          className="flex items-center md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 right-0 z-20 p-4 bg-white border-b shadow-lg md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center py-2 text-sm font-medium text-gray-700 transition-colors hover:text-rose-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && item.icon}
                {item.name}
              </Link>
            ))}

            {/* Section Produits pour mobile */}
            <div className="py-2 border-t border-b">
              <div className="flex items-center py-2 mb-2 text-sm font-medium text-gray-700">
                <ShoppingBag className="w-4 h-4 mr-1" />
                Produits
              </div>
              <div className="pl-5 space-y-2">
                <Link
                  href="/produits/chiens"
                  className="block py-1 text-sm text-gray-600 transition-colors hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Dog className="inline w-3 h-3 mr-1" /> Produits pour chiens
                </Link>
                <Link
                  href="/produits/chats"
                  className="block py-1 text-sm text-gray-600 transition-colors hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Cat className="inline w-3 h-3 mr-1" /> Produits pour chats
                </Link>
                <Link
                  href="/produits/catalogue"
                  className="block py-1 text-sm text-gray-600 transition-colors hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Catalogue complet
                </Link>
                <Link
                  href="/produits/populaires"
                  className="block py-1 text-sm text-gray-600 transition-colors hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produits populaires
                </Link>
              </div>
            </div>

            {/* Menu Contact pour mobile */}
            <Link
              href="/contact"
              className="flex items-center py-2 text-sm font-medium text-gray-700 transition-colors hover:text-rose-500"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Contact
            </Link>

            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Button asChild size="sm" className="justify-center bg-rose-500 hover:bg-rose-600">
                <Link href="/faire-un-don">Faire un don</Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default Header
