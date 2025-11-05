"use client"

import { useState } from "react"
import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const mockConversations = [
  {
    id: 1,
    userName: "Marie Dupont",
    userEmail: "marie@email.com",
    lastMessage: "Merci pour votre réponse rapide!",
    timestamp: "Il y a 5 min",
    unread: 2,
    status: "active",
  },
  {
    id: 2,
    userName: "Jean Martin",
    userEmail: "jean@email.com",
    lastMessage: "Quand recevrai-je ma commande?",
    timestamp: "Il y a 1h",
    unread: 1,
    status: "active",
  },
  {
    id: 3,
    userName: "Sophie Bernard",
    userEmail: "sophie@email.com",
    lastMessage: "Parfait, merci beaucoup!",
    timestamp: "Il y a 3h",
    unread: 0,
    status: "resolved",
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "user",
    userName: "Marie Dupont",
    content: "Bonjour, j'ai une question concernant les croquettes premium.",
    timestamp: "14:25",
  },
  {
    id: 2,
    sender: "admin",
    content: "Bonjour Marie! Je suis là pour vous aider. Quelle est votre question?",
    timestamp: "14:27",
  },
  {
    id: 3,
    sender: "user",
    userName: "Marie Dupont",
    content: "Est-ce que ces croquettes conviennent aux chiens sensibles?",
    timestamp: "14:28",
  },
  {
    id: 4,
    sender: "admin",
    content: "Oui, absolument! Ces croquettes sont spécialement formulées pour les chiens à estomac sensible.",
    timestamp: "14:30",
  },
]

export default function MessageriePage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [messageText, setMessageText] = useState("")

  return (
    <AdminLayoutWrapper title="Messagerie Client">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-fadeInUp">
            <CardHeader className="pb-3">
              <CardDescription>Messages Non Lus</CardDescription>
              <CardTitle className="text-3xl font-bold text-red-600">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Nécessitent une réponse</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Conversations Actives</CardDescription>
              <CardTitle className="text-3xl font-bold">28</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">En cours</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Résolues Aujourd'hui</CardDescription>
              <CardTitle className="text-3xl font-bold text-green-600">15</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Problèmes réglés</p>
            </CardContent>
          </Card>
          <Card className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Temps de Réponse Moyen</CardDescription>
              <CardTitle className="text-3xl font-bold">12min</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">-3min vs hier</p>
            </CardContent>
          </Card>
        </div>

        {/* Messaging Interface */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-0">
            <div className="flex h-[600px]">
              {/* Conversations List */}
              <div className="w-80 border-r border-gray-200 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <Input placeholder="Rechercher une conversation..." />
                </div>
                <div className="divide-y divide-gray-200">
                  {mockConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedConversation === conv.id ? "bg-red-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 font-bold">{conv.userName.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{conv.userName}</p>
                            <p className="text-xs text-gray-500">{conv.userEmail}</p>
                          </div>
                        </div>
                        {conv.unread > 0 && <Badge className="bg-red-600 text-white">{conv.unread}</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-1">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-500">{conv.timestamp}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold">M</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Marie Dupont</p>
                          <p className="text-sm text-gray-500">marie@email.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Marquer comme résolu
                      </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                      <div className="space-y-4">
                        {mockMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-md ${
                                message.sender === "admin" ? "bg-red-600 text-white" : "bg-white text-gray-900"
                              } p-3 rounded-lg shadow-sm`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === "admin" ? "text-red-100" : "text-gray-500"
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Écrivez votre message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          📎
                        </Button>
                        <Button variant="outline" size="icon">
                          😊
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700">Envoyer</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Sélectionnez une conversation pour commencer
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayoutWrapper>
  )
}
