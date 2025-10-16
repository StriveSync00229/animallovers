"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Sec = { rlsEnabled: boolean; adminAccess: string; passwordPolicy: string; auditLog: boolean }

export default function AdminSecurityPage() {
  const [data, setData] = React.useState<Sec | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/admin/security")
        const json = await res.json()
        setData(json.data)
      } catch (e: any) {
        setError(e?.message || "Erreur")
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Sécurité</h1>
          <p className="text-gray-600">État des paramètres de sécurité (placeholder)</p>
        </div>

        {error ? (
          <div className="text-red-500">{error}</div>
        ) : !data ? (
          <div className="text-gray-500">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>RLS activé</CardTitle>
                <CardDescription>Row Level Security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{data.rlsEnabled ? "Oui" : "Non"}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accès admin</CardTitle>
                <CardDescription>Canal d'accès</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{data.adminAccess}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Politique mot de passe</CardTitle>
                <CardDescription>Complexité requise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{data.passwordPolicy}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Journal d'audit</CardTitle>
                <CardDescription>Suivi des actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{data.auditLog ? "Activé" : "Inactif"}</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}


