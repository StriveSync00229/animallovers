"use client"

import { motion } from "framer-motion"
import { Target, TrendingUp, Users, Building, Globe } from "lucide-react"

const goals = [
  {
    icon: <Target className="w-10 h-10 text-rose-500" />,
    title: "Objectif 2025",
    description: "Atteindre 12 000 animaux aidés annuellement",
    progress: 70,
  },
  {
    icon: <Building className="w-10 h-10 text-rose-500" />,
    title: "Nouveau centre de soins",
    description: "Ouverture d'un centre de soins spécialisé pour animaux sauvages",
    progress: 45,
  },
  {
    icon: <Users className="w-10 h-10 text-rose-500" />,
    title: "Réseau de bénévoles",
    description: "Étendre notre réseau à 1 000 bénévoles actifs",
    progress: 60,
  },
  {
    icon: <Globe className="w-10 h-10 text-rose-500" />,
    title: "Expansion géographique",
    description: "Étendre nos actions à 5 nouvelles régions",
    progress: 30,
  },
]

const FutureGoals = () => {
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
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Nos objectifs futurs</h2>
          <p className="text-lg text-gray-600">
            Nous avons de grandes ambitions pour l'avenir. Découvrez les projets que nous souhaitons réaliser dans les
            prochaines années grâce à votre soutien continu.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col p-6 bg-white border rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-center w-20 h-20 mb-4 bg-rose-100 rounded-full">
                {goal.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{goal.title}</h3>
              <p className="mb-6 text-gray-600">{goal.description}</p>
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Progression</span>
                  <span className="text-sm font-semibold text-gray-900">{goal.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div className="h-3 rounded-full bg-rose-500" style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl p-6 mx-auto mt-16 text-center bg-rose-50 rounded-lg"
        >
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-rose-500" />
          <h3 className="mb-3 text-2xl font-bold text-gray-900">Plan stratégique 2025</h3>
          <p className="text-gray-600">
            Notre plan stratégique quinquennal vise à augmenter notre impact de 50% tout en maintenant notre efficacité
            financière au-dessus de 90%. Nous prévoyons d'étendre nos programmes à de nouvelles régions et d'investir
            dans des infrastructures durables.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FutureGoals
