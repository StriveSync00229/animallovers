"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTable, type ColumnDef } from "@/components/admin/data-table"

type Subscriber = {
  id?: string
  email: string
  created_at?: string
}

export default function AdminNewsletterPage() {
  const [subs, setSubs] = React.useState<Subscriber[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/admin/newsletter")
        if (!res.ok) throw new Error(await res.text())
        const json = await res.json()
        setSubs(json.data || [])
      } catch (e: any) {
        setError(e?.message || "Erreur de chargement")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function addEmail() {
    const res = await fetch("/api/admin/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) })
    if (!res.ok) {
      alert("Erreur d'inscription")
      return
    }
    setEmail("")
    // recharger (placeholder — en réel, pousser le nouvel item)
    const list = await fetch("/api/admin/newsletter").then(r => r.json())
    setSubs(list.data || [])
  }

  const columns: ColumnDef<Subscriber>[] = [
    { key: "email", header: "Email" },
    { key: "created_at", header: "Inscrit le", cell: (s) => (s.created_at ? new Date(s.created_at).toLocaleString("fr-FR") : "—") },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Newsletter</h1>
          <p className="text-gray-600">Inscrits (placeholder — connectez à votre provider ou DB)</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ajouter un email</CardTitle>
            <CardDescription>Testez l'API d'inscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Input placeholder="email@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} className="max-w-sm" />
              <Button onClick={addEmail}>Ajouter</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liste des inscrits</CardTitle>
            <CardDescription>Affichage basique</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable columns={columns} data={subs} emptyLabel="Aucun inscrit" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


