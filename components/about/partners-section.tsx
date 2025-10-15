"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Partenaires & soutiens - utilisez des logos réels placés dans /public/partners
const partners = [
  { id: 1, name: "SPA", logo: "/partners/spa.svg" },
  { id: 2, name: "WWF", logo: "/partners/wwf.svg" },
  { id: 3, name: "Royal Canin", logo: "/partners/royal-canin.svg" },
  { id: 4, name: "Purina", logo: "/partners/purina.svg" },
  { id: 5, name: "Fondation Brigitte Bardot", logo: "/partners/fbb.svg" },
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
              <div className="relative w-28 h-14 mb-4 grayscale hover:grayscale-0 transition">
                <Image src={partner.logo} alt={partner.name} fill className="object-contain" draggable={false} />
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
