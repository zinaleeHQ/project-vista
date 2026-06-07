# 📊 Project Vista: The Operational Intelligence Dashboard

> **What this project is about, in plain language:**
>
> This project addresses what happens after the work is done: how do you give different stakeholders access to operational data without losing control of what they conclude from it? An AI tool designed the KPI framework, access architecture, and governance model. The PM's job is to make every boundary decision — who sees what and why — knowing that in a self-service system, those decisions are the only thing standing between the data and a misread that generates the wrong action.


> **From Pushed Reports to Self-Service Visibility Across a Distributed Healthcare Enterprise**

[![Methodology](https://img.shields.io/badge/Methodology-KPI%20Governance%20%7C%20Data%20Architecture-blue?style=flat-square)]()
[![Domain](https://img.shields.io/badge/Domain-Healthcare%20IT%20%7C%20Operational%20Intelligence-teal?style=flat-square)]()
[![Status](https://img.shields.io/badge/Status-Portfolio%20Simulation-orange?style=flat-square)]()

---

## 🎯 The Operational Challenge

Sprint 3 is complete. The HL7 mapping is stabilized. The clinician workflow is optimized. The billing reconciliation dashboard is built. Every stakeholder has received regular status updates — each one carefully curated by the PM for their specific audience.

And now the question that always follows a successful delivery: **"Can we see all of this in one place, without scheduling a meeting?"**

This is the shift from a **push model** to a **pull model** — and it changes the PM's job fundamentally.

In Projects Horizon, Clarity, and Signal, the PM controlled what each stakeholder saw and when. A self-service dashboard inverts that relationship: stakeholders access data on their own terms, at any time, without PM mediation. The information is no longer curated before it is consumed.

**That creates a new failure mode the other three projects did not have to solve: a red metric without context is a crisis that starts before anyone can frame it.**

This project documents an AI-assisted design of the operational intelligence layer — KPI framework, stakeholder-filtered views, and governance model — that makes self-service visibility safe, accurate, and trusted.

---

## 📐 The Pull Model Problem

| Push Model (Projects 1–3) | Pull Model (Project Vista) |
|---|---|
| PM decides what each audience sees | Stakeholders access what they need, when they need it |
| PM frames red metrics before delivery | Red metrics need embedded context — always |
| Information lag is acceptable | Data freshness is a governance requirement |
| One-time communication events | Persistent, always-on visibility |
| Narrative controlled by PM | Narrative must be built into the data |

---

## 📥 The Data Inputs

Three structured inputs feed the dashboard design engine. See the `/data` folder for full source files.

### KPI Framework
A taxonomy of 16 KPIs across four categories — Clinical Operations, Financial/Revenue Cycle, Technical Infrastructure, and Operational Adoption — drawn directly from the work products of Projects Horizon, Clarity, and Signal. Each KPI includes a definition, data source, owner, target, and measurement frequency.

### Stakeholder Views
A structured map defining what each of the five stakeholder audiences sees, what they explicitly do not see, and the PM rationale for the boundary. Reuses the Signal stakeholder registry as the foundation — the same audiences, now applied to a persistent visibility layer rather than a point-in-time communication.

### Data Sources
A mapping of each KPI to its source system — RCM platform API, HL7 interface engine, sprint tracking, billing system — with data freshness expectations per source. Freshness is documented as a governance requirement, not a technical detail: stale data that looks current is a governance failure.

---

## 🤖 The AI Dashboard Design Engine

The prompt in `/prompts/dashboard-design-prompt.md` performs four sequential operations:

1. **KPI taxonomy generation** — Defines categories, individual metrics, owners, targets, and measurement frequency from the three prior project outputs
2. **Stakeholder view design** — Applies the Signal registry to determine data access boundaries per audience (not just formatting — actual access differences)
3. **Dashboard specification** — Defines what each audience sees on load, what requires drill-down, what requires a separate request, and how red metrics surface with mandatory context notes
4. **Governance model generation** — Produces ownership assignments, review cadence, escalation triggers, and data quality rules that make the dashboard trustworthy over time

Critically: the prompt cannot generate stakeholder views until the KPI governance layer is complete. You cannot design who sees what until you have decided what is true.

---

## 📊 The Output: Self-Service Visibility

### Before and After

| Metric | Push Model (Current) | Pull Model (Vista) |
|---|---|---|
| Access method | Scheduled PM report | Self-service dashboard |
| Information lag | 24–48 hours | Defined per data source (real-time to weekly) |
| Red metric handling | PM frames before delivery | Embedded context note — mandatory |
| Audience filtering | Manual per communication | Built into data access layer |
| Consistency risk | PM error possible | Single source of truth |
| Stakeholder autonomy | Low | High |

### Five Stakeholder Views

| Stakeholder | Sees | Does Not See |
|---|---|---|
| **Chief Medical Officer** | Clinical KPIs · Adoption trends | Financial exposure · API errors · Sprint velocity |
| **Chief Financial Officer** | Financial KPIs · Clinical cost drivers | Technical root causes · Team capacity |
| **VP of Engineering** | All KPIs · Full drill-down | Nothing filtered |
| **Clinical Operations Field Lead** | Clinical KPIs · Site adoption rate | Revenue figures · Technical infrastructure |
| **Product Manager** | All KPIs · Governance layer · Data quality flags | Nothing filtered |

---

## 📁 Repository Contents

```
project-vista/
├── README.md                         ← This document
├── PROCESS.md                        ← PM decision log and AI methodology
├── /data/
│   ├── kpi-framework.md              ← 16-KPI taxonomy with owners and targets
│   ├── stakeholder-views.md          ← Per-audience access map and rationale
│   └── data-sources.md               ← Source systems, freshness expectations, quality rules
├── /prompts/
│   └── dashboard-design-prompt.md    ← The AI dashboard design engine
└── /output/
    ├── kpi-scorecard.md              ← Full KPI matrix with RAG status and context notes
    ├── dashboard-spec.md             ← Five stakeholder view specifications
    └── governance-model.md           ← Ownership, cadence, escalation triggers, data quality
```

---

## ✅ Product Manager Requirements

| Requirement | How This Project Demonstrates It |
|---|---|
| *"Analyze data and metrics to identify trends, gaps, and opportunities"* | 16-KPI taxonomy built from three prior project outputs, with RAG status and trend tracking per metric |
| *"Design reporting frameworks that serve multiple stakeholder audiences"* | Five audience-filtered views with explicit access boundaries, embedded context rules, and a governance model |
| *"Translate complex operational data into clear, actionable insights for leadership"* | Per-audience view specs designed around each stakeholder's primary metric and decision context |
| *"Establish data governance standards and KPI ownership"* | Governance model assigns ownership, review cadence, escalation triggers, and data quality rules per KPI |
| *"Drive continuous improvement through measurement and performance tracking"* | Dashboard spec includes baseline documentation and improvement trend tracking tied directly to prior project outcomes |

---

## ✅ Project Manager Methodology Intervention

The boundaries as set in this example for each stakeholder persona are judgment calls, not defaults. They reflect a specific organizational structure, trust dynamic, and decision-making culture. At a different company, every boundary in this document would need to be renegotiated from scratch — and that negotiation is the PM's job, not the AI's. These decisions require the PM to understand the company culture deeply enough to make the right call for each stakeholder group, or trust in that PM will erode.



---


## 🚀 Want to Try This Yourself?

This project has a live HTML page with a one-click **Copy Prompt** button that copies the complete prompt for you, including data. Paste/Ctrl-V into Claude, GPT-4, or Gemini — no setup required.

👉 [Open Project Vista Prompt Copy page](https://zinaleeHQ.github.io/project-vista/)

Each prompt pauses at a PM judgment checkpoint before the final phase. Answer "yes" when you are ready to move forward. (That pause is the point.)


---


## 🔗 Portfolio Navigation

This is **Agent 4 of 4** — the operational visibility layer that makes everything built in Agents 1–3 self-sustaining.

| Project | Question Answered | Methodology |
|---|---|---|
| [Project Horizon](https://github.com/zinaleeHQ/project-horizon) | What do we build and when? | SAFe · WSJF |
| [Project Clarity](https://github.com/zinaleeHQ/project-clarity) | How do we change how people work? | Lean · DMAIC |
| [Project Signal](https://github.com/zinaleeHQ/project-signal) | How do we keep every stakeholder aligned? | Stakeholder Intelligence · Audience Mapping |
| **Project Vista** (this repo) | How do we give every stakeholder self-service visibility? | KPI Governance · Data Architecture |

[**← Back to Portfolio Overview**](https://github.com/zinaleeHQ)

---

*Portfolio simulation · All scenario details constructed from publicly available information · No proprietary data from any organization has been used · Built June 2026*
