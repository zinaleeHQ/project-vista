"use client"

import { useMemo, useState } from "react"
import { ArrowUpDown, ChevronUp } from "lucide-react"
import { PRIORITY_RAW, PM_OVERRIDE_RATIONALE, type PriorityRow } from "@/lib/vista-data"

type Mode = "raw" | "pm"

const STATUS_STYLES: Record<string, string> = {
  Ready: "bg-rag-green/15 text-rag-green",
  "In Progress": "bg-primary/15 text-primary",
  "In Discovery": "bg-rag-amber/15 text-rag-amber",
  Blocked: "bg-rag-red/15 text-rag-red",
}

function pmSequenced(rows: PriorityRow[]): PriorityRow[] {
  const next = [...rows]
  const workflowIdx = next.findIndex((r) => r.project === "Clinician Workflow Optimization")
  const billingIdx = next.findIndex((r) => r.project === "Billing Dashboard")
  if (workflowIdx > -1 && billingIdx > -1 && workflowIdx > billingIdx) {
    const [workflow] = next.splice(workflowIdx, 1)
    next.splice(billingIdx, 0, workflow)
  }
  return next
}

export function PriorityTable() {
  const [mode, setMode] = useState<Mode>("raw")
  const rows = useMemo(() => (mode === "pm" ? pmSequenced(PRIORITY_RAW) : PRIORITY_RAW), [mode])

  return (
    <section aria-label="Prioritization override" className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-card-foreground">Prioritization Override Table</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">WSJF framework ranking vs. PM-sequenced delivery reality</p>
        </div>
        <div className="inline-flex rounded-lg border border-border bg-background p-1">
          <button
            type="button"
            onClick={() => setMode("raw")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "raw" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Raw Framework Ranking
          </button>
          <button
            type="button"
            onClick={() => setMode("pm")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "pm" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            PM Sequenced Reality
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2 font-medium">Epic ID</th>
              <th className="px-3 py-2 font-medium">Project Name</th>
              <th className="px-3 py-2 font-medium">
                <span className="inline-flex items-center gap-1">
                  Raw WSJF Score <ArrowUpDown className="size-3" />
                </span>
              </th>
              <th className="px-3 py-2 font-medium">Sequence Order</th>
              <th className="px-3 py-2 font-medium">PM Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const moved =
                mode === "pm" && row.project === "Clinician Workflow Optimization"
              return (
                <tr
                  key={row.epicId}
                  className={`border-b border-border/60 transition-colors ${
                    moved ? "bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{row.epicId}</td>
                  <td className="px-3 py-3 font-medium text-card-foreground">
                    <span className="inline-flex items-center gap-2">
                      {row.project}
                      {moved && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          <ChevronUp className="size-3" /> Promoted
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-3 py-3 tabular-nums text-card-foreground">{row.wsjf.toFixed(1)}</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        STATUS_STYLES[row.pmStatus] ?? "bg-muted text-foreground"
                      }`}
                    >
                      {row.pmStatus}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {mode === "pm" && (
        <div className="mt-4 rounded-lg border-l-4 border-primary bg-primary/5 p-4">
          <p className="text-sm leading-relaxed text-card-foreground">{PM_OVERRIDE_RATIONALE}</p>
        </div>
      )}
    </section>
  )
}
