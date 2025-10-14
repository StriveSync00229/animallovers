"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "Rénovation du refuge Les Pattes Joyeuses",
    description:
      "Financement complet de la rénovation des espaces d'accueil pour chiens et chats, améliorant le confort et le bien-être de plus de 120 animaux en attente d'adoption.",
    image:
      "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    stats: [
      { label: "Budget alloué", value: "78 500 €" },
      { label: "Animaux bénéficiaires", value: "120+" },
      { label: "Durée du projet", value: "6 mois" },
    ],
  },
  {
    title: "Programme de stérilisation urbaine",
    description:
      "Mise en place d'un programme de stérilisation des chats errants dans 12 communes, permettant de contrôler humainement les populations félines et d'améliorer leurs conditions de vie.",
    image:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    stats: [
      { label: "Chats stérilisés", value: "1 845" },
      { label: "Communes participantes", value: "12" },
      { label: "Budget alloué", value: "92 300 €" },
    ],
  },
  {
    title: "Clinique vétérinaire mobile",
    description:
      "Acquisition et équipement d'une clinique vétérinaire mobile permettant d'apporter des soins aux animaux dans les zones rurales et aux personnes à mobilité réduite ou sans moyens de transport.",
    image:
      "https://images.unsplash.com/photo-1584794171574-fe3f84b43838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    stats: [
      { label: "Consultations réalisées", value: "3 420" },
      { label: "Communes desservies", value: "28" },
      { label: "Budget alloué", value: "145 000 €" },
    ],
  },
]

const ProjectsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Projets majeurs réalisés</h2>
          <p className="text-lg text-gray-600">
            Découvrez les initiatives concrètes que nous avons pu mener grâce à votre soutien, transformant durablement
            la vie des animaux et améliorant les infrastructures d'accueil.
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative w-full overflow-hidden rounded-lg aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">{project.title}</h3>
                <p className="mb-6 text-gray-600">{project.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {project.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-xl font-bold text-rose-600">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
