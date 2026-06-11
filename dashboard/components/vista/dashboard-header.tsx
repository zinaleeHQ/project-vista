"use client"

import { Moon, Sun, GitBranch, Brain, Radio } from "lucide-react"
import { ROLES, type Role } from "@/lib/vista-data"

interface DashboardHeaderProps {
  role: Role
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export function DashboardHeader({ role, theme, onToggleTheme }: DashboardHeaderProps) {
  const freshness = ROLES.find((r) => r.id === role)?.freshness ?? "Live Sync"

  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Project Vista <span className="text-muted-foreground">—</span> Operational Intelligence Layer
            </h1>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/zinaleeHQ/project-vista"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <GitBranch className="size-3.5" />
                View Project Vista
              </a>
              <a
                href="https://github.com/zinaleeHQ/project-vista/blob/main/PROCESS.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Brain className="size-3.5" />
                View PM Process Log
              </a>
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Self-Service Pull-Model Visibility Engine</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rag-green/40 bg-rag-green/10 px-3 py-1.5 text-xs font-medium text-rag-green">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-rag-green opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-rag-green" />
            </span>
            <Radio className="size-3.5" />
            {freshness}
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="hidden sm:inline">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
