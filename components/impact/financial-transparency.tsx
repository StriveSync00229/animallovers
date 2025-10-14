"use client"

import { motion } from "framer-motion"
import { PieChart } from "lucide-react"

const FinancialTransparency = () => {
  // Données pour le graphique de répartition des dons
  const donationAllocation = [
    { category: "Soins vétérinaires", percentage: 40, color: "bg-rose-500" },
    { category: "Nourriture et produits", percentage: 25, color: "bg-yellow-500" },
    { category: "Refuges et infrastructures", percentage: 20, color: "bg-blue-500" },
    { category: "Sensibilisation", percentage: 10, color: "bg-green-500" },
    { category: "Administration", percentage: 5, color: "bg-gray-500" },
  ]

  // Données financières clés
  const financialHighlights = [
    { label: "Total des dons reçus", value: "1 245 780 €" },
    { label: "Nombre de donateurs", value: "8 547" },
    { label: "Don moyen", value: "145 €" },
    { label: "Croissance annuelle", value: "+18%" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Transparence financière</h2>
          <p className="text-lg text-gray-600">
            Nous nous engageons à une transparence totale sur l'utilisation des fonds qui nous sont confiés. Voici
            comment vos dons ont été utilisés au cours de l'année écoulée.
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
              Répartition des dons
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
            <h3 className="text-xl font-semibold text-gray-900">Chiffres clés</h3>

            <div className="grid grid-cols-2 gap-4">
              {financialHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-lg shadow-sm"
                >
                  <p className="mb-2 text-sm font-medium text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold text-rose-600">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">Évolution des dons</h4>
              <div className="h-64 bg-gray-100 rounded-lg">
                {/* Ici, on pourrait intégrer un graphique d'évolution des dons */}
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500">Graphique d'évolution des dons sur 5 ans</p>
                  <p className="text-sm text-gray-400">(Croissance annuelle moyenne de 15% depuis 2019)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FinancialTransparency
