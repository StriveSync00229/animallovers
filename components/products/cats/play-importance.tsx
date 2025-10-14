"use client"

import { motion } from "framer-motion"
import { Brain, Heart, Activity, Target } from "lucide-react"

export default function PlayImportance() {
  const benefits = [
    {
      icon: <Brain className="h-10 w-10 text-rose-600" />,
      title: "Stimulation mentale",
      description:
        "Le jeu stimule l'intelligence de votre chat et prévient l'ennui, réduisant ainsi les comportements destructeurs.",
    },
    {
      icon: <Activity className="h-10 w-10 text-rose-600" />,
      title: "Exercice physique",
      description:
        "Les jouets encouragent l'activité physique, aidant à maintenir un poids santé et à prévenir l'obésité féline.",
    },
    {
      icon: <Target className="h-10 w-10 text-rose-600" />,
      title: "Instinct de chasse",
      description:
        "Les jouets permettent à votre chat d'exprimer ses instincts naturels de chasse, essentiels à son bien-être.",
    },
    {
      icon: <Heart className="h-10 w-10 text-rose-600" />,
      title: "Lien affectif",
      description: "Jouer avec votre chat renforce votre relation et crée des moments de complicité précieux.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 rounded-xl mb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Pourquoi le jeu est essentiel pour votre chat</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Le jeu n'est pas seulement amusant pour votre félin, c'est un besoin fondamental pour sa santé physique et
            mentale. Découvrez pourquoi les jouets sont indispensables au bien-être de votre compagnon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop"
                alt="Chat jouant"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Combien de temps de jeu par jour ?</h3>
              <p className="text-gray-600 mb-4">
                Les experts recommandent au moins 15 à 30 minutes de jeu actif par jour, idéalement réparties en
                plusieurs sessions. Les chatons et les jeunes chats peuvent nécessiter jusqu'à une heure de jeu
                quotidien.
              </p>
              <p className="text-gray-600">
                Variez les types de jouets pour stimuler différents comportements : des jouets à poursuivre, des jouets
                à attraper, des puzzles alimentaires, et des jouets interactifs. Cette diversité permet de satisfaire
                tous les instincts naturels de votre félin.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
