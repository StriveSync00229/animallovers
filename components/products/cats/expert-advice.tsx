"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ExpertAdvice() {
  return (
    <div className="my-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Conseils de nos experts vétérinaires</h2>
          <p className="text-gray-600">
            Nos vétérinaires partenaires partagent leurs recommandations pour une alimentation optimale.
          </p>
        </div>
        <Button variant="link" className="flex items-center text-rose-600 mt-2 md:mt-0">
          Tous les conseils <ArrowRight size={16} className="ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Dr. Sophie Martin</h3>
                  <p className="text-sm text-gray-500">Vétérinaire nutritionniste</p>
                </div>
              </div>

              <h4 className="font-medium text-lg mb-3">L'importance des protéines dans l'alimentation féline</h4>
              <p className="text-gray-700 mb-4">
                Les chats sont des carnivores stricts, ce qui signifie que leur organisme est conçu pour métaboliser
                principalement des protéines animales. Contrairement aux humains et même aux chiens, ils ne peuvent pas
                synthétiser certains acides aminés essentiels comme la taurine.
              </p>
              <p className="text-gray-700 mb-4">
                Une alimentation pauvre en protéines animales peut entraîner des carences nutritionnelles graves chez le
                chat. Je recommande de choisir des aliments contenant au moins 30% de protéines de haute qualité,
                idéalement d'origine animale.
              </p>
              <p className="text-gray-700">
                Attention aux aliments contenant trop de céréales ou de sous-produits végétaux comme ingrédients
                principaux, car ils ne correspondent pas aux besoins nutritionnels naturels de votre félin.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" />
                  <AvatarFallback>PD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Dr. Pierre Dubois</h3>
                  <p className="text-sm text-gray-500">Vétérinaire spécialiste félin</p>
                </div>
              </div>

              <h4 className="font-medium text-lg mb-3">Prévenir les problèmes urinaires par l'alimentation</h4>
              <p className="text-gray-700 mb-4">
                Les troubles urinaires sont fréquents chez les chats, particulièrement chez les mâles stérilisés. Une
                alimentation adaptée peut jouer un rôle crucial dans la prévention de ces problèmes.
              </p>
              <p className="text-gray-700 mb-4">
                Je conseille vivement d'incorporer des aliments humides dans le régime alimentaire de votre chat. Ils
                contribuent significativement à l'hydratation, diluent l'urine et réduisent ainsi le risque de formation
                de cristaux et de calculs.
              </p>
              <p className="text-gray-700">
                Pour les chats ayant déjà présenté des problèmes urinaires, des aliments spécifiques à pH contrôlé
                peuvent être nécessaires. N'hésitez pas à consulter votre vétérinaire pour obtenir des recommandations
                personnalisées adaptées à votre animal.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
