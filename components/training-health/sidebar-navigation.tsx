"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Heart,
  Dog,
  Leaf,
  Stethoscope,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  PawPrintIcon as Paw,
  VoteIcon as Vaccine,
  AlertTriangle,
  Scissors,
  Apple,
  Shield,
  Home,
  LassoIcon as Leash,
  FuelIcon as Oil,
  Bug,
  BiohazardIcon as Hygiene,
  Video,
  HelpCircle,
  Ambulance,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Category {
  name: string
  slug: string
  icon: React.ReactNode
  subcategories: {
    name: string
    slug: string
    icon: React.ReactNode
  }[]
}

const categories: Category[] = [
  {
    name: "Comportement & Éducation",
    slug: "comportement-education",
    icon: <Brain className="w-5 h-5" />,
    subcategories: [
      { name: "Les bases du dressage", slug: "bases-dressage", icon: <Paw className="w-4 h-4" /> },
      { name: "Techniques positives vs punitives", slug: "techniques-dressage", icon: <Shield className="w-4 h-4" /> },
      { name: "Langage corporel", slug: "langage-corporel", icon: <Dog className="w-4 h-4" /> },
      { name: "Anxiété et agressivité", slug: "anxiete-agressivite", icon: <AlertTriangle className="w-4 h-4" /> },
    ],
  },
  {
    name: "Santé & Bien-être",
    slug: "sante-bien-etre",
    icon: <Heart className="w-5 h-5" />,
    subcategories: [
      { name: "Calendrier de vaccination", slug: "vaccination", icon: <Vaccine className="w-4 h-4" /> },
      { name: "Maladies courantes", slug: "maladies-courantes", icon: <AlertTriangle className="w-4 h-4" /> },
      { name: "Stérilisation / castration", slug: "sterilisation", icon: <Scissors className="w-4 h-4" /> },
      { name: "Alimentation équilibrée", slug: "alimentation", icon: <Apple className="w-4 h-4" /> },
    ],
  },
  {
    name: "Dressage spécifique",
    slug: "dressage-specifique",
    icon: <Dog className="w-5 h-5" />,
    subcategories: [
      { name: "Chiens de garde/compagnie", slug: "chiens-specialises", icon: <Shield className="w-4 h-4" /> },
      { name: "Chats d'appartement/extérieur", slug: "chats-environnement", icon: <Home className="w-4 h-4" /> },
      { name: "Dressage à la laisse, au panier", slug: "dressage-specifique", icon: <Leash className="w-4 h-4" /> },
    ],
  },
  {
    name: "Remèdes naturels & soins",
    slug: "remedes-naturels",
    icon: <Leaf className="w-5 h-5" />,
    subcategories: [
      { name: "Huiles essentielles", slug: "huiles-essentielles", icon: <Oil className="w-4 h-4" /> },
      { name: "Recettes anti-puces/tiques", slug: "recettes-naturelles", icon: <Bug className="w-4 h-4" /> },
      { name: "Hygiène (oreilles, griffes, dents)", slug: "hygiene", icon: <Hygiene className="w-4 h-4" /> },
    ],
  },
  {
    name: "Conseils vétérinaires",
    slug: "conseils-veterinaires",
    icon: <Stethoscope className="w-5 h-5" />,
    subcategories: [
      { name: "Interviews de vétérinaires", slug: "interviews", icon: <Video className="w-4 h-4" /> },
      { name: "FAQ santé", slug: "faq-sante", icon: <HelpCircle className="w-4 h-4" /> },
      { name: "Urgences", slug: "urgences", icon: <Ambulance className="w-4 h-4" /> },
    ],
  },
  {
    name: "Produits recommandés",
    slug: "produits-recommandes",
    icon: <ShoppingBag className="w-5 h-5" />,
    subcategories: [
      { name: "Produits affiliés Amazon", slug: "produits-amazon", icon: <Star className="w-4 h-4" /> },
      { name: "Comparatifs", slug: "comparatifs", icon: <Star className="w-4 h-4" /> },
    ],
  },
]

interface SidebarNavigationProps {
  activeCategory?: string
}

const SidebarNavigation = ({ activeCategory }: SidebarNavigationProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(activeCategory ? [activeCategory] : [])

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]))
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Catégories</h2>

      <nav className="space-y-1">
        {categories.map((category) => (
          <div key={category.slug} className="mb-2">
            <button
              onClick={() => toggleCategory(category.slug)}
              className={cn(
                "flex items-center justify-between w-full p-3 text-left rounded-md transition-colors",
                expandedCategories.includes(category.slug)
                  ? "bg-rose-50 text-rose-700"
                  : "hover:bg-gray-50 text-gray-700",
              )}
            >
              <div className="flex items-center">
                <span className="mr-3 text-rose-500">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              {expandedCategories.includes(category.slug) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence>
              {expandedCategories.includes(category.slug) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-10 mt-1 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.slug}
                        href={`/dressage-sante?category=${category.slug}&subcategory=${subcategory.slug}`}
                        className="flex items-center py-2 pl-3 pr-4 text-sm text-gray-600 transition-colors rounded-md hover:bg-gray-50 hover:text-rose-500"
                      >
                        <span className="mr-2 text-gray-400">{subcategory.icon}</span>
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default SidebarNavigation
