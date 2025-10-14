"use client"

import type React from "react"
import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Gift, Bell, Heart, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRef } from "react"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubscribed(true)
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 md:py-32 relative overflow-hidden"
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        {/* Floating icons */}
        {[Mail, Heart, Gift, Bell].map((Icon, i) => (
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
            className="absolute opacity-20 text-white"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-rose-700 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            <span>Newsletter exclusive</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Restez{" "}
            <span className="relative">
              informé
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-white/50 rounded-full"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 text-xl text-white/90 leading-relaxed"
          >
            Inscrivez-vous à notre newsletter pour recevoir des conseils exclusifs, des actualités passionnantes et des
            histoires inspirantes sur nos amis à quatre pattes.
          </motion.p>

          {!isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-grow relative">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder-gray-500 rounded-2xl shadow-lg focus:ring-2 focus:ring-white/50 text-lg px-6"
                    required
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="h-14 px-8 bg-white text-rose-500 hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mr-2" />
                      Inscription...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      S'inscrire
                    </div>
                  )}
                </Button>
              </form>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              >
                {[
                  {
                    icon: <Gift className="w-6 h-6" />,
                    title: "Offres exclusives",
                    desc: "Réductions spéciales réservées aux abonnés",
                  },
                  {
                    icon: <Bell className="w-6 h-6" />,
                    title: "Actualités en avant-première",
                    desc: "Soyez les premiers informés",
                  },
                  {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Conseils d'experts",
                    desc: "Tips et astuces pour vos animaux",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-white/20 rounded-xl text-white">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/80 text-sm">{benefit.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">Merci pour votre inscription !</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Vous recevrez bientôt nos dernières actualités et conseils exclusifs directement dans votre boîte mail.
                Préparez-vous à découvrir des contenus passionnants sur le monde animal !
              </p>

              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-2 text-green-600">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Bienvenue dans la communauté AnimalLovers</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSection
