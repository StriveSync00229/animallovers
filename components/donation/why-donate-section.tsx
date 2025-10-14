"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PawPrint, Stethoscope, Home, ShoppingBag, BarChart } from "lucide-react"
import Link from "next/link"

const reasons = [
  {
    icon: <PawPrint className="w-10 h-10 text-rose-500" />,
    title: "1 don = 1 repas",
    description: "Chaque don permet de nourrir un animal abandonné et de lui offrir les soins nécessaires.",
  },
  {
    icon: <Stethoscope className="w-10 h-10 text-rose-500" />,
    title: "Soutien vétérinaire",
    description: "Vos dons financent les soins vétérinaires urgents pour les animaux malades ou blessés.",
  },
  {
    icon: <Home className="w-10 h-10 text-rose-500" />,
    title: "Faciliter l'adoption",
    description: "Nous aidons les refuges à améliorer leurs infrastructures pour le bien-être des animaux.",
  },
  {
    icon: <ShoppingBag className="w-10 h-10 text-rose-500" />,
    title: "Produits essentiels",
    description: "Achat de litière, colliers, jouets et autres produits indispensables au quotidien.",
  },
]

const WhyDonateSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Pourquoi donner ?</h2>
          <p className="text-lg text-gray-600">
            Votre générosité a un impact direct sur la vie des animaux dans le besoin. Découvrez comment votre don fait
            la différence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-6 text-center bg-white border rounded-lg shadow-sm"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-center w-20 h-20 mb-4 bg-rose-100 rounded-full">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="flex items-center">
            <Link href="/impact">
              <BarChart className="w-5 h-5 mr-2" />
              Voir notre rapport d'impact
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default WhyDonateSection
