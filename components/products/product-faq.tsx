"use client"

import Link from "next/link"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface ProductFaqProps {
  faqs: FAQ[]
}

export default function ProductFaq({ faqs }: ProductFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">Questions fréquentes</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between w-full p-4 text-left"
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div className={`px-4 pb-4 transition-all duration-300 ${openIndex === index ? "block" : "hidden"}`}>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 mt-8 text-center bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">
            Vous avez d'autres questions sur ce produit ?{" "}
            <Link href="/contact" className="font-medium text-rose-600 hover:underline">
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
