"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Reports = {
  totals: { articles: number; products: number; users: number }
}

export default function AdminReportsPage() {
  const [data, setData] = React.useState<Reports | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/admin/reports")
        if (!res.ok) throw new Error(await res.text())
        const json = await res.json()
        setData(json.data)
      } catch (e: any) {
        setError(e?.message || "Erreur")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Rapports</h1>
            <p className="text-gray-600">Exports et synthèses</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Exporter CSV</Button>
            <Button>Exporter PDF</Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Articles</CardTitle>
                <CardDescription>Total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.totals.articles}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Produits</CardTitle>
                <CardDescription>Total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.totals.products}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs</CardTitle>
                <CardDescription>Total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.totals.users}</div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}


