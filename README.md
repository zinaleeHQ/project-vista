# Project Vista: The Operational Intelligence Dashboard

**A KPI dashboard showed a rollout metric sitting at Red in Week 4 of a six-week plan. That's not failure — it's a rollout in progress. But nobody had set a date for when "still rolling out" stops being a valid excuse, so the same Red status that was fine in Week 4 would have quietly stayed fine forever.**

That's the problem this project solves. The first three case studies in this portfolio were about controlling what stakeholders see and when — a PM curating information before it reaches anyone. This one is about what happens after that control goes away: a self-service dashboard where anyone can look at any number, any time, with no PM standing between the data and the conclusion someone draws from it. A red metric without context isn't a data point anymore. It's a fire alarm with no exit sign.

**[→ See how the governance rules actually got built](https://github.com/zinaleeHQ/project-vista/blob/main/PROCESS.md)** — same kind of thinking, more of it, including the phase that got skipped and the tool-selection tradeoff that would've changed everything downstream.

> **From Pushed Reports to Self-Service Visibility Across a Distributed Healthcare Enterprise**

[![Methodology](https://img.shields.io/badge/Methodology-KPI%20Governance%20%7C%20Data%20Architecture-blue?style=flat-square)]()
[![Domain](https://img.shields.io/badge/Domain-Healthcare%20IT%20%7C%20Operational%20Intelligence-teal?style=flat-square)]()
[![Status](https://img.shields.io/badge/Status-Portfolio%20Simulation-orange?style=flat-square)]()

---

## ∴︎ Why This Matters Outside of Tech

Any organization that gives multiple groups access to the same shared numbers runs into this eventually. A city publishes a public safety dashboard, and a council member sees a spike with no idea it's a seasonal pattern that shows up every August. A law firm rolls out a utilization dashboard, and a practice group lead sees their billable hours dip in a slow quarter with no context that the whole firm dipped the same week. The number is accurate. The conclusion someone draws from it, alone, without framing, usually isn't.

Healthcare has its own version of this, and it's what this project documents — but the underlying skill isn't industry-specific. It's the judgment call about what a number needs sitting next to it before it's safe to hand to someone without you in the room to explain it. Get that wrong, and you haven't just built a bad dashboard. You've built a machine that generates false alarms and confused executives on a schedule, without anyone having to lift a finger to cause it.

---

## What Self-Service Access Actually Breaks

Picture a healthcare enterprise where the hard work is already done. The HL7 mapping is stable. The clinician workflow is fixed. The billing dashboard shipped. Every stakeholder has been getting curated updates from a PM who decided what each audience needed to hear, and when.

Then someone asks the question that always comes next: *"Can we just see this ourselves, without waiting for a meeting?"*

That's the shift from push to pull, and it's a bigger deal than it sounds. In a pushed report, the PM frames a bad number before anyone sees it — "yes, that's Red, and here's why it's not actually a crisis." In a self-service dashboard, the number arrives first and alone. Nobody's there to add the sentence that makes it make sense.

The SOP Adoption example above is the clearest case of this failure mode, but it's not the only one. A Chief Financial Officer noticed a pattern — sprint delivery gaps correlating with downstream revenue cycle delays — and asked for an engineering metric added to their view. The easy answers were both wrong. Refusing the request would've ignored a real signal the CFO had already spotted on their own. Adding the raw number without context would've handed a financial executive a delivery metric they'd read through a financial lens, which reliably produces the wrong conversation with engineering. The right call sat in between: surface the metric, but reframe it in terms of downstream financial impact, and keep engineering as the metric's owner regardless of who's looking at it. Access rules didn't get bent. They got applied with actual judgment, which is a different thing than either enforcing them rigidly or waiving them because someone important asked.

---

## ⎔︎ The Rules That Make the Dashboard Trustworthy

Four governance rules do most of the work here, and none of them are about what the dashboard looks like.

**A KPI needs an owner before it needs a chart.** If a modifier error rate sits at 9.1% and nobody's name is attached to that number, it stays amber forever — there's no one whose job it is to move it. Worse, if finance defines "Days Sales Outstanding" as net and operations defines it as gross, the dashboard doesn't resolve that conflict. It just gives two executives a shared screen to discover the conflict on, in real time, usually in a meeting neither of them expected to need.

**Access differences aren't the same as formatting differences.** In a pushed report, the same information gets reformatted per audience. Here, audiences get different *data*, not just a different layout of the same data. The CFO doesn't see a simplified engineering view — the CFO sees financial KPIs and clinical cost drivers, full stop. A field lead in a rural clinic doesn't see revenue-at-risk dollar figures, not because they're sensitive, but because a dollar amount with zero clinical context is just noise that generates a question the PM then has to go answer manually — which defeats the entire point of self-service.

**No KPI surfaces as Red without a note explaining why, and what happens next.** This is the rule the first three projects never needed, because a PM was always there to add that sentence out loud. Here, every Red status ships with a mandatory context field. The AI drafts those notes; the PM's job is checking that they're accurate, not writing forty of them from scratch every Monday.

**A number that looks current but isn't is worse than no number at all.** If a stakeholder sees a DSO figure, they assume it's live. If it's actually 72 hours stale because the billing system only batches overnight, every decision made off that number is being made on outdated information without anyone knowing it. Every data panel in this design shows its source system and a last-updated timestamp — not a UI nicety, a trust requirement.

---

## ⚙︎ How the Design Engine Works

The prompt (`/prompts/dashboard-design-prompt.md`) won't generate a single stakeholder view until the KPI governance layer is fully defined — deliberately. It builds the taxonomy first (definitions, owners, targets, measurement frequency, pulled from the three prior projects' outputs), then applies the Signal stakeholder registry to determine actual access boundaries per audience, then specifies what each view shows on load versus what needs a drill-down, then generates the governance model itself — ownership, review cadence, escalation triggers, data quality rules.

The sequencing matters as much as the content. You can't design who sees what until you've decided what's actually true.

---

## The Five Views

| Stakeholder | Sees | Does Not See |
|---|---|---|
| **Chief Medical Officer** | Clinical KPIs · Adoption trends | Financial exposure · API errors · Sprint velocity |
| **Chief Financial Officer** | Financial KPIs · Clinical cost drivers | Technical root causes · Team capacity |
| **VP of Engineering** | All KPIs · Full drill-down | Nothing filtered |
| **Clinical Operations Field Lead** | Clinical KPIs · Site adoption rate | Revenue figures · Technical infrastructure |
| **Product Manager** | All KPIs · Governance layer · Data quality flags | Nothing filtered |

Every boundary in this table is a judgment call specific to this org's culture and trust dynamics, not a default template. Move this to a different company and every row gets renegotiated — that renegotiation is the PM's actual job, not something the AI does for you.

---

### Live Interactive Simulation

The governance rules above aren't just documented — they're running in [a working demo](https://zinaleeHQ.github.io/project-vista/dashboard/). Built with v0.dev for the frontend, Claude as system-architecture collaborator on the KPI and governance model, Gemini for deployment support, hosted on GitHub Pages.

Toggle between the five stakeholder personas and watch access boundaries filter data in real time. Click the info icons on any Red or Amber card to see the actual PM context notes. There's also a toggle comparing the raw framework ranking against the PM-sequenced reality, showing the clinical-workflow-before-billing-dashboard override in action — plus you can drag and reorder KPI cards however makes sense to you.

---

## ↳︎ Repository Contents
```
project-vista/
├── README.md                         ← This document
├── PROCESS.md                        ← PM decision log and AI methodology
├── /data/
│   ├── kpi-framework.md              ← 17-KPI taxonomy with owners and targets
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


## Where PM Judgment Actually Showed Up

The clinical workflow optimization from Sprint 2 was completed before the billing dashboard went live in Sprint 3 — a sequencing decision carried over from Project Horizon. That order matters here too: it's the reason this dashboard's baselines reflect post-improvement reality instead of a snapshot of a workflow mid-transition. Toggle between the raw framework ranking and the sequenced version in the live demo to see exactly what that override protected.

This dashboard also assumes a decision that happened before any of this design work started: which platform it would actually live on. That choice — Jira dashboards, a Confluence-plus-connector setup, or a full BI platform like Power BI or Tableau — directly caps what's buildable. A static embed can't do dynamic context-note editing or an escalation alert layer. An enterprise platform can do most of it, at real cost. That tradeoff is a PM call, not an engineering one, and it belongs before Phase 1 starts, not after the spec's already written. More on what that gap cost, and what I'd fix, is in [PROCESS.md](./PROCESS.md).

---

## Try This Yourself

There's a live page with a one-click **Copy Prompt** button — grabs the full prompt plus data, ready to paste into Claude, GPT-4, or Gemini.

👉 [Open Project Vista Prompt Copy page](https://zinaleeHQ.github.io/project-vista/)

It pauses at a judgment checkpoint before the final phase, same as the others. That's not a bug.

---

## ↳︎ Portfolio Navigation

Project 4 of 4 — the layer that makes the first three self-sustaining without a PM standing in the middle of every update.

| Project | Question Answered | Methodology |
|---|---|---|
| [Project Horizon](https://github.com/zinaleeHQ/project-horizon) | What do we build, and when? | SAFe · WSJF |
| [Project Clarity](https://github.com/zinaleeHQ/project-clarity) | How do we change how people actually work? | Lean · DMAIC |
| [Project Signal](https://github.com/zinaleeHQ/project-signal) | How do we keep every stakeholder aligned? | Stakeholder Intelligence · Audience Mapping |
| **Project Vista** (this repo) | How do we give every stakeholder self-service visibility? | KPI Governance · Data Architecture |

[**← Back to Portfolio Overview**](https://github.com/zinaleeHQ/zinaleeHQ/)

---

*Portfolio case study · Built from publicly available information · No proprietary data used · June 2026*

