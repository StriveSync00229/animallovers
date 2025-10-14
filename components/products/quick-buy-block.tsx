"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"

interface QuickBuyBlockProps {
  image: string
  title: string
  price: number
  affiliateLink: string
}

export default function QuickBuyBlock({ image, title, price, affiliateLink }: QuickBuyBlockProps) {
  const [isSticky, setIsSticky] = useState(false)
  const { scrollY } = useScroll()

  // Transform opacity based on scroll position for desktop
  const opacity = useTransform(
    scrollY,
    [300, 400], // Start showing at 300px scroll, fully visible at 400px
    [0, 1],
  )

  // Check if we should show the sticky bar on mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsSticky(scrollPosition > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Desktop version - Fixed on the side */}
      <motion.div
        style={{ opacity }}
        className="fixed z-10 hidden p-4 bg-white border border-gray-200 rounded-lg shadow-lg right-4 top-24 w-72 lg:block"
      >
        <div className="flex items-center mb-4 space-x-4">
          <div className="relative w-20 h-20 overflow-hidden rounded-md shrink-0">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 line-clamp-2">{title}</h3>
            <p className="mt-1 text-xl font-bold text-rose-600">{price.toFixed(2)}€</p>
          </div>
        </div>
        <Button asChild className="w-full font-semibold bg-amber-500 hover:bg-amber-600">
          <a href={affiliateLink} target="_blank" rel="noreferrer nofollow noopener">
            Acheter sur Amazon
          </a>
        </Button>
      </motion.div>

      {/* Mobile version - Sticky at the bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-20 p-3 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300 lg:hidden ${
          isSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-md shrink-0">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
            <p className="text-lg font-bold text-rose-600">{price.toFixed(2)}€</p>
          </div>
          <Button asChild className="font-semibold bg-amber-500 hover:bg-amber-600">
            <a href={affiliateLink} target="_blank" rel="noreferrer nofollow noopener">
              Acheter
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
