"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const ImpactHero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-rose-50 to-white">
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Motif d'arrière-plan"
          fill
          className="object-cover"
        />
      </div>
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Rapport d'impact <span className="text-rose-600">2023-2024</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 md:text-2xl">
            Découvrez comment vos dons transforment concrètement la vie des animaux dans le besoin
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="px-6 py-3 text-lg font-medium text-white bg-rose-600 rounded-full">
              +8,500 animaux aidés
            </div>
            <div className="px-6 py-3 text-lg font-medium text-white bg-rose-600 rounded-full">
              +45 refuges soutenus
            </div>
            <div className="px-6 py-3 text-lg font-medium text-white bg-rose-600 rounded-full">
              92% des fonds en action directe
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

export default ImpactHero
