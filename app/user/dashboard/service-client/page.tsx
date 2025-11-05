"use client"

import { useState } from "react"
import { MessageSquare, Send, Paperclip, Smile, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  sender: "user" | "admin"
  text: string
  timestamp: string
  file?: { name: string; url: string }
}

export default function UserServiceClientPage() {
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "admin",
      text: "Bonjour ! Bienvenue sur notre service client. Comment puis-je vous aider aujourd'hui ?",
      timestamp: "09:00",
    },
    {
      id: "2",
      sender: "user",
      text: "Bonjour, j'ai une question concernant ma commande.",
      timestamp: "09:05",
    },
    {
      id: "3",
      sender: "admin",
      text: "Bien sûr ! Pouvez-vous me donner votre numéro de commande ?",
      timestamp: "09:06",
    },
  ])

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessageText("")

    // Simulate admin response
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "admin",
        text: "Merci pour votre message. Je vérifie cela pour vous immédiatement.",
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, adminResponse])
    }, 2000)
  }

  const handleFileUpload = () => {
    alert("Fonctionnalité de téléchargement de fichier (à implémenter avec un vrai backend)")
  }

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          <MessageSquare className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Client</h1>
          <p className="text-gray-600">Nous sommes là pour vous aider</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact info */}
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Téléphone</p>
                  <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                  <p className="text-xs text-gray-500 mt-1">Lun-Ven: 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Mail className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">support@animallovers.fr</p>
                  <p className="text-xs text-gray-500 mt-1">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Horaires</p>
                  <p className="text-sm text-gray-600">Lun-Ven: 9h-18h</p>
                  <p className="text-sm text-gray-600">Sam: 10h-16h</p>
                  <p className="text-xs text-gray-500 mt-1">Fermé le dimanche</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions fréquentes</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">Comment suivre ma commande ?</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">Politique de retour</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">Modes de paiement</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">Délais de livraison</p>
              </button>
            </div>
          </Card>
        </div>

        {/* Chat */}
        <Card className="lg:col-span-2 h-[700px] flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Service Client AnimalLovers</p>
              <p className="text-sm text-green-600">En ligne</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.sender === "user" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.file && (
                    <div className="mt-2 p-2 bg-white/10 rounded flex items-center gap-2">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-xs">{message.file.name}</span>
                    </div>
                  )}
                  <span className="text-xs opacity-70 mt-2 block">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleFileUpload}>
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Smile className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Écrivez votre message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Appuyez sur Entrée pour envoyer • Temps de réponse moyen: 2-5 minutes
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
