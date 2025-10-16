"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  confirming?: boolean
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onCancel,
  confirming,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onCancel() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel} disabled={!!confirming}>
            {cancelText}
          </Button>
          <Button type="button" onClick={onConfirm} disabled={!!confirming}>
            {confirming ? "Veuillez patienter..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


