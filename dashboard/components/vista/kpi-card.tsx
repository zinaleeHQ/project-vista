"use client"

import { GripVertical, Info } from "lucide-react"
import type { Kpi } from "@/lib/vista-data"
import { RagBadge } from "./rag-badge"
import { Sparkline } from "./sparkline"

interface KpiCardProps {
  kpi: Kpi
  onInfo: (kpi: Kpi) => void
  onDragStart: (id: string) => void
  onDragEnter: (id: string) => void
  onDragEnd: () => void
  isDragging: boolean
  isOver: boolean
}

const ACCENT: Record<Kpi["rag"], string> = {
  green: "before:bg-rag-green",
  amber: "before:bg-rag-amber",
  red: "before:bg-rag-red",
}

export function KpiCard({
  kpi,
  onInfo,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
  isOver,
}: KpiCardProps) {
  const hasInfo = Boolean(kpi.infoNote) && (kpi.rag === "amber" || kpi.rag === "red")

  return (
    <div
      draggable
      onDragStart={() => onDragStart(kpi.id)}
      onDragEnter={() => onDragEnter(kpi.id)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all
        before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-[''] ${ACCENT[kpi.rag]}
        ${isDragging ? "scale-[0.98] opacity-40" : "hover:-translate-y-0.5 hover:shadow-md"}
        ${isOver && !isDragging ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
    >
      <div className="flex items-start justify-between gap-2 pl-1">
        <div className="flex items-start gap-1.5">
          <button
            type="button"
            aria-label="Drag to reorder"
            className="mt-0.5 cursor-grab touch-none rounded p-0.5 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground active:cursor-grabbing"
          >
            <GripVertical className="size-4" />
          </button>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{kpi.category}</p>
            <h3 className="mt-0.5 text-pretty text-sm font-semibold leading-snug text-card-foreground">{kpi.title}</h3>
            {kpi.flag && (
              <span className="mt-1 inline-flex items-center rounded-full border border-rag-amber/40 bg-rag-amber/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rag-amber">
                {kpi.flag}
              </span>
            )}
          </div>
        </div>
        {hasInfo && (
          <button
            type="button"
            onClick={() => onInfo(kpi)}
            aria-label={`View PM context for ${kpi.title}`}
            className="shrink-0 rounded-full border border-border bg-muted p-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Info className="size-4" />
          </button>
        )}
      </div>

      <div className="flex items-end justify-between gap-3 pl-1">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight text-card-foreground">{kpi.value}</span>
          {kpi.unit && <span className="text-sm font-medium text-muted-foreground">{kpi.unit}</span>}
        </div>
        <Sparkline data={kpi.trend} rag={kpi.rag} />
      </div>

      <div className="pl-1">
        <div className="flex flex-wrap items-center gap-2">
          <RagBadge rag={kpi.rag} />
          <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            Target: {kpi.target}
          </span>
        </div>
      </div>
    </div>
  )
}
