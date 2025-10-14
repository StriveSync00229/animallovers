"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Données fictives pour les partenaires
const partners = [
  {
    id: 1,
    name: "Refuge des Pattes",
    logo: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Association Féline",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Clinique Vétérinaire du Centre",
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "PetFood Premium",
    logo: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Fondation Animaux",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
]

const PartnersSection = () => {
  return (
    <section className="py-16 bg-[#f8f5f0] md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Nos partenaires & soutiens</h2>
          <p className="text-lg text-gray-700">
            Nous collaborons avec des refuges, des vétérinaires et des marques qui partagent nos valeurs et notre
            engagement pour le bien-être animal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5"
        >
          {partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="relative w-24 h-24 mb-4">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-900">{partner.name}</h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersSection
