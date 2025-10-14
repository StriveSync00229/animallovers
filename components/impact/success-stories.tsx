"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const stories = [
  {
    name: "Luna",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1686&q=80",
    story:
      "Trouvée gravement blessée sur le bord d'une route, Luna a pu bénéficier d'une opération chirurgicale d'urgence et d'une rééducation complète grâce aux dons. Aujourd'hui, elle coule des jours heureux dans sa famille adoptive.",
    outcome: "Adoptée après 3 mois de soins",
  },
  {
    name: "Max",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    story:
      "Abandonné à l'âge de 10 ans, Max souffrait de problèmes cardiaques nécessitant un traitement coûteux. Grâce à notre programme de soins pour animaux seniors, il a pu recevoir le traitement nécessaire et trouver une nouvelle famille aimante.",
    outcome: "Traitement à vie financé",
  },
  {
    name: "Nala",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    story:
      "Sauvée d'un élevage illégal avec 27 autres chiens, Nala était terrorisée et n'avait jamais connu la vie en dehors d'une cage. Après 6 mois de réhabilitation comportementale, elle s'est transformée en une chienne joyeuse et confiante.",
    outcome: "Complètement réhabilitée",
  },
]

const SuccessStories = () => {
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
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Histoires de réussite</h2>
          <p className="text-lg text-gray-600">
            Derrière les chiffres se cachent de véritables histoires de transformation. Voici quelques-uns des animaux
            dont la vie a été changée grâce à votre générosité.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden bg-white border rounded-lg shadow-sm"
            >
              <div className="relative w-full h-64">
                <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-2xl font-bold text-white">{story.name}</h3>
                  <p className="text-sm text-white/80">{story.outcome}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{story.story}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SuccessStories
