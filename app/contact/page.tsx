"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Heart,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
      setFormData({ name: "", email: "", subject: "", message: "", type: "" })
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@animallovers.com",
      description: "Réponse sous 24h",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      description: "Lun-Ven 9h-18h",
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "123 Rue des Animaux, 75001 Paris",
      description: "Siège social",
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun-Ven: 9h-18h",
      description: "Sam: 10h-16h",
    },
  ]

  const faqItems = [
    {
      question: "Comment puis-je adopter un animal ?",
      answer:
        "Pour adopter un animal, rendez-vous dans notre section Adoptions où vous trouverez tous les animaux disponibles. Remplissez le formulaire de candidature et notre équipe vous contactera pour organiser une rencontre.",
    },
    {
      question: "Comment faire un don ?",
      answer:
        "Vous pouvez faire un don via notre page dédiée. Nous acceptons les dons ponctuels ou récurrents par carte bancaire, virement ou PayPal. Tous les dons sont déductibles fiscalement.",
    },
    {
      question: "Puis-je devenir bénévole ?",
      answer:
        "Bien sûr ! Nous recherchons toujours des bénévoles passionnés. Contactez-nous via ce formulaire en précisant vos disponibilités et vos compétences.",
    },
    {
      question: "Comment signaler un animal en détresse ?",
      answer:
        "En cas d'urgence, contactez-nous immédiatement par téléphone. Pour les situations moins urgentes, utilisez ce formulaire en sélectionnant 'Signalement' comme type de demande.",
    },
    {
      question: "Livrez-vous les produits partout en France ?",
      answer:
        "Oui, nous livrons dans toute la France métropolitaine. Les frais de port sont gratuits à partir de 50€ d'achat. La livraison prend généralement 2-3 jours ouvrés.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-rose-500 to-orange-500">
        <Image src="/images/contact-hero.jpg" alt="Contact" fill className="object-cover mix-blend-overlay" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Une question ? Un projet ? Notre équipe est là pour vous accompagner
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-rose-100 rounded-lg">
                      <info.icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-gray-700">{info.value}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carte */}
              <Card className="mt-8">
                <CardContent className="p-0">
                  <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Carte interactive</p>
                      <p className="text-sm">123 Rue des Animaux, Paris</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-6 h-6 text-rose-500 mr-2" />
                    Envoyez-nous un message
                  </CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted && (
                    <Alert className="mb-6 border-green-200 bg-green-50">
                      <Heart className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="type">Type de demande</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type de votre demande" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adoption">Adoption</SelectItem>
                          <SelectItem value="don">Don / Parrainage</SelectItem>
                          <SelectItem value="benevole">Bénévolat</SelectItem>
                          <SelectItem value="signalement">Signalement</SelectItem>
                          <SelectItem value="produit">Question produit</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Sujet de votre message"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-rose-500 mr-2" />
                Questions fréquentes
              </CardTitle>
              <CardDescription>Trouvez rapidement les réponses à vos questions les plus courantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border rounded-lg">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
