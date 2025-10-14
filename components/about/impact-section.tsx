"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { PawPrint, Heart, BookOpen, DollarSign } from "lucide-react"

const impactData = [
  {
    icon: <PawPrint className="w-8 h-8 text-[#e07a5f]" />,
    title: "Adoptions facilitées",
    value: 1250,
    suffix: "+",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-[#4a6741]" />,
    title: "Dons collectés",
    value: 75000,
    prefix: "€",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-[#81b29a]" />,
    title: "Articles publiés",
    value: 320,
    suffix: "+",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#f2cc8f]" />,
    title: "Refuges partenaires",
    value: 45,
    suffix: "",
  },
]

const CountUp = ({ end, duration = 2, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      let start = 0
      const step = end / (duration * 60) // 60fps
      const timer = setInterval(() => {
        start += step
        if (start > end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [inView, end, duration])

  return (
    <div ref={ref} className="text-3xl font-bold text-gray-900 md:text-4xl">
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

const ImpactSection = () => {
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
    <section className="py-16 bg-[#f8f5f0] md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Notre impact</h2>
          <p className="text-lg text-gray-700">
            Depuis notre création, nous avons contribué à améliorer la vie de nombreux animaux. Voici quelques chiffres
            qui témoignent de notre engagement.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {impactData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-[#f8f5f0] rounded-full">
                {item.icon}
              </div>
              <CountUp end={item.value} prefix={item.prefix} suffix={item.suffix} />
              <h3 className="mt-2 text-lg font-medium text-gray-700">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactSection
