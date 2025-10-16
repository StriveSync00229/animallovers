"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, type ColumnDef } from "@/components/admin/data-table"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  icon: string | null
  is_active: boolean
  sort_order: number
}

export default function AdminCategoriesPage() {
  const [items, setItems] = React.useState<Category[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Category | null>(null)
  const [form, setForm] = React.useState({ name: "", slug: "", description: "", color: "", icon: "", is_active: true, sort_order: 0 })

  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  React.useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/categories")
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setItems(json.data || [])
    } catch (e: any) {
      setError(e?.message || "Erreur de chargement")
    } finally {
      setLoading(false)
    }
  }

  async function create() {
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      color: form.color || null,
      icon: form.icon || null,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    }
    const res = await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    if (!res.ok) {
      alert("Création non implémentée côté API. Ajoutez la logique dans ArticleService si nécessaire.")
      return
    }
    setDialogOpen(false)
    await load()
  }

  async function update() {
    if (!editing) return
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      color: form.color || null,
      icon: form.icon || null,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    }
    const res = await fetch(`/api/admin/categories/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    if (!res.ok) {
      alert("Erreur mise à jour catégorie")
      return
    }
    setDialogOpen(false)
    await load()
  }

  function openCreate() {
    setEditing(null)
    setForm({ name: "", slug: "", description: "", color: "", icon: "", is_active: true, sort_order: 0 })
    setDialogOpen(true)
  }

  function openEdit(cat: Category) {
    setEditing(cat)
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      color: cat.color || "",
      icon: cat.icon || "",
      is_active: !!cat.is_active,
      sort_order: cat.sort_order || 0,
    })
    setDialogOpen(true)
  }

  function askDelete(id: string) {
    setDeletingId(id)
    setConfirmOpen(true)
  }

  async function doDelete() {
    if (!deletingId) return
    const res = await fetch(`/api/admin/categories/${deletingId}`, { method: "DELETE" })
    setConfirmOpen(false)
    setDeletingId(null)
    if (!res.ok) {
      alert("Erreur suppression catégorie")
      return
    }
    await load()
  }

  const columns: ColumnDef<Category>[] = [
    { key: "name", header: "Nom" },
    { key: "slug", header: "Slug" },
    { key: "description", header: "Description" },
    {
      key: "is_active",
      header: "Active",
      cell: (row) => (row.is_active ? <Badge variant="secondary">Oui</Badge> : <span className="text-gray-400">Non</span>),
    },
    {
      key: "color",
      header: "Couleur",
      cell: (row) => (row.color ? <code className="text-xs">{row.color}</code> : <span className="text-gray-400">—</span>),
    },
    { key: "sort_order", header: "Ordre" },
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

  const filtered = items.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()) || x.slug.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Catégories</h1>
            <p className="text-gray-600">Gérez les catégories d'articles</p>
          </div>
          <div className="flex items-center gap-3">
            <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
            <Button onClick={openCreate}>
              <Plus className="w-4 h-4 mr-2" /> Nouvelle catégorie
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des catégories</CardTitle>
            <CardDescription>Créer, modifier, supprimer</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable columns={columns} data={filtered} emptyLabel="Aucune catégorie" />
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier la catégorie" : "Nouvelle catégorie"}</DialogTitle>
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
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Couleur</Label>
                <Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="#AABBCC" />
              </div>
              <div className="space-y-2">
                <Label>Icône</Label>
                <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="paw, bone..." />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
            <Button onClick={editing ? update : create}>{editing ? "Modifier" : "Créer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer la catégorie ?"
        description="Cette action est irréversible."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDelete}
      />
    </div>
  )
}


