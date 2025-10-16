"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, FileText, Package, Users } from "lucide-react"

type Analytics = {
  articlesCount: number
  productsCount: number
  usersCount: number
  donationsTotalLast30: number
  donationsCountLast30: number
}

export default function AdminAnalyticsPage() {
  const [data, setData] = React.useState<Analytics | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/admin/analytics")
        if (!res.ok) throw new Error(await res.text())
        const json = await res.json()
        setData(json.data)
      } catch (e: any) {
        setError(e?.message || "Erreur analytics")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-600">Indicateurs clés des 30 derniers jours</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Articles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.articlesCount}</div>
                <CardDescription>Total</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produits</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.productsCount}</div>
                <CardDescription>Total</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.usersCount}</div>
                <CardDescription>Total</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Donations (30j)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{Number(data.donationsTotalLast30).toLocaleString("fr-FR")}</div>
                <CardDescription>
                  <Badge variant="secondary">{data.donationsCountLast30} dons</Badge>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}


