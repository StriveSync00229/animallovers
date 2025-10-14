"use client"

import { motion } from "framer-motion"
import { Coins, Clock, Package, ShieldCheck } from "lucide-react"

export function PackAdvantages() {
  const advantages = [
    {
      icon: <Coins className="w-10 h-10 text-rose-500" />,
      title: "Économies Garanties",
      description:
        "Nos packs multi-espèce vous permettent d'économiser jusqu'à 30% par rapport à l'achat individuel des produits. Une solution économique pour prendre soin de tous vos animaux.",
    },
    {
      icon: <Clock className="w-10 h-10 text-rose-500" />,
      title: "Gain de Temps",
      description:
        "Fini les recherches interminables pour chaque animal. Nos packs sont conçus pour répondre aux besoins de différentes espèces en une seule commande.",
    },
    {
      icon: <Package className="w-10 h-10 text-rose-500" />,
      title: "Produits Complémentaires",
      description:
        "Chaque pack est soigneusement composé pour offrir des produits complémentaires qui fonctionnent ensemble, assurant une expérience harmonieuse pour tous vos compagnons.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-rose-500" />,
      title: "Qualité Vérifiée",
      description:
        "Tous les produits inclus dans nos packs sont sélectionnés pour leur qualité et leur efficacité, testés et approuvés par nos vétérinaires partenaires.",
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.h2
          className="mb-12 text-3xl font-bold text-center text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Pourquoi choisir nos packs multi-espèce ?
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-rose-100 rounded-full">
                {advantage.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
