"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ExpertAdvice() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <motion.h2
          className="mb-12 text-3xl font-bold text-center text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Conseils de nos experts
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            className="relative h-full overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop"
              alt="Vétérinaire avec des animaux"
              width={600}
              height={800}
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Dr. Sophie Martin, Vétérinaire spécialiste multi-espèces
            </h3>

            <div className="mb-6 space-y-4 text-gray-600">
              <p>
                "Les packs multi-espèce représentent une solution intelligente pour les foyers qui accueillent
                différents types d'animaux. Ils permettent non seulement de réaliser des économies, mais aussi d'assurer
                une cohérence dans les soins apportés à vos compagnons."
              </p>
              <p>
                "Je recommande particulièrement les packs de soins essentiels qui contiennent des produits adaptés aux
                différentes espèces tout en étant compatibles entre eux. C'est un point crucial souvent négligé :
                certains produits pour chiens peuvent être toxiques pour les chats ou les rongeurs."
              </p>
              <p>
                "N'hésitez pas à consulter la composition détaillée de chaque pack et à me contacter si vous avez des
                questions spécifiques concernant les besoins particuliers de vos animaux."
              </p>
            </div>

            <Button className="self-start bg-rose-500 hover:bg-rose-600">Consulter nos guides</Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
