"use client"

import { motion } from "framer-motion"
import { Heart, BookOpen, RefreshCw, Shield } from "lucide-react"

const values = [
  {
    icon: <Heart className="w-10 h-10 text-[#e07a5f]" />,
    title: "Respect de l'animal",
    description:
      "Nous plaçons le bien-être et la dignité de chaque animal au centre de nos actions et de nos décisions.",
  },
  {
    icon: <Shield className="w-10 h-10 text-[#4a6741]" />,
    title: "Éthique & bienveillance",
    description: "Nous promouvons une approche éthique et bienveillante dans la relation entre l'humain et l'animal.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-[#81b29a]" />,
    title: "Éducation & sensibilisation",
    description:
      "Nous croyons au pouvoir de l'éducation pour changer les comportements et améliorer la vie des animaux.",
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-[#f2cc8f]" />,
    title: "Transparence & engagement",
    description:
      "Nous nous engageons à être transparents dans nos actions et à tenir nos promesses envers les animaux et nos partenaires.",
  },
]

const ValuesSection = () => {
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
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Nos valeurs</h2>
          <p className="text-lg text-gray-700">
            Ces principes guident chacune de nos actions et décisions au quotidien.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-6 text-center bg-[#f8f5f0] rounded-lg shadow-sm"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-center w-20 h-20 mb-4 bg-white rounded-full">{value.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ValuesSection
