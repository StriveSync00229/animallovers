"use client"
import { motion } from "framer-motion"

export default function CatFoodHero() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615812214207-34e3be6812df?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nourriture & Friandises pour Chats</h1>
          <p className="text-xl text-white/90 mb-6">
            Une alimentation de qualité est essentielle pour la santé et le bien-être de votre félin. Découvrez notre
            sélection de produits premium adaptés à tous les âges et besoins spécifiques.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Découvrir nos produits
            </button>
            <button className="bg-white hover:bg-gray-100 text-rose-600 px-6 py-3 rounded-md font-medium transition-colors">
              Guide nutritionnel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
