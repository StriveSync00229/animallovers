"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Heart } from "lucide-react"
import Link from "next/link"

const ContactSection = () => {
  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl p-8 mx-auto text-center bg-[#f8f5f0] rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Rejoindre l'aventure</h2>
          <p className="mb-8 text-lg text-gray-700">
            Vous partagez nos valeurs et notre passion pour les animaux ? Parlons-en ! Que vous soyez un refuge, un
            vétérinaire, une marque ou simplement un amoureux des animaux, nous serions ravis de collaborer avec vous.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <Button asChild className="bg-[#4a6741] hover:bg-[#3a5331]">
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Contactez-nous
              </Link>
            </Button>
            <Button asChild className="bg-rose-500 hover:bg-rose-600">
              <Link href="/faire-un-don">
                <Heart className="w-5 h-5 mr-2" />
                Faire un don
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
