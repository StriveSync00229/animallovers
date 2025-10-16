"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable, type ColumnDef } from "@/components/admin/data-table"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Tag = {
  id: string
  name: string
  slug: string
  color: string | null
  usage_count?: number | null
}

export default function AdminTagsPage() {
  const [tags, setTags] = React.useState<Tag[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Tag | null>(null)
  const [form, setForm] = React.useState({ name: "", slug: "", color: "" })

  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  React.useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/tags")
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setTags(json.data || [])
    } catch (e: any) {
      setError(e?.message || "Erreur de chargement")
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    setEditing(null)
    setForm({ name: "", slug: "", color: "" })
    setDialogOpen(true)
  }

  function openEdit(tag: Tag) {
    setEditing(tag)
    setForm({ name: tag.name, slug: tag.slug, color: tag.color || "" })
    setDialogOpen(true)
  }

  async function save() {
    const payload = { ...form, color: form.color || null }
    const url = editing ? `/api/admin/tags/${editing.id}` : "/api/admin/tags"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    if (!res.ok) {
      alert("Erreur de sauvegarde")
      return
    }
    setDialogOpen(false)
    await load()
  }

  function askDelete(id: string) {
    setDeletingId(id)
    setConfirmOpen(true)
  }

  async function doDelete() {
    if (!deletingId) return
    const res = await fetch(`/api/admin/tags/${deletingId}`, { method: "DELETE" })
    setConfirmOpen(false)
    setDeletingId(null)
    if (!res.ok) {
      alert("Erreur de suppression")
      return
    }
    await load()
  }

  const columns: ColumnDef<Tag>[] = [
    { key: "name", header: "Nom" },
    { key: "slug", header: "Slug" },
    {
      key: "color",
      header: "Couleur",
      cell: (row) => (
        row.color ? (
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: row.color }} />
            <code className="text-xs">{row.color}</code>
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )
      ),
    },
    {
      key: "usage",
      header: "Utilisation",
      cell: (row) => <Badge variant="secondary">{row.usage_count ?? 0}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => openEdit(row)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-red-600" onClick={() => askDelete(row.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const filtered = tags.filter(
    (t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.slug.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tags</h1>
            <p className="text-gray-600">Gérez les tags des articles</p>
          </div>
          <div className="flex items-center gap-3">
            <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
            <Button onClick={openCreate}>
              <Plus className="w-4 h-4 mr-2" /> Nouveau tag
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des tags</CardTitle>
            <CardDescription>Créer, modifier, supprimer</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable columns={columns} data={filtered} emptyLabel="Aucun tag" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog create/edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le tag" : "Nouveau tag"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nom *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Couleur (optionnel)</Label>
              <Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="#AABBCC" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
            <Button onClick={save}>{editing ? "Modifier" : "Créer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm delete */}
      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer le tag ?"
        description="Cette action est irréversible."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDelete}
      />
    </div>
  )
}


