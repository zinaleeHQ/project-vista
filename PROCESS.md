# Project Vista: PM Decision Log

## Why This Document Exists

Every project in this portfolio includes a PROCESS.md that separates what the AI did from what the PM decided. Vista is no different — but the decisions here are a different category than the ones in the first three projects.

Horizon, Clarity, and Signal were all about designing outputs: what gets built, how a process changes, what gets communicated. Vista is about designing a system. The decisions are structural rather than tactical, and the failure modes are slower and quieter — which makes them more dangerous.

---

## Decision 1: KPI Governance Before Dashboard Design

The first instinct when someone asks for a dashboard is to start sketching screens. What should it look like? What should it show?

I did not start there. I started with the question: what is true, and who owns it?

A KPI without an owner is a number without accountability. If the modifier error rate is 9.1% and no one owns that number, it will sit amber forever. If DSO is defined as "net" by finance and "gross" by operations, the first time a CFO and VP of Clinical Operations compare notes, the dashboard will have created a conflict that did not exist before.

The prompt is engineered to complete the KPI taxonomy — with explicit definitions, owners, and measurement rules — before it generates a single stakeholder view. The AI cannot design what people see until the PM has decided what is true.

---

## Decision 2: Access Differences, Not Just Formatting Differences

In Project Signal, the five audiences received different formats of the same information. In Vista, they receive different data.

The CFO does not just see a simpler version of the engineering dashboard. The CFO sees financial KPIs and clinical cost drivers and nothing else. The field lead does not see revenue at risk figures — not because they are confidential, but because a dollar figure without context for a clinician in a rural critical access hospital is noise that generates questions the PM then has to answer.

This distinction matters because it changes what "audience-appropriate" means. In a pushed report, formatting is the tool. In a pull model, access architecture is the tool. Those require different PM decisions.

---

## Decision 3: No Naked Red

This is the rule that does not exist in the first three projects because it does not need to.

In a pushed communication, the PM frames the red metric before it reaches the audience. In a self-service dashboard, the metric arrives unmediated. A red SOP adoption rate at Week 4 of a 6-week phased rollout looks like failure. It is not failure. It is a rollout in progress.

The governance model includes a mandatory context note field for every KPI in Red status. The AI is prompted to generate those notes as part of the KPI scorecard. The PM's job is to validate that the context is accurate and sufficient — not to write it from scratch every week.

The rule: no KPI surfaces as Red without a context note explaining why it is Red and what the resolution path is.

---

## Decision 4: Data Freshness Is a Governance Problem

When a stakeholder pulls a report and sees a DSO of 43 days, they assume that number is current. If it is 72 hours stale because the billing system batch runs nightly, the assumption is wrong — and any decision made on that number is made on false information.

I documented freshness expectations as a governance requirement in the data-sources file: each source system has an explicit refresh cadence, and that cadence is surfaced in the dashboard UI as a "last updated" timestamp. This is not a technical requirement. It is a trust requirement.

Stale data that looks current is worse than no data. The dashboard design enforces this by requiring every data panel to display its source and last update time.

---

## What the AI Did vs. What the PM Decided

| AI Executed | PM Decided |
|---|---|
| Generated KPI definitions and measurement rules from prior project data | Which KPIs belong in each category and why |
| Designed stakeholder view specifications per audience | Where the access boundaries are and the rationale for each |
| Produced governance model with ownership and cadence | What the escalation triggers are (which Red conditions generate active alerts vs. passive display) |
| Generated context notes for Red KPIs in the scorecard | Whether the context notes are accurate and sufficient |
| Built data source mapping and freshness table | That freshness is a governance requirement, not a technical footnote |

---

## What I Would Do Differently With Real Data

**Validate KPI definitions with each stakeholder before building.** A KPI definition that finance agrees to in isolation may conflict with how operations measures the same outcome. Those conflicts surface at the worst possible moment — when the dashboard is live and two executives are comparing notes.

**Build the governance model before the first sprint, not after.** Vista is positioned as the capstone of a three-sprint delivery. In practice, KPI ownership conversations should happen during PI Planning, not after Sprint 3. The dashboard is much easier to trust when stakeholders have been part of defining what it measures.

**Add a feedback mechanism.** The first version of any dashboard will measure the wrong things with the wrong frequency for at least one audience. A lightweight feedback loop — even a simple "this metric is not useful to me" button — is cheaper than a full redesign cycle after go-live.
