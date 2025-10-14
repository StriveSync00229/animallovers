"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Cat, Award, Leaf } from "lucide-react"

export default function NutritionGuide() {
  return (
    <div className="my-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Guide Nutritionnel Félin</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Comprendre les besoins nutritionnels de votre chat est essentiel pour sa santé et son bien-être. Découvrez nos
          conseils adaptés à chaque étape de sa vie.
        </p>
      </div>

      <Tabs defaultValue="kitten" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
          <TabsTrigger value="kitten">Chatons (0-12 mois)</TabsTrigger>
          <TabsTrigger value="adult">Chats adultes (1-7 ans)</TabsTrigger>
          <TabsTrigger value="senior">Chats seniors (8+ ans)</TabsTrigger>
        </TabsList>

        <TabsContent value="kitten">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-lg overflow-hidden h-full">
                <img
                  src="https://images.unsplash.com/photo-1570824104453-508955ab713e?q=80&w=2011&auto=format&fit=crop"
                  alt="Chaton mangeant"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Nutrition des chatons</h3>
              <p className="text-gray-700 mb-4">
                Les chatons ont des besoins énergétiques élevés pour soutenir leur croissance rapide. Leur alimentation
                doit être riche en protéines de haute qualité, en graisses et en nutriments essentiels comme le DHA pour
                le développement cérébral.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <Cat size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Fréquence des repas</h4>
                    <p className="text-sm text-gray-600">
                      3-4 petits repas par jour jusqu'à 6 mois, puis 2-3 repas jusqu'à 12 mois.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <Award size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Nutriments clés</h4>
                    <p className="text-sm text-gray-600">
                      Protéines (30-40%), DHA, calcium, phosphore, taurine et vitamine E.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <AlertCircle size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Points d'attention</h4>
                    <p className="text-sm text-gray-600">
                      Évitez le lait de vache qui peut causer des troubles digestifs. Privilégiez les aliments
                      spécifiquement formulés pour chatons.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="adult">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden h-full">
              <img
                src="https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?q=80&w=2064&auto=format&fit=crop"
                alt="Chat adulte mangeant"
                className="w-full h-[300px] object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Nutrition des chats adultes</h3>
              <p className="text-gray-700 mb-4">
                Les chats adultes ont besoin d'une alimentation équilibrée pour maintenir leur poids idéal et leur santé
                globale. Les protéines restent essentielles, mais les besoins caloriques sont moindres que ceux des
                chatons.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <Cat size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Fréquence des repas</h4>
                    <p className="text-sm text-gray-600">
                      2 repas par jour, avec une attention particulière aux portions pour éviter le surpoids.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <Leaf size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Besoins spécifiques</h4>
                    <p className="text-sm text-gray-600">
                      Les chats stérilisés ont des besoins caloriques réduits et nécessitent une alimentation adaptée
                      pour prévenir l'obésité et les problèmes urinaires.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <Award size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Nutriments clés</h4>
                    <p className="text-sm text-gray-600">
                      Protéines (25-35%), acides gras essentiels, taurine, vitamines A, D et E, et minéraux.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="senior">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden h-full">
              <img
                src="https://images.unsplash.com/photo-1548546738-8509cb246ed3?q=80&w=1974&auto=format&fit=crop"
                alt="Chat senior se reposant"
                className="w-full h-[300px] object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Nutrition des chats seniors</h3>
              <p className="text-gray-700 mb-4">
                Les chats âgés ont des besoins nutritionnels qui évoluent. Leur métabolisme ralentit et ils peuvent
                développer des problèmes de santé nécessitant une ralentit et ils peuvent développer des problèmes de
                santé nécessitant une attention particulière à leur alimentation.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <Cat size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Digestibilité</h4>
                    <p className="text-sm text-gray-600">
                      Les aliments pour chats seniors doivent être hautement digestibles et appétents pour compenser la
                      diminution des capacités digestives et sensorielles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <AlertCircle size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Problèmes de santé courants</h4>
                    <p className="text-sm text-gray-600">
                      Formulations spécifiques pour soutenir la fonction rénale, la santé articulaire et le système
                      immunitaire affaibli.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-rose-100 p-2 rounded-full">
                    <Award size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Nutriments clés</h4>
                    <p className="text-sm text-gray-600">
                      Protéines de haute qualité (mais parfois réduites pour les problèmes rénaux), antioxydants, acides
                      gras oméga-3, glucosamine et chondroïtine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="text-rose-600" size={24} />
              </div>
              <h3 className="font-bold text-lg">Ingrédients de qualité</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Privilégiez les aliments contenant des protéines animales en premier ingrédient et évitez les
              sous-produits de qualité inférieure et les additifs artificiels.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cat className="text-rose-600" size={24} />
              </div>
              <h3 className="font-bold text-lg">Hydratation</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Les chats ont naturellement un faible instinct de soif. Les aliments humides peuvent contribuer à leur
              apport en eau et prévenir les problèmes urinaires.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="text-rose-600" size={24} />
              </div>
              <h3 className="font-bold text-lg">Transition alimentaire</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Tout changement d'alimentation doit se faire progressivement sur 7-10 jours pour éviter les troubles
              digestifs et permettre à votre chat de s'adapter.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
