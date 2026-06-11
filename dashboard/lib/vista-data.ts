export type Role = "CMO" | "CFO" | "VP_ENG" | "FIELD_LEAD" | "PM"

export type RagStatus = "green" | "amber" | "red"

export interface RoleMeta {
  id: Role
  label: string
  short: string
  freshness: string
}

export const ROLES: RoleMeta[] = [
  { id: "CMO", label: "Chief Medical Officer", short: "CMO", freshness: "Clinical EHR: Live Sync" },
  { id: "CFO", label: "Chief Financial Officer", short: "CFO", freshness: "Billing System: Weekly Update" },
  { id: "VP_ENG", label: "VP of Engineering", short: "VP Eng", freshness: "Jira Core: Real-Time" },
  { id: "FIELD_LEAD", label: "Clinical Operations Field Lead", short: "Field Lead", freshness: "Site Telemetry: 5m Delay" },
  { id: "PM", label: "Product Manager", short: "PM", freshness: "All Systems: Aggregated" },
]

export interface Kpi {
  id: string
  title: string
  value: string
  unit?: string
  target: string
  rag: RagStatus
  category: string
  /** higher index = more recent. Used for the sparkline. */
  trend: number[]
  roles: Role[]
  /** Optional badge surfaced on the card, e.g. CFO exception metrics. */
  flag?: string
  infoNote?: string
}

export const KPIS: Kpi[] = [
  // --- Clinical (CMO) ---
  {
    id: "clinician-satisfaction",
    title: "Clinician Satisfaction Score",
    value: "4.2",
    unit: "/5",
    target: "> 3.8",
    rag: "green",
    category: "Clinical Experience",
    trend: [3.6, 3.7, 3.9, 4.0, 4.0, 4.1, 4.2],
    roles: ["CMO", "PM"],
  },
  {
    id: "sop-adoption",
    title: "SOP Adoption Rate",
    value: "88",
    unit: "%",
    target: "> 85%",
    rag: "green",
    category: "Clinical Experience",
    trend: [62, 68, 74, 79, 83, 86, 88],
    roles: ["CMO", "PM"],
  },
  {
    id: "doc-burden",
    title: "Clinician Documentation Burden Time",
    value: "14.2",
    unit: "min/task",
    target: "< 3.5 min",
    rag: "amber",
    category: "Clinical Experience",
    trend: [21, 19.5, 18, 17, 16, 15.1, 14.2],
    roles: ["CMO", "PM"],
    infoNote:
      "PM Context: The 14.2-minute task time reflects legacy manual workarounds. The future-state Lean DMAIC SOP is currently being deployed with a strict 2-click maximum friction cap. Zero training budget required; UI is self-evident.",
  },
  {
    id: "patient-throughput",
    title: "Patient Throughput Efficiency",
    value: "91",
    unit: "%",
    target: "> 88%",
    rag: "green",
    category: "Clinical Experience",
    trend: [80, 82, 85, 86, 88, 90, 91],
    roles: ["PM"],
  },

  // --- Finance (CFO) ---
  {
    id: "dso",
    title: "Days Sales Outstanding (DSO)",
    value: "42",
    unit: "days",
    target: "< 45 days",
    rag: "amber",
    category: "Financial Performance",
    trend: [36, 37, 38, 39, 40, 41, 42],
    roles: ["CFO", "PM"],
    infoNote:
      "PM Context: While DSO sits at 42 days, Revenue at Risk has crossed the $75K safety buffer. This is a leading indicator that DSO will spike over the 45-day threshold within 7–10 business days if the exception queue isn't cleared.",
  },
  {
    id: "revenue-at-risk",
    title: "Revenue at Risk",
    value: "$85,000",
    target: "< $50K",
    rag: "red",
    category: "Financial Performance",
    trend: [42000, 48000, 55000, 63000, 71000, 79000, 85000],
    roles: ["CFO", "PM"],
    infoNote:
      "PM Context: Revenue at Risk has crossed the $75K safety buffer and is the leading indicator that DSO will breach 45 days within 7–10 business days. The exposure is concentrated in the exception queue tied to the v2.4.1 billing endpoint mismatch.",
  },
  {
    id: "rcm-capture",
    title: "AI Revenue Cycle Capture Rate",
    value: "94.1",
    unit: "%",
    target: "> 98%",
    rag: "amber",
    category: "Financial Performance",
    trend: [90, 91, 92, 93, 92.5, 93.4, 94.1],
    roles: ["CFO", "PM"],
  },
  {
    id: "defect-spillover",
    title: "Defect Spillover Rate",
    value: "18",
    unit: "% spillover",
    target: "< 10%",
    rag: "red",
    category: "Engineering & Platform",
    trend: [6, 7, 8, 9, 11, 15, 18],
    roles: ["CFO", "VP_ENG", "PM"],
    flag: "CFO Exception Metric",
    infoNote:
      "PM Context: The 18% spillover is tied entirely to the undocumented parameter mismatch in the partner v2.4.1 API endpoint rollout from Sprint 2, not a drop in engineering velocity. CFO Impact: This delivery gap is the direct cause of the current trailing revenue cycle exceptions.",
  },

  // --- Engineering (VP Eng) ---
  {
    id: "hl7-sync",
    title: "HL7 Interoperability Core Sync",
    value: "95",
    unit: "%",
    target: "> 99.5%",
    rag: "amber",
    category: "Engineering & Platform",
    trend: [98, 97.5, 97, 96.4, 96, 95.4, 95],
    roles: ["VP_ENG", "PM"],
  },
  {
    id: "api-latency",
    title: "v2.4.1 API Response Latency",
    value: "420",
    unit: "ms",
    target: "< 250 ms",
    rag: "red",
    category: "Engineering & Platform",
    trend: [180, 190, 210, 240, 300, 380, 420],
    roles: ["VP_ENG", "PM"],
    infoNote:
      "PM Context: The 420ms latency spike is driven by the third-party endpoint validation. Do not allocate engineering capacity to a full dashboard redesign; patch the validation script in the upcoming sprint.",
  },
  {
    id: "open-bugs",
    title: "Open RCM Platform Bugs",
    value: "14",
    target: "< 20",
    rag: "green",
    category: "Engineering & Platform",
    trend: [32, 28, 24, 21, 18, 16, 14],
    roles: ["VP_ENG", "PM"],
  },
  {
    id: "jira-velocity",
    title: "Active Jira Story Velocity",
    value: "38",
    unit: "pts",
    target: "35–40 SP",
    rag: "green",
    category: "Engineering & Platform",
    trend: [30, 32, 34, 33, 36, 37, 38],
    roles: ["VP_ENG", "PM"],
  },
  {
    id: "cloud-uptime",
    title: "Cloud Infrastructure Uptime",
    value: "99.98",
    unit: "%",
    target: "> 99.9%",
    rag: "green",
    category: "Engineering & Platform",
    trend: [99.9, 99.92, 99.95, 99.94, 99.96, 99.97, 99.98],
    roles: ["PM"],
  },

  // --- Field Operations (Field Lead) ---
  {
    id: "site-rollout",
    title: "Site Rollout Progress",
    value: "76",
    unit: "%",
    target: "100% Phase 3",
    rag: "amber",
    category: "Field Operations",
    trend: [55, 60, 64, 68, 71, 74, 76],
    roles: ["FIELD_LEAD", "PM"],
    infoNote:
      "PM Context: The 76% rollout rate is expected during this phase of the 6-week rollout plan. The metrics will remain Amber until Phase 3 deployment concludes.",
  },
  {
    id: "daily-active-users",
    title: "Daily Active Clinical Users",
    value: "1,420",
    target: "> 1,200",
    rag: "green",
    category: "Field Operations",
    trend: [980, 1080, 1180, 1240, 1320, 1380, 1420],
    roles: ["FIELD_LEAD", "PM"],
  },
  {
    id: "friction-incidents",
    title: "Local Workflow Friction Incidents",
    value: "24",
    target: "< 10",
    rag: "red",
    category: "Field Operations",
    trend: [8, 10, 12, 15, 18, 21, 24],
    roles: ["FIELD_LEAD", "PM"],
  },

  // --- PM-only governance breadth ---
  {
    id: "cost-savings",
    title: "Monthly Operational Cost Savings",
    value: "$124,500",
    target: "> $100K",
    rag: "green",
    category: "Financial Performance",
    trend: [60000, 74000, 88000, 99000, 110000, 118000, 124500],
    roles: ["PM"],
  },
]

export function kpisForRole(role: Role): Kpi[] {
  return KPIS.filter((k) => k.roles.includes(role))
}

/** Total distinct KPIs in the taxonomy (PM sees all). */
export const TOTAL_KPIS = KPIS.length

export interface PriorityRow {
  epicId: string
  project: string
  wsjf: number
  pmStatus: string
}

/** Ordered by raw WSJF framework ranking (highest first). */
export const PRIORITY_RAW: PriorityRow[] = [
  { epicId: "EPIC-204", project: "Billing Dashboard", wsjf: 24.5, pmStatus: "Ready" },
  { epicId: "EPIC-198", project: "Clinician Workflow Optimization", wsjf: 21.0, pmStatus: "In Discovery" },
  { epicId: "EPIC-211", project: "HL7 Interop Hardening", wsjf: 18.2, pmStatus: "Blocked" },
  { epicId: "EPIC-176", project: "Site Onboarding Automation", wsjf: 15.8, pmStatus: "Ready" },
  { epicId: "EPIC-220", project: "RCM Latency Remediation", wsjf: 13.4, pmStatus: "In Progress" },
]

export const PM_OVERRIDE_RATIONALE =
  "PM Override Rationale: Building the Billing Dashboard before optimizing the underlying clinical workflow creates a baseline metric that becomes immediately obsolete. We optimize the workflow behavior first to ensure data integrity."
