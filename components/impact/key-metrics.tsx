"use client"

import { motion } from "framer-motion"
import { Heart, Home, Stethoscope, Users, ShoppingBag, Award } from "lucide-react"

const metrics = [
  {
    icon: <Heart className="w-10 h-10 text-rose-500" />,
    value: "8,547",
    label: "Animaux aidés",
    description: "Animaux ayant reçu une aide directe grâce à vos dons",
  },
  {
    icon: <Home className="w-10 h-10 text-rose-500" />,
    value: "3,215",
    label: "Adoptions facilitées",
    description: "Animaux ayant trouvé un foyer grâce à notre réseau",
  },
  {
    icon: <Stethoscope className="w-10 h-10 text-rose-500" />,
    value: "12,430",
    label: "Soins vétérinaires",
    description: "Interventions médicales financées pour des animaux en détresse",
  },
  {
    icon: <Users className="w-10 h-10 text-rose-500" />,
    value: "45",
    label: "Refuges soutenus",
    description: "Structures d'accueil bénéficiant de notre soutien financier",
  },
  {
    icon: <ShoppingBag className="w-10 h-10 text-rose-500" />,
    value: "28,750 kg",
    label: "Nourriture distribuée",
    description: "Nourriture fournie aux refuges et associations partenaires",
  },
  {
    icon: <Award className="w-10 h-10 text-rose-500" />,
    value: "92%",
    label: "Efficacité financière",
    description: "Pourcentage des dons directement alloués aux actions terrain",
  },
]

const KeyMetrics = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            L'impact de votre générosité en chiffres
          </h2>
          <p className="text-lg text-gray-600">
            Grâce à votre soutien, nous avons pu accomplir des avancées significatives dans notre mission de protection
            et de bien-être animal. Voici les résultats concrets de votre générosité.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-8 text-center bg-white border rounded-lg shadow-sm"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-center w-20 h-20 mb-4 bg-rose-100 rounded-full">
                {metric.icon}
              </div>
              <h3 className="mb-2 text-3xl font-bold text-gray-900">{metric.value}</h3>
              <h4 className="mb-3 text-xl font-semibold text-rose-600">{metric.label}</h4>
              <p className="text-gray-600">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default KeyMetrics
