"use client"

import { useEffect } from "react"
import { X, Lightbulb } from "lucide-react"
import type { Kpi } from "@/lib/vista-data"

interface InfoPanelProps {
  kpi: Kpi | null
  onClose: () => void
}

export function InfoPanel({ kpi, onClose }: InfoPanelProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (kpi) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [kpi, onClose])

  const open = Boolean(kpi)

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Human-in-the-loop context"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-primary/10 p-2 text-primary">
              <Lightbulb className="size-5" />
            </span>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Human-in-the-Loop Context
              </p>
              <h2 className="mt-0.5 text-base font-semibold leading-snug text-card-foreground">
                {kpi?.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close context panel"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {kpi && (
            <div className="flex items-baseline gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3">
              <span className="text-2xl font-bold text-card-foreground">{kpi.value}</span>
              {kpi.unit && <span className="text-sm text-muted-foreground">{kpi.unit}</span>}
              <span className="ml-auto rounded-md bg-card px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Target: {kpi.target}
              </span>
            </div>
          )}

          <div className="mt-5 rounded-lg border-l-4 border-primary bg-primary/5 p-4">
            <p className="text-sm leading-relaxed text-card-foreground">{kpi?.infoNote}</p>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            This annotation is surfaced to prevent stakeholder misinterpretation of an Amber or Red status.
            It reflects the Product Manager&apos;s root-cause assessment and remediation plan.
          </p>
        </div>
      </aside>
    </div>
  )
}
