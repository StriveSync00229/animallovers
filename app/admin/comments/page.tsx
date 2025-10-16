"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, type ColumnDef } from "@/components/admin/data-table"
import { Input } from "@/components/ui/input"

type Comment = {
  id: string
  article_id: string
  author_name: string
  author_email: string
  content: string
  created_at: string
  is_approved?: boolean
}

export default function AdminCommentsPage() {
  const [items, setItems] = React.useState<Comment[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/admin/comments")
        if (!res.ok) throw new Error(await res.text())
        const json = await res.json()
        setItems(json.data || [])
      } catch (e: any) {
        setError(e?.message || "Erreur de chargement")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const columns: ColumnDef<Comment>[] = [
    { key: "author_name", header: "Auteur" },
    { key: "author_email", header: "Email" },
    { key: "content", header: "Commentaire" },
    { key: "created_at", header: "Date", cell: (c) => new Date(c.created_at).toLocaleString("fr-FR") },
  ]

  const filtered = items.filter((c) =>
    (c.author_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.author_email || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.content || "").toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Commentaires</h1>
            <p className="text-gray-600">Liste en lecture seule (placeholder)</p>
          </div>
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des commentaires</CardTitle>
            <CardDescription>Modélisez la table comments et l’API pour activer le CRUD</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable columns={columns} data={filtered} emptyLabel="Aucun commentaire" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


