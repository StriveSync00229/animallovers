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
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

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

  const [campaignId, setCampaignId] = useState<string | null>(null)
  
  // Données de carte bancaire
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiryMonth, setCardExpiryMonth] = useState("")
  const [cardExpiryYear, setCardExpiryYear] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")
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

  const handleSubmit = async () => {
    const finalAmount = amount === "other" ? customAmount : amount
    
    // Validation
    if (!finalAmount || Number.parseFloat(finalAmount) <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide.",
        variant: "destructive",
      })
      return
    }

    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email.",
        variant: "destructive",
      })
      return
    }

    if (!cardNumber || !cardExpiryMonth || !cardExpiryYear || !cardCvv || !cardholderName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir toutes les informations de carte bancaire.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Envoyer les données au serveur pour traitement
      const response = await fetch("/api/donations/process-card-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          cardNumber: cardNumber.replace(/\s/g, ""),
          cardExpiryMonth,
          cardExpiryYear,
          cardCvv,
          cardholderName,
          email,
          firstName,
          lastName: "", // Si vous avez un champ lastName
          cause,
          campaignId,
          isMonthly,
          message,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Erreur lors du traitement du paiement")
      }

      toast({
        title: "Merci pour votre don !",
        description: "Votre générosité va faire une différence dans la vie de nos amis à quatre pattes.",
        variant: "default",
      })

      // Redirection vers la page de remerciement
      setTimeout(() => {
        window.location.href = "/merci-pour-votre-don"
      }, 1500)
    } catch (error: any) {
      console.error("Erreur lors du paiement:", error)
      toast({
        title: "Erreur de paiement",
        description: error.message || "Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.",
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
                    <div className="p-4 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-semibold text-blue-900 mb-1">Paiement sécurisé avec KKiaPay</p>
                      <p>Vos informations de carte sont traitées de manière sécurisée et ne sont jamais stockées complètement.</p>
                    </div>

                    {/* Formulaire de carte bancaire */}
                    <form
                      autoComplete="on"
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                      }}
                      className="space-y-4 p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName" className="text-gray-700">
                          Nom du titulaire de la carte <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="cardholderName"
                          name="cardholderName"
                          type="text"
                          autoComplete="cc-name"
                          placeholder="Nom tel qu'il apparaît sur la carte"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-gray-700">
                          Numéro de carte <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => {
                            // Formater le numéro de carte avec des espaces tous les 4 chiffres
                            const value = e.target.value.replace(/\D/g, "").substring(0, 16)
                            const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                            setCardNumber(formattedValue)
                          }}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiryMonth" className="text-gray-700">
                            Mois <span className="text-rose-500">*</span>
                          </Label>
                          <Input
                            id="cardExpiryMonth"
                            name="cardExpiryMonth"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-exp-month"
                            placeholder="MM"
                            maxLength={2}
                            value={cardExpiryMonth}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").substring(0, 2)
                              if (value === "" || (Number.parseInt(value) >= 1 && Number.parseInt(value) <= 12)) {
                                setCardExpiryMonth(value)
                              }
                            }}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiryYear" className="text-gray-700">
                            Année <span className="text-rose-500">*</span>
                          </Label>
                          <Input
                            id="cardExpiryYear"
                            name="cardExpiryYear"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-exp-year"
                            placeholder="AAAA"
                            maxLength={4}
                            value={cardExpiryYear}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").substring(0, 4)
                              setCardExpiryYear(value)
                            }}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv" className="text-gray-700">
                            CVV <span className="text-rose-500">*</span>
                          </Label>
                          <Input
                            id="cardCvv"
                            name="cardCvv"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            placeholder="123"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").substring(0, 4)
                              setCardCvv(value)
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
                        <Label htmlFor="saveCard" className="text-gray-700 text-sm">
                          Enregistrer cette carte pour mes prochains dons (toutes les informations seront stockées)
                        </Label>
                      </div>
                    </form>

                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-rose-500 hover:bg-rose-600 h-14"
                    >
                      {isSubmitting ? (
                        "Traitement du paiement..."
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Payer {amount === "other" ? customAmount : amount}€
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
