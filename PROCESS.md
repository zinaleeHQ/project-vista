# The PROCESS — How I Built This Project

*Zina Lee, Product Manager*

---

## Why I Built This

I've spent years as a PM in environments where AI tools were restricted or unavailable — including federal contracting work where the security posture simply didn't permit it. That means my AI fluency has lived entirely in theory: frameworks, certifications, strategic understanding — but no portfolio artifacts to show for it.

This project exists to close that gap honestly: by building something grounded in a real company's actual technology challenges, using AI as a transparent and accountable tool, and documenting every decision along the way.

---

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

## What Happened When I Actually Ran It

### Phase 0 was missing — and it matters

This prompt assumes a Phase 0 happened before the design work began: a platform selection decision that determined where this dashboard would actually live. That decision is out of scope for this portfolio, but it would deeply affect every capability designed into this spec. Designing the actual dashboard (and the tools available to use for the reporting) would be limited by what the platform can do, including the UX.

Platform choice directly constrains four things built into this design: dynamic context note editing, the PM governance overlay, offline data caching for field-facing views, and the escalation alert layer. A static BI embed handles none of them. An enterprise platform like Power BI or Tableau handles some. A purpose-built application handles all of them — at significantly higher build cost. That tradeoff is a PM decision, not a technical one, and it should be made before Phase 1 begins, not after the spec is complete.

**On realistic implementation:** Vista's framework is tool-agnostic by design — the PM governance decisions are the same regardless of platform. In practice, the landscape breaks down by organizational maturity:

| Tool Path | Fits When | Watch For |
|-----------|-----------|-----------|
| **Jira dashboards** | Audience is VP Engineering or PM; data is native to Jira | Can't reach EMR, billing, or clinical ops data without custom integration |
| **Confluence + connectors** (EazyBI, Power BI embed, Tableau embed) | Mid-market org without a full BI platform | Pragmatic path — audience-filtered page permissions map directly to Vista's access architecture; explanatory text next to red metrics is a natural Confluence strength |
| **Full BI platform** (Power BI, Tableau, Looker) | Org already has enterprise tooling | Proper implementation for dynamic access control, freshness indicators, and the escalation alert layer |

The PM governance decisions from Phase 4 — KPI ownership, access boundaries, context note requirements, freshness thresholds — are what matter regardless of which tool you land on. The platform changes the build cost and the capability ceiling. The governance model is what makes the dashboard trustworthy.

### The dependency chain is a 5–10 day warning system

The mock flagged the two leading indicators. The live run made their value clearer: RCM Platform API Error Rate and Revenue at Risk aren't just early warnings — they're the beginning of a cascade that takes 5–10 business days to reach DSO. A PM watching only DSO is always reacting. A PM watching the two leading indicators has a week of lead time to intervene before the financial damage lands.

That cascade — API error → manual case rate → modifier errors → revenue at risk → DSO — is the most actionable thing in the governance model. It should be the first thing in the PM's dashboard default view, not buried in the dependency chain documentation.

### The rollout context note needs a hard date

The governance model correctly flags SOP Adoption and Training Completion as "Red during rollout is expected — no escalation." But "during rollout" is ambiguous the moment the rollout ends. Before the dashboard is published, the PM must set the Phase 3 completion date as a hard threshold in the governance model. After that date, Red triggers escalation. Without the date, the context note becomes a permanent excuse rather than a time-bounded explanation.

---

## What I Would Do Differently With Real Data

**Validate KPI definitions with each stakeholder before building.** A KPI definition that finance agrees to in isolation may conflict with how operations measures the same outcome. Those conflicts surface at the worst possible moment — when the dashboard is live and two executives are comparing notes.

**Build the governance model before the first sprint, not after.** Vista is positioned as the capstone of a three-sprint delivery. In practice, KPI ownership conversations should happen during PI Planning, not after Sprint 3. The dashboard is much easier to trust when stakeholders have been part of defining what it measures.

**Add a feedback mechanism.** The first version of any dashboard will generally measure the wrong things with the wrong frequency for at least one audience. A lightweight feedback loop — even a simple "this metric is not useful to me" button — is cheaper than a full redesign cycle after go-live.


### Live run observations from Claude *(from running this prompt with Claude)*
(Asking AI to validate and test its data is usually a very valuable step in the prompt process.)

*What held up well:*
- The dependency chain is clean and the cascade timing is specific — that's genuinely useful output, not generic filler
- The "explanation before metric" rule for the Field Lead view is a good catch that a lot of dashboard designers miss
- The escalation triggers are specific conditions, not just "when it goes Red" — that's the prompt doing its job

*What to pressure-test with real data:*
- The dollar thresholds (Revenue at Risk > $800K for escalation) are illustrative — a real org would calibrate those in the PM judgment phase
- The data quality rules would need validation against actual system behavior before they're trustworthy

*What this confirms about the prompt design:*
The pause point works exactly as designed. Someone running this prompt genuinely has to stop, read five access boundary rationales, and decide whether they're right — before anything else generates. That's the judgment showcase doing its job.

---

*This document reflects my actual decision-making process in building this project. It is intended to give reviewers — technical and non-technical — an honest view of where the PM thinking ends and the AI tooling begins — and vice-versa.*

*[Back to README](./README.md)*
