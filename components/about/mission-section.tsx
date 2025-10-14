"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const missions = [
  "Favoriser l'adoption responsable",
  "Sensibiliser à l'éducation animale bienveillante",
  "Soutenir les propriétaires en difficulté",
  "Créer un pont entre les refuges, les adoptants et les passionnés",
]

const MissionSection = () => {
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
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Notre mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Offrir une plateforme unique dédiée à la valorisation des chiens et des chats, en facilitant leur adoption,
            en promouvant leur bien-être, et en éduquant le public à travers du contenu utile, éthique et affectif.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {missions.map((mission, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-start mb-6">
              <div className="flex items-center justify-center w-10 h-10 mr-4 bg-[#c4d8b2] rounded-full shrink-0">
                <Check className="w-5 h-5 text-[#4a6741]" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-800">{mission}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default MissionSection
