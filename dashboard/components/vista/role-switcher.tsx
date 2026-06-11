"use client"

import { Stethoscope, DollarSign, Code, MapPin, ClipboardList } from "lucide-react"
import { ROLES, type Role } from "@/lib/vista-data"

const ICONS: Record<Role, typeof Stethoscope> = {
  CMO: Stethoscope,
  CFO: DollarSign,
  VP_ENG: Code,
  FIELD_LEAD: MapPin,
  PM: ClipboardList,
}

interface RoleSwitcherProps {
  active: Role
  onChange: (role: Role) => void
}

export function RoleSwitcher({ active, onChange }: RoleSwitcherProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-2">
      <p className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Five-Persona Governor — Active Access Layer
      </p>
      <div
        role="tablist"
        aria-label="Stakeholder view"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
      >
        {ROLES.map((role) => {
          const Icon = ICONS[role.id]
          const isActive = role.id === active
          return (
            <button
              key={role.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onChange(role.id)}
              className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold leading-tight">{role.short}</span>
                <span
                  className={`block truncate text-[11px] leading-tight ${
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {role.label}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
