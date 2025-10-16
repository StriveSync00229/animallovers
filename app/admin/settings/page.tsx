"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Settings = { siteName: string; defaultLocale: string; theme: string }

export default function AdminSettingsPage() {
  const [data, setData] = React.useState<Settings | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/admin/settings")
        const json = await res.json()
        setData(json.data)
      } catch (e: any) {
        setError(e?.message || "Erreur")
      }
    })()
  }, [])

  async function save() {
    if (!data) return
    setSaving(true)
    try {
      const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      setError(e?.message || "Erreur de sauvegarde")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-gray-600">Configuration du site (placeholder en mémoire)</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Général</CardTitle>
            <CardDescription>Nom du site, langue par défaut, thème</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-red-500 py-4">{error}</div>
            ) : !data ? (
              <div className="text-gray-500 py-4">Chargement...</div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom du site</Label>
                  <Input value={data.siteName} onChange={(e) => setData({ ...data, siteName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Langue par défaut</Label>
                  <Input value={data.defaultLocale} onChange={(e) => setData({ ...data, defaultLocale: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Thème</Label>
                  <Input value={data.theme} onChange={(e) => setData({ ...data, theme: e.target.value })} />
                </div>
                <div>
                  <Button onClick={save} disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


