"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { setAdminAuth } from "../../../lib/admin-auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Test credentials: admin@animallovers.fr / admin123
    if (email === "admin@animallovers.fr" && password === "admin123") {
      setAdminAuth({
        id: "1",
        email,
        name: "Admin AnimalLovers",
        role: "admin",
      })
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 500)
    } else {
      setError("Email ou mot de passe incorrect")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeInScale">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%201%20nov.%202025%2C%2019_57_13-swunlmmQEJUwVb0khHxHdtd9x9wb1G.png"
                  alt="AnimalLovers Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Administration</CardTitle>
            <CardDescription className="text-base text-gray-600">
              Connectez-vous pour accéder au tableau de bord
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@animallovers.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-fadeInUp">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 font-medium mb-2">Mode Test - Identifiants:</p>
                <p className="text-xs text-blue-700">Email: admin@animallovers.fr</p>
                <p className="text-xs text-blue-700">Mot de passe: admin123</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
