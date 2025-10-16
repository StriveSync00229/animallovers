"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface ColumnDef<T> {
  key: keyof T | string
  header: React.ReactNode
  cell?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  emptyLabel?: string
}

export function DataTable<T>({ columns, data, emptyLabel = "Aucune donnée" }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className={col.className as string | undefined}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                {emptyLabel}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, r) => (
              <TableRow key={r}>
                {columns.map((col, c) => (
                  <TableCell key={c} className={col.className as string | undefined}>
                    {col.cell ? col.cell(row) : String((row as any)[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}


