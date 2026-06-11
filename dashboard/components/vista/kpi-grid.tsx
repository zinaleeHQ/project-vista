"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ShieldCheck } from "lucide-react"
import { kpisForRole, TOTAL_KPIS, type Kpi, type Role } from "@/lib/vista-data"
import { KpiCard } from "./kpi-card"

interface KpiGridProps {
  role: Role
  onInfo: (kpi: Kpi) => void
}

export function KpiGrid({ role, onInfo }: KpiGridProps) {
  const roleKpis = useMemo(() => kpisForRole(role), [role])
  const [order, setOrder] = useState<string[]>(roleKpis.map((k) => k.id))
  const dragId = useRef<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)

  // Reset ordering whenever the role (and thus the visible KPI set) changes.
  useEffect(() => {
    setOrder(roleKpis.map((k) => k.id))
  }, [roleKpis])

  const byId = useMemo(() => new Map(roleKpis.map((k) => [k.id, k])), [roleKpis])
  const ordered = order.map((id) => byId.get(id)).filter(Boolean) as Kpi[]

  function handleDragStart(id: string) {
    dragId.current = id
    setDraggingId(id)
  }

  function handleDragEnter(id: string) {
    setOverId(id)
    const from = dragId.current
    if (!from || from === id) return
    setOrder((prev) => {
      const next = [...prev]
      const fromIdx = next.indexOf(from)
      const toIdx = next.indexOf(id)
      if (fromIdx === -1 || toIdx === -1) return prev
      next.splice(fromIdx, 1)
      next.splice(toIdx, 0, from)
      return next
    })
  }

  function handleDragEnd() {
    dragId.current = null
    setDraggingId(null)
    setOverId(null)
  }

  return (
    <section aria-label="Key performance indicators">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          KPI Grid
          <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
            {ordered.length} visible
          </span>
        </h2>
        <p className="hidden text-xs text-muted-foreground sm:block">Drag any card to re-order</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ordered.map((kpi) => (
          <KpiCard
            key={kpi.id}
            kpi={kpi}
            onInfo={onInfo}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            isDragging={draggingId === kpi.id}
            isOver={overId === kpi.id}
          />
        ))}

        {role === "PM" && (
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-rag-green/40 bg-rag-green/10 p-4">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-rag-green" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-rag-green">Data Quality &amp; Governance</p>
                <h3 className="mt-0.5 text-sm font-semibold leading-snug text-card-foreground">System Data Integrity</h3>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-card-foreground">100%</p>
              <p className="mt-1 text-xs font-medium text-rag-green">
                Validated via Pre-Scoring Filter Rules across all {TOTAL_KPIS} KPIs
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
