"use client"

import { motion, useInView } from "framer-motion"
import { Heart, Shield, Award, Smile, Users, Star } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

const features = [
  {
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    title: "Affection inconditionnelle",
    description: "Les animaux de compagnie offrent un amour sans jugement et une loyauté à toute épreuve.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: "Bienfaits sur la santé",
    description: "Réduction du stress, baisse de la pression artérielle et amélioration de la santé mentale.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Award className="w-6 h-6 text-yellow-500" />,
    title: "Responsabilité",
    description: "Prendre soin d'un animal développe le sens des responsabilités et l'empathie.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Smile className="w-6 h-6 text-green-500" />,
    title: "Compagnon de vie",
    description: "Un ami fidèle qui vous accompagne dans tous les moments de votre vie.",
    color: "from-green-500 to-emerald-500",
  },
]

const stats = [
  { icon: <Users className="w-8 h-8" />, value: "85%", label: "des propriétaires sont plus heureux" },
  { icon: <Heart className="w-8 h-8" />, value: "92%", label: "ressentent moins de solitude" },
  { icon: <Star className="w-8 h-8" />, value: "78%", label: "ont une meilleure santé mentale" },
]

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50 md:py-32">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-rose-700 bg-rose-100 rounded-full"
          >
            <Heart className="w-4 h-4 mr-2" />
            <span>L'importance des animaux</span>
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Pourquoi les animaux sont{" "}
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              essentiels
            </span>{" "}
            à notre bonheur
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Les chiens et les chats apportent bien plus que de la compagnie. Ils enrichissent nos vies de multiples
            façons et transforment notre quotidien en moments de pure joie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Enfant avec un chien"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -right-6 p-6 bg-white rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">2.5M+</div>
                <div className="text-sm text-gray-600">Animaux aidés</div>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 mr-6 bg-gradient-to-br ${feature.color} rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl text-white">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
