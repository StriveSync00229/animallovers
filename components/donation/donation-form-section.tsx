"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  CreditCard,
  DollarSign,
  Dog,
  Cat,
  Siren,
  Target,
  Lock,
  DollarSignIcon as PaypalLogo,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"

// Messages pour les montants
const amountMessages = {
  "5": "Avec 5€, vous offrez un repas et des soins de base à un animal.",
  "10": "Avec 10€, vous offrez 3 repas et une couverture chaude.",
  "20": "Avec 20€, vous contribuez à une visite vétérinaire complète.",
  "50": "Avec 50€, vous aidez à financer une opération chirurgicale urgente.",
  other: "Votre générosité, quel que soit le montant, fait une différence.",
}

const DonationFormSection = () => {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState("20")
  const [customAmount, setCustomAmount] = useState("")
  const [isMonthly, setIsMonthly] = useState(false)
  const [cause, setCause] = useState("general")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [saveCard, setSaveCard] = useState(false)

  const handleNextStep = () => {
    if (step === 1 && amount === "other" && (!customAmount || Number.parseFloat(customAmount) <= 0)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide.",
        variant: "destructive",
      })
      return
    }

    if (step === 3 && !email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email.",
        variant: "destructive",
      })
      return
    }

    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (paymentMethod: "card" | "paypal") => {
    setIsSubmitting(true)

    // Simulation d'un traitement de paiement
    try {
      // Ici, vous intégreriez votre logique de paiement réelle avec Stripe ou PayPal
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Merci pour votre don !",
        description: "Votre générosité va faire une différence dans la vie de nos amis à quatre pattes.",
        variant: "default",
      })

      // Redirection vers la page de remerciement
      window.location.href = "/merci-pour-votre-don"
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCurrentAmountMessage = () => {
    if (amount === "other") {
      return amountMessages.other
    }
    return amountMessages[amount as keyof typeof amountMessages] || ""
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  }

  return (
    <section id="donation-form" className="py-16 bg-gray-50 md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Faire un don</h2>
          <p className="text-lg text-gray-600">
            Votre soutien financier nous permet de continuer notre mission auprès des animaux dans le besoin.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            {/* Indicateur d'étapes */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= i ? "bg-rose-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i}
                  </div>
                  <span className="mt-2 text-xs text-gray-500">
                    {i === 1 ? "Montant" : i === 2 ? "Cause" : i === 3 ? "Coordonnées" : i === 4 ? "Paiement" : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* Formulaire par étapes */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Choisissez votre montant</h3>

                  <RadioGroup
                    value={amount}
                    onValueChange={setAmount}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                  >
                    {["5", "10", "20", "50"].map((value) => (
                      <div key={value}>
                        <RadioGroupItem value={value} id={`amount-${value}`} className="sr-only" />
                        <Label
                          htmlFor={`amount-${value}`}
                          className={`flex items-center justify-center h-16 text-lg font-semibold border-2 rounded-lg cursor-pointer ${
                            amount === value
                              ? "border-rose-500 bg-rose-50 text-rose-500"
                              : "border-gray-200 hover:border-rose-200"
                          }`}
                        >
                          {value}€
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="space-y-2">
                    <RadioGroup value={amount} onValueChange={setAmount} className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="amount-other" />
                      <Label htmlFor="amount-other" className="text-gray-700">
                        Autre montant
                      </Label>
                    </RadioGroup>

                    {amount === "other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center"
                      >
                        <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                        <Input
                          type="number"
                          min="1"
                          step="1"
                          placeholder="Montant personnalisé"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="flex-grow"
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="monthly" checked={isMonthly} onCheckedChange={(checked) => setIsMonthly(!!checked)} />
                    <Label htmlFor="monthly" className="text-gray-700">
                      Faire un don mensuel
                    </Label>
                  </div>

                  {/* Message sur l'impact du don */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 text-sm italic text-center text-gray-600 bg-gray-50 rounded-lg"
                  >
                    {getCurrentAmountMessage()}
                  </motion.div>

                  <div className="flex justify-end">
                    <Button onClick={handleNextStep} className="bg-rose-500 hover:bg-rose-600">
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Choisissez une cause à soutenir (facultatif)</h3>

                  <RadioGroup value={cause} onValueChange={setCause} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="dogs" id="cause-dogs" />
                      <Label htmlFor="cause-dogs" className="flex items-center cursor-pointer">
                        <Dog className="w-5 h-5 mr-2 text-rose-500" />
                        Chiens
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cats" id="cause-cats" />
                      <Label htmlFor="cause-cats" className="flex items-center cursor-pointer">
                        <Cat className="w-5 h-5 mr-2 text-rose-500" />
                        Chats
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="emergency" id="cause-emergency" />
                      <Label htmlFor="cause-emergency" className="flex items-center cursor-pointer">
                        <Siren className="w-5 h-5 mr-2 text-rose-500" />
                        Urgences
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="general" id="cause-general" />
                      <Label htmlFor="cause-general" className="flex items-center cursor-pointer">
                        <Target className="w-5 h-5 mr-2 text-rose-500" />
                        Projet général
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                    <Button onClick={handleNextStep} className="bg-rose-500 hover:bg-rose-600">
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Vos coordonnées</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700">
                        Prénom
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Votre prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">
                        Message (facultatif)
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Votre message de soutien"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="h-24"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                    <Button onClick={handleNextStep} className="bg-rose-500 hover:bg-rose-600">
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Paiement sécurisé</h3>

                  <div className="p-4 space-y-2 border rounded-lg">
                    <p className="font-semibold text-gray-700">Récapitulatif de votre don :</p>
                    <p className="text-gray-600">
                      Montant : <span className="font-medium">{amount === "other" ? customAmount : amount}€</span>{" "}
                      {isMonthly && <span className="text-rose-500">(mensuel)</span>}
                    </p>
                    <p className="text-gray-600">
                      Cause :{" "}
                      <span className="font-medium">
                        {cause === "dogs"
                          ? "Chiens"
                          : cause === "cats"
                            ? "Chats"
                            : cause === "emergency"
                              ? "Urgences"
                              : "Projet général"}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`flex items-center justify-center w-1/2 p-3 border rounded-lg ${
                          paymentMethod === "card" ? "border-rose-500 bg-rose-50" : "border-gray-200"
                        }`}
                      >
                        <CreditCard
                          className={`w-5 h-5 mr-2 ${paymentMethod === "card" ? "text-rose-500" : "text-gray-500"}`}
                        />
                        <span className={paymentMethod === "card" ? "text-rose-500 font-medium" : "text-gray-500"}>
                          Carte bancaire
                        </span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("paypal")}
                        className={`flex items-center justify-center w-1/2 p-3 border rounded-lg ${
                          paymentMethod === "paypal" ? "border-rose-500 bg-rose-50" : "border-gray-200"
                        }`}
                      >
                        <PaypalLogo
                          className={`w-5 h-5 mr-2 ${paymentMethod === "paypal" ? "text-rose-500" : "text-gray-500"}`}
                        />
                        <span className={paymentMethod === "paypal" ? "text-rose-500 font-medium" : "text-gray-500"}>
                          PayPal
                        </span>
                      </button>
                    </div>

                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 p-4 border rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="cardName" className="text-gray-700">
                            Nom du titulaire <span className="text-rose-500">*</span>
                          </Label>
                          <Input
                            id="cardName"
                            type="text"
                            placeholder="Nom sur la carte"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="text-gray-700">
                            Numéro de carte <span className="text-rose-500">*</span>
                          </Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => {
                              // Limiter à 16 chiffres et ajouter des espaces tous les 4 chiffres
                              const value = e.target.value.replace(/\D/g, "").substring(0, 16)
                              const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                              setCardNumber(formattedValue)
                            }}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate" className="text-gray-700">
                              Date d'expiration <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                              id="expiryDate"
                              type="text"
                              placeholder="MM/AA"
                              value={expiryDate}
                              onChange={(e) => {
                                // Formater la date d'expiration (MM/AA)
                                const value = e.target.value.replace(/\D/g, "").substring(0, 4)
                                if (value.length > 2) {
                                  setExpiryDate(`${value.substring(0, 2)}/${value.substring(2)}`)
                                } else {
                                  setExpiryDate(value)
                                }
                              }}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc" className="text-gray-700">
                              Code de sécurité <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                              id="cvc"
                              type="text"
                              placeholder="CVC"
                              value={cvc}
                              onChange={(e) => {
                                // Limiter à 3-4 chiffres
                                const value = e.target.value.replace(/\D/g, "").substring(0, 4)
                                setCvc(value)
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saveCard"
                            checked={saveCard}
                            onCheckedChange={(checked) => setSaveCard(!!checked)}
                          />
                          <Label htmlFor="saveCard" className="text-gray-700">
                            Enregistrer ma carte pour mes prochains dons
                          </Label>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "paypal" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 text-center border rounded-lg"
                      >
                        <p className="mb-4 text-gray-600">
                          Vous allez être redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                        </p>
                        <div className="flex justify-center">
                          <Image
                            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                            alt="PayPal"
                            width={111}
                            height={69}
                          />
                        </div>
                      </motion.div>
                    )}

                    <Button
                      onClick={() => handleSubmit(paymentMethod)}
                      disabled={
                        isSubmitting || (paymentMethod === "card" && (!cardName || !cardNumber || !expiryDate || !cvc))
                      }
                      className="w-full bg-rose-500 hover:bg-rose-600 h-14"
                    >
                      {isSubmitting ? (
                        "Traitement en cours..."
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          {paymentMethod === "card" ? "Payer par carte bancaire" : "Payer avec PayPal"}
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center p-3 text-sm text-center text-gray-500 bg-gray-50 rounded-lg">
                    <Lock className="w-4 h-4 mr-2 text-green-500" />
                    Paiement 100% sécurisé – chiffrement SSL
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationFormSection
