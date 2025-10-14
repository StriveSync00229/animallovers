"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f5f0] py-20 md:py-28">
      <div className="container px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              À propos d'AnimalLovers
            </h1>
            <p className="text-xl leading-relaxed text-gray-700 md:text-2xl">
              AnimalLovers est bien plus qu'un site. C'est un engagement pour la vie, le bien-être et l'amour
              inconditionnel que nous offrent les chiens et les chats.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="L'équipe AnimalLovers avec des animaux"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Formes décoratives */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-[10%] right-[5%] w-64 h-64 bg-[#e9d8c4] rounded-full filter blur-3xl opacity-20"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-[10%] left-[5%] w-64 h-64 bg-[#c4d8b2] rounded-full filter blur-3xl opacity-20"
        />
      </div>
    </section>
  )
}

export default AboutHero
