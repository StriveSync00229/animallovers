"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setUserAuth } from "../../../lib/user-auth"

export default function UserLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Mode test - identifiants de test
    if (formData.email === "user@animallovers.fr" && formData.password === "user123") {
      setUserAuth({
        id: "1",
        email: formData.email,
        name: "Jean Dupont",
      })
      router.push("/user/dashboard")
    } else {
      setError("Email ou mot de passe incorrect")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeInUp">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 animate-fadeInScale">
              <Image
                src="/images/design-mode/lg.png"
                alt="AnimalLovers Logo"
                width={64}
                height={64}
                className="w-full h-full"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
              <p className="text-sm text-gray-600 mt-1">Accédez à votre espace personnel</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-fadeIn">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
              <LogIn className="w-4 h-4 mr-2" />
              Se connecter
            </Button>
          </form>

          {/* Test credentials info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-blue-900 mb-2">Mode Test - Identifiants :</p>
            <p className="text-blue-700">Email: user@animallovers.fr</p>
            <p className="text-blue-700">Mot de passe: user123</p>
          </div>

          {/* Register link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Pas encore de compte ? </span>
            <Link href="/user/register" className="text-red-600 hover:text-red-700 font-medium">
              S'inscrire
            </Link>
          </div>

          {/* Back to home */}
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
