"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { HelpCircle, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

interface QuizQuestion {
  question: string
  options: string[]
  weights: {
    chienGarde: number
    chienCompagnie: number
    chienGuide: number
    chatAppartement: number
    chatExterieur: number
  }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Quel est votre type de logement ?",
    options: [
      "Appartement sans extérieur",
      "Appartement avec balcon",
      "Maison avec petit jardin",
      "Maison avec grand jardin",
    ],
    weights: [
      { chienGarde: 0, chienCompagnie: 1, chienGuide: 0, chatAppartement: 3, chatExterieur: 0 },
      { chienGarde: 0, chienCompagnie: 2, chienGuide: 1, chatAppartement: 3, chatExterieur: 1 },
      { chienGarde: 2, chienCompagnie: 3, chienGuide: 2, chatAppartement: 2, chatExterieur: 2 },
      { chienGarde: 3, chienCompagnie: 3, chienGuide: 3, chatAppartement: 1, chatExterieur: 3 },
    ],
  },
  {
    question: "Combien de temps pouvez-vous consacrer quotidiennement au dressage ?",
    options: ["Moins de 15 minutes", "15-30 minutes", "30-60 minutes", "Plus d'une heure"],
    weights: [
      { chienGarde: 0, chienCompagnie: 1, chienGuide: 0, chatAppartement: 3, chatExterieur: 3 },
      { chienGarde: 1, chienCompagnie: 2, chienGuide: 1, chatAppartement: 2, chatExterieur: 2 },
      { chienGarde: 2, chienCompagnie: 3, chienGuide: 2, chatAppartement: 1, chatExterieur: 1 },
      { chienGarde: 3, chienCompagnie: 3, chienGuide: 3, chatAppartement: 0, chatExterieur: 0 },
    ],
  },
  {
    question: "Quelle est votre principale attente concernant votre animal ?",
    options: ["Compagnie et affection", "Protection du domicile", "Aide aux tâches quotidiennes", "Indépendance"],
    weights: [
      { chienGarde: 1, chienCompagnie: 3, chienGuide: 2, chatAppartement: 3, chatExterieur: 2 },
      { chienGarde: 3, chienCompagnie: 1, chienGuide: 1, chatAppartement: 0, chatExterieur: 2 },
      { chienGarde: 1, chienCompagnie: 1, chienGuide: 3, chatAppartement: 0, chatExterieur: 0 },
      { chienGarde: 0, chienCompagnie: 0, chienGuide: 0, chatAppartement: 3, chatExterieur: 3 },
    ],
  },
]

const TrainingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const calculateResults = () => {
    const scores = {
      chienGarde: 0,
      chienCompagnie: 0,
      chienGuide: 0,
      chatAppartement: 0,
      chatExterieur: 0,
    }

    answers.forEach((answerIndex, questionIndex) => {
      const question = quizQuestions[questionIndex]
      const weight = question.weights[answerIndex]

      scores.chienGarde += weight.chienGarde
      scores.chienCompagnie += weight.chienCompagnie
      scores.chienGuide += weight.chienGuide
      scores.chatAppartement += weight.chatAppartement
      scores.chatExterieur += weight.chatExterieur
    })

    // Trouver le score le plus élevé
    const maxScore = Math.max(
      scores.chienGarde,
      scores.chienCompagnie,
      scores.chienGuide,
      scores.chatAppartement,
      scores.chatExterieur,
    )

    // Déterminer le type de dressage recommandé
    if (maxScore === scores.chienGarde) {
      return {
        type: "Chien de garde",
        description:
          "Votre situation est idéale pour un chien de garde. Nous vous recommandons des techniques de dressage axées sur l'obéissance et la protection.",
        articleSlug: "dressage-chien-garde",
      }
    } else if (maxScore === scores.chienCompagnie) {
      return {
        type: "Chien de compagnie",
        description:
          "Un chien de compagnie serait parfait pour vous. Concentrez-vous sur la socialisation et les commandes de base pour une cohabitation harmonieuse.",
        articleSlug: "dressage-chien-compagnie",
      }
    } else if (maxScore === scores.chienGuide) {
      return {
        type: "Chien guide/d'assistance",
        description:
          "Vous pourriez envisager un chien guide ou d'assistance. Ce type de dressage nécessite beaucoup de patience et de constance.",
        articleSlug: "dressage-chien-guide",
      }
    } else if (maxScore === scores.chatAppartement) {
      return {
        type: "Chat d'appartement",
        description:
          "Un chat d'appartement correspond à votre mode de vie. Concentrez-vous sur l'enrichissement de son environnement intérieur.",
        articleSlug: "education-chat-appartement",
      }
    } else {
      return {
        type: "Chat d'extérieur",
        description:
          "Un chat ayant accès à l'extérieur serait idéal pour vous. Assurez-vous de lui apprendre à revenir à la maison et à reconnaître son territoire.",
        articleSlug: "education-chat-exterieur",
      }
    }
  }

  const result = showResults ? calculateResults() : null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-sm">
          {!quizStarted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Quel type de dressage pour votre animal ?</h2>
              <p className="mb-6 text-gray-600">
                Répondez à quelques questions simples pour découvrir quelle approche de dressage conviendrait le mieux à
                votre situation et à votre animal.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
                <Button onClick={startQuiz} className="bg-rose-500 hover:bg-rose-600">
                  Commencer le quiz
                </Button>
                <Button asChild variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50">
                  <Link href="/faire-un-don">Faire un don</Link>
                </Button>
              </div>
            </motion.div>
          ) : showResults ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Votre résultat</h2>
              <div className="p-4 mb-4 bg-rose-50 rounded-lg">
                <h3 className="mb-2 text-xl font-semibold text-rose-700">{result?.type}</h3>
                <p className="text-gray-700">{result?.description}</p>
              </div>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
                <Button asChild className="bg-rose-500 hover:bg-rose-600">
                  <a href={`/dressage-sante/${result?.articleSlug}`}>
                    Voir les conseils de dressage
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" onClick={resetQuiz}>
                  Recommencer le quiz
                </Button>
              </div>
            </motion.div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Question {currentQuestion + 1}/{quizQuestions.length}
                </h2>
                <span className="px-3 py-1 text-sm text-rose-700 bg-rose-100 rounded-full">
                  {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-4 text-lg font-medium text-gray-900">{quizQuestions[currentQuestion].question}</h3>

                  <RadioGroup className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          className="sr-only"
                          onClick={() => handleAnswer(index)}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex items-center w-full p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-rose-200"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TrainingQuiz
