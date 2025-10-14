"use client"

import { motion } from "framer-motion"
import { Shield, PieChart } from "lucide-react"

const TransparencySection = () => {
  // Données pour le graphique de répartition des dons
  const donationAllocation = [
    { category: "Soins vétérinaires", percentage: 40, color: "bg-rose-500" },
    { category: "Nourriture et produits", percentage: 25, color: "bg-yellow-500" },
    { category: "Refuges et infrastructures", percentage: 20, color: "bg-blue-500" },
    { category: "Sensibilisation", percentage: 10, color: "bg-green-500" },
    { category: "Administration", percentage: 5, color: "bg-gray-500" },
  ]

  return (
    <section className="py-16 bg-gray-50 md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Transparence & remerciements</h2>
          <p className="text-lg text-gray-600">
            Nous nous engageons à utiliser vos dons de manière responsable et transparente. Voici comment vos
            contributions sont réparties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="flex items-center text-xl font-semibold text-gray-900">
              <PieChart className="w-6 h-6 mr-2 text-rose-500" />
              Répartition de vos dons
            </h3>

            <div className="space-y-4">
              {donationAllocation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full">
                    <div className={`h-4 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-gray-600">
              Nous nous efforçons de minimiser les coûts administratifs pour que la majorité de vos dons aille
              directement aux animaux dans le besoin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="flex items-center text-xl font-semibold text-gray-900">
              <Shield className="w-6 h-6 mr-2 text-rose-500" />
              Notre engagement envers vous
            </h3>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-rose-100 rounded-full shrink-0">
                    <span className="font-semibold text-rose-500">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Transparence totale</p>
                    <p className="text-sm text-gray-600">
                      Nous publions des rapports détaillés sur l'utilisation des fonds.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-rose-100 rounded-full shrink-0">
                    <span className="font-semibold text-rose-500">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Reçus automatiques</p>
                    <p className="text-sm text-gray-600">Vous recevrez un reçu fiscal pour chaque don effectué.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-rose-100 rounded-full shrink-0">
                    <span className="font-semibold text-rose-500">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Suivi de l'impact</p>
                    <p className="text-sm text-gray-600">
                      Nous vous tenons informés des projets réalisés grâce à vos dons.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TransparencySection
