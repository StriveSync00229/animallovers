"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, type ColumnDef } from "@/components/admin/data-table"

type User = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  role: "user" | "admin" | "moderator"
  is_active: boolean
  created_at: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/users")
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setUsers(json.data || [])
    } catch (e: any) {
      setError(e?.message || "Erreur de chargement")
    } finally {
      setLoading(false)
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      key: "avatar",
      header: "Utilisateur",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar_url || undefined} />
            <AvatarFallback>
              {((row.first_name || "").charAt(0) + (row.last_name || "").charAt(0)).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.first_name || ""} {row.last_name || ""}</div>
            <div className="text-xs text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: "role", header: "Rôle" },
    { key: "is_active", header: "Actif", cell: (u) => (u.is_active ? "Oui" : "Non") },
    { key: "created_at", header: "Créé le", cell: (u) => new Date(u.created_at).toLocaleDateString("fr-FR") },
  ]

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      (u.first_name || "").toLowerCase().includes(q) ||
      (u.last_name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Utilisateurs</h1>
            <p className="text-gray-600">Vue en lecture seule</p>
          </div>
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs</CardTitle>
            <CardDescription>Informations principales (lecture seule)</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable columns={columns} data={filtered} emptyLabel="Aucun utilisateur" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


