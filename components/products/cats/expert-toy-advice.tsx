"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExpertToyAdvice() {
  return (
    <section className="py-16 mb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Conseils d'experts pour choisir les jouets</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nos vétérinaires et comportementalistes félins partagent leurs recommandations pour choisir les jouets les
            mieux adaptés à votre chat.
          </p>
        </motion.div>

        <Tabs defaultValue="personality" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
            <TabsTrigger value="personality" className="py-3">
              Selon la personnalité
            </TabsTrigger>
            <TabsTrigger value="age" className="py-3">
              Selon l'âge
            </TabsTrigger>
            <TabsTrigger value="safety" className="py-3">
              Sécurité des jouets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Chat actif et énergique</h3>
                  <p className="text-gray-600 mb-4">
                    Pour les chats très actifs, privilégiez les jouets interactifs qui permettent de courir, sauter et
                    chasser :
                  </p>
                  <ul className="list-disc pl-5 mb-4 text-gray-600">
                    <li>Jouets à plumes qui imitent les mouvements des oiseaux</li>
                    <li>Balles rebondissantes et circuits de balles</li>
                    <li>Jouets électroniques avec mouvements imprévisibles</li>
                    <li>Tunnels de jeu et structures à escalader</li>
                  </ul>
                  <p className="text-gray-600">
                    Ces chats apprécient particulièrement les sessions de jeu intenses mais courtes, plusieurs fois par
                    jour.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Chat calme et observateur</h3>
                  <p className="text-gray-600 mb-4">Pour les chats plus posés qui préfèrent observer et réfléchir :</p>
                  <ul className="list-disc pl-5 mb-4 text-gray-600">
                    <li>Puzzles alimentaires qui stimulent l'intelligence</li>
                    <li>Jouets à herbe à chat pour la stimulation olfactive</li>
                    <li>Jouets plus petits qu'ils peuvent manipuler seuls</li>
                    <li>Jouets en peluche à câliner</li>
                  </ul>
                  <p className="text-gray-600">
                    Ces chats préfèrent souvent jouer seuls et apprécient les jouets qui stimulent leur réflexion.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-rose-50 rounded-lg">
                <h4 className="font-semibold mb-2">Le saviez-vous ?</h4>
                <p className="text-gray-700">
                  La personnalité de votre chat influence fortement ses préférences de jeu. Observer comment votre chat
                  interagit avec différents types de jouets vous aidera à identifier ceux qui correspondent le mieux à
                  son tempérament.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="age" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Chatons (0-12 mois)</h3>
                  <p className="text-gray-600 mb-4">
                    Les chatons sont en plein développement et ont besoin de jouets qui stimulent leur apprentissage :
                  </p>
                  <ul className="list-disc pl-5 mb-4 text-gray-600">
                    <li>Jouets légers et faciles à attraper</li>
                    <li>Jouets texturés pour la dentition</li>
                    <li>Petites balles et souris en peluche</li>
                    <li>Jouets interactifs simples</li>
                  </ul>
                  <p className="text-gray-600">
                    Évitez les jouets avec de petites pièces détachables qui pourraient être avalées.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Chats adultes (1-7 ans)</h3>
                  <p className="text-gray-600 mb-4">
                    Les chats adultes apprécient une variété de jouets pour rester stimulés :
                  </p>
                  <ul className="list-disc pl-5 mb-4 text-gray-600">
                    <li>Jouets interactifs plus complexes</li>
                    <li>Arbres à chat et structures d'escalade</li>
                    <li>Jouets électroniques</li>
                    <li>Puzzles alimentaires de difficulté moyenne</li>
                  </ul>
                  <p className="text-gray-600">Variez régulièrement les jouets pour maintenir leur intérêt.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Chats seniors (8+ ans)</h3>
                  <p className="text-gray-600 mb-4">
                    Les chats âgés ont besoin de jouets adaptés à leur mobilité réduite :
                  </p>
                  <ul className="list-disc pl-5 mb-4 text-gray-600">
                    <li>Jouets plus doux et plus légers</li>
                    <li>Jouets à herbe à chat pour stimulation sensorielle</li>
                    <li>Puzzles alimentaires simples</li>
                    <li>Jouets qui ne nécessitent pas de grands mouvements</li>
                  </ul>
                  <p className="text-gray-600">Des sessions de jeu plus courtes mais régulières sont idéales.</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-rose-50 rounded-lg">
                <h4 className="font-semibold mb-2">Conseil de vétérinaire</h4>
                <p className="text-gray-700">
                  "Adapter les jouets à l'âge de votre chat est essentiel pour son bien-être. Les besoins évoluent avec
                  l'âge, et les jouets doivent suivre cette évolution pour maintenir l'intérêt et préserver la santé
                  physique et mentale."
                  <br />
                  <span className="italic mt-1 block">— Dr. Marie Laurent, Vétérinaire spécialiste félin</span>
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Sécurité des jouets pour chats</h3>
                <p className="text-gray-600 mb-4">
                  La sécurité doit toujours être la priorité lors du choix des jouets pour votre félin. Voici quelques
                  conseils essentiels pour garantir que les moments de jeu restent sans danger :
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">À éviter</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Jouets avec de petites pièces détachables qui pourraient être avalées</li>
                    <li>Ficelles ou cordons longs qui présentent un risque d'étranglement</li>
                    <li>Matériaux toxiques ou contenant des produits chimiques nocifs</li>
                    <li>Jouets avec des bords tranchants ou des parties pointues</li>
                    <li>Jouets en plastique de mauvaise qualité qui peuvent se briser facilement</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Bonnes pratiques</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Inspecter régulièrement les jouets pour détecter tout signe d'usure</li>
                    <li>Remplacer les jouets endommagés immédiatement</li>
                    <li>Superviser votre chat lors de l'utilisation de nouveaux jouets</li>
                    <li>Choisir des jouets de taille appropriée pour éviter les risques d'ingestion</li>
                    <li>Privilégier les jouets spécifiquement conçus pour les chats</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg mb-6">
                <h4 className="font-semibold text-orange-700 mb-2">Attention particulière</h4>
                <p className="text-gray-700">
                  Soyez particulièrement vigilant avec les jouets contenant de l'herbe à chat (cataire). Bien que sans
                  danger pour la plupart des chats, certains peuvent avoir des réactions excessives. Introduisez ces
                  jouets progressivement et observez la réaction de votre chat.
                </p>
              </div>

              <div className="flex justify-center">
                <Button className="bg-rose-600 hover:bg-rose-700">Télécharger notre guide complet de sécurité</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
