"use client"

import { useEffect, useState } from "react"
import type { Kpi, Role } from "@/lib/vista-data"
import { DashboardHeader } from "./dashboard-header"
import { RoleSwitcher } from "./role-switcher"
import { KpiGrid } from "./kpi-grid"
import { PriorityTable } from "./priority-table"
import { InfoPanel } from "./info-panel"

export function VistaDashboard() {
  const [role, setRole] = useState<Role>("PM")
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [activeKpi, setActiveKpi] = useState<Kpi | null>(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <DashboardHeader role={role} theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
        <RoleSwitcher active={role} onChange={setRole} />
        <KpiGrid role={role} onInfo={setActiveKpi} />
        <PriorityTable />
        <footer className="pb-4 pt-2 text-center text-xs text-muted-foreground">
          Project Vista · Healthcare Operational Intelligence · Self-contained interactive prototype
        </footer>
      </div>
      <InfoPanel kpi={activeKpi} onClose={() => setActiveKpi(null)} />
    </main>
  )
}
