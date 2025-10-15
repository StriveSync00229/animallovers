"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PawPrint, Heart, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 blur-3xl"
        />

        {/* Floating paw prints */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -60, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            className={`absolute opacity-10 ${i % 2 === 0 ? "text-rose-400" : "text-orange-400"}`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          >
            <PawPrint className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="container relative z-10 px-4 py-20 mx-auto">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2 min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-rose-700 bg-white/80 backdrop-blur-sm rounded-full w-fit shadow-lg border border-rose-100"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              <span>Pour l'amour des animaux</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl leading-snug"
            >
              Donnez une{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  seconde chance
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                />
              </span>{" "}
              à nos amis à quatre pattes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-600 md:text-2xl leading-relaxed"
            >
              Découvrez l'importance des chiens et des chats dans notre vie quotidienne, facilitez leur adoption et
              contribuez à leur bien-être avec amour et compassion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/produits" className="flex items-center">
                  <PawPrint className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Découvrir nos produits
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-2 border-rose-300 hover:border-rose-500 hover:bg-rose-50 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <Link href="/faire-un-don" className="flex items-center">Faire un don</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              {[
                { number: "2,500+", label: "Animaux sauvés" },
                { number: "1,200+", label: "Familles heureuses" },
                { number: "50+", label: "Partenaires" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
                >
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Chien et chat ensemble"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-6 -left-6 p-4 bg-white rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Adoption réussie</div>
                  <div className="text-sm text-gray-600">Max a trouvé sa famille !</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Nouveau produit</div>
                  <div className="text-sm text-gray-600">Jouet interactif disponible</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
