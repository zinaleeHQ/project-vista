import type { RagStatus } from "@/lib/vista-data"

const RAG_STYLES: Record<RagStatus, { dot: string; text: string; label: string; ring: string }> = {
  green: {
    dot: "bg-rag-green",
    text: "text-rag-green",
    label: "On Track",
    ring: "ring-rag-green/30",
  },
  amber: {
    dot: "bg-rag-amber",
    text: "text-rag-amber",
    label: "Watch",
    ring: "ring-rag-amber/30",
  },
  red: {
    dot: "bg-rag-red",
    text: "text-rag-red",
    label: "At Risk",
    ring: "ring-rag-red/30",
  },
}

export function RagBadge({ rag }: { rag: RagStatus }) {
  const s = RAG_STYLES[rag]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium ring-1 ${s.ring} ${s.text}`}
    >
      <span className={`size-2 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  )
}

export function ragColorVar(rag: RagStatus) {
  return rag === "green"
    ? "var(--rag-green)"
    : rag === "amber"
      ? "var(--rag-amber)"
      : "var(--rag-red)"
}
