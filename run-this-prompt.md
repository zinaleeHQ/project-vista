# 🟢 Run This Prompt: Project Vista

> **How to use this file:**
> Copy the full prompt below and paste it into any capable AI assistant (Claude, GPT-4, Gemini, etc.).
> The prompt is self-contained — all context needed to run it is embedded inline.
>
> **What you'll get:**
> A complete operational intelligence dashboard design — KPI taxonomy, stakeholder-specific views,
> layout specifications, and a governance model — built from the actual outputs of Projects Horizon,
> Clarity, and Signal.
>
> **PM judgment is required:** The prompt pauses before Phase 3. Read the Phase 2 outputs critically
> before proceeding. The access boundary decisions you approve there determine what each stakeholder
> can conclude from the data — and who gets protected from misreading it.

---

<!-- PROMPT START — copy everything below this line -->

# Dashboard Design Prompt: Project Vista

## Prompt Architecture Overview

This prompt operates in four sequential phases. Each phase must complete before the next begins. The AI cannot design what stakeholders see (Phase 2) until it has defined what is true (Phase 1). It cannot spec the dashboard (Phase 3) until it knows the access boundaries (Phase 2). It cannot produce the governance model (Phase 4) until the full picture is complete.

**Critical design rule:** You are not building a reporting tool. You are designing a system that allows multiple stakeholders with different needs, different literacy levels, and different risk tolerances to access operational data safely — without the PM in the room to frame it.

---

## Phase 1: KPI Taxonomy Generation

### Context Ingestion

You are the PM for a multi-site healthcare enterprise that has just completed a three-sprint delivery cycle. The following work products exist:

- **Project Horizon outputs:** A prioritized 3-sprint roadmap addressing HL7 mapping integrity, clinician workflow optimization, and billing reconciliation. Sprint 1 delivered HL7 mapping stabilization. Sprint 2 delivered Clinician Workflow Optimization (per the Clarity SOP). Sprint 3 delivered a Billing Reconciliation Dashboard for internal PM use.
- **Project Clarity outputs:** A standardized manual charge entry SOP for distributed hospitalists, deployed via a 6-week phased rollout across 50 pilot sites. Before-state: 14 steps, 8.4 min avg, 22% modifier error rate. After-state target: 8 steps, < 3.5 min, < 8% error rate.
- **Project Signal outputs:** A five-audience stakeholder communication framework with defined registries for CMO, CFO, VP Engineering, RCM Platform Vendor, and Clinical Operations Field Lead.

Using these inputs, generate a KPI taxonomy that measures the outcomes of all three projects. Apply the following rules:

**KPI generation rules:**
- Every KPI must have: name, definition, data source, owner, target, measurement frequency
- No KPI without an owner — if ownership is unclear, flag it rather than guessing
- No KPI without a defined data source — aspirational metrics with no connected system are logged as backlog items
- Organize into four categories: Clinical Operations, Financial/Revenue Cycle, Technical Infrastructure, Operational Adoption
- Each category should have 3–5 KPIs — no padding, no duplication
- Identify the two leading indicators most predictive of downstream KPI degradation and flag them explicitly

### Phase 1 Output Requirements

Deliver a KPI taxonomy table with all required fields. For each KPI, include a one-sentence rationale connecting it to a specific prior project outcome. Flag the two leading indicators.

---

## Phase 2: Stakeholder View Design

### Input: Stakeholder Registry (from Project Signal)

Apply the Signal stakeholder registry to define data access for each audience. The registry defines: format preference, technical depth (0–10), primary metric, hard omit list, and tone.

For each of the five audiences, define:

1. **What they see on load** — default dashboard state, no clicks required
2. **What they can drill into** — available with one click
3. **What requires a separate request** — not self-service
4. **Access boundary rationale** — the PM reason for each exclusion (not a technical reason — a narrative reason)
5. **Red metric handling** — how Red KPIs are displayed for this audience specifically

**Access boundary rules:**
- Boundaries are defined by narrative risk, not confidentiality
- A metric is excluded from an audience view if it would generate misinterpretation, alarm, or action outside that audience's scope — not because it is secret
- The CFO view may include clinical KPIs if they are direct cost drivers — document which ones and why
- The CFO view may also include delivery metrics (e.g., Defect Spillover Rate) if the CFO has specifically requested them to track correlation with financial outcomes. Surface these with mandatory engineering context attached, framed in terms of downstream financial impact rather than sprint delivery counts. Document the exception rationale.
- The field lead view must be fully functional at 3G speeds — no real-time dependencies permitted

**No naked red rule:**
No KPI surfaces as Red in any audience view without a context note. The context note must:
- Explain why the metric is Red (root cause or expected trajectory)
- State the resolution path and timeline
- Be written in the audience's language (clinical framing for CMO, financial framing for CFO, technical framing for VP Eng)

### Phase 2 Output Requirements

Five audience view specifications, each including: default view, drill-down options, access boundaries with rationale, and red metric handling protocol.

---


---

## ⏸️ PAUSE POINT — PM JUDGMENT CHECKPOINT

Before executing Phase 3, stop and review the stakeholder view designs above.

For each access boundary decision, ask yourself: **Am I making this decision as an operator protecting data integrity, or as someone trying to be generous with information access?**

Review checklist:
- [ ] **CMO view** — Does every metric shown drive a decision the CMO can actually make? Remove anything that's informational only.
- [ ] **CFO view** — Are revenue cycle metrics framed in dollar impact, not operational counts?
- [ ] **VP Engineering view** — Is technical infrastructure data isolated so it can't be compared against clinical outcomes without context?
- [ ] **Clinical Field Lead view** — Are site-level comparisons visible only with sufficient context to prevent misinterpretation?
- [ ] **PM view** — Does this view support governance decisions, not just monitoring?
- [ ] **"No Naked Red" rule** — Every red metric must have an adjacent explanation. Confirm this is enforced in the spec before proceeding.

**When you are satisfied that every access boundary is a deliberate PM decision — not a default — reply "proceed" to run Phase 3: Dashboard Specification.**

---

## Phase 3: Dashboard Specification

### Layout and Interaction Design

For each stakeholder view, produce a dashboard specification that defines:

1. **Default screen layout** — what appears above the fold, what requires scroll
2. **KPI card format** — which KPIs display as single numbers, which as trend lines, which as gauges
3. **Red metric display** — how context notes are surfaced (inline, expandable, tooltip)
4. **Data freshness display** — how source system and last-updated timestamp are displayed per panel
5. **Mobile / low-bandwidth behavior** — which elements degrade gracefully at 3G, which require desktop

**Dashboard design rules:**
- Every KPI panel must display: current value, target, trend direction (up/down/flat), last-updated timestamp
- Red KPI context notes must be visible without a click for executive audiences (CMO, CFO)
- Engineering view may require click to expand context — full technical detail is appropriate
- Field lead view must be readable on a mobile screen in a single scroll — no horizontal scrolling
- No KPI displays a value if the source system is unavailable — "Data Unavailable [timestamp]" is required

### Phase 3 Output Requirements

Five stakeholder view dashboard specs, each with default layout, KPI card format, red metric surfacing method, freshness display, and mobile behavior.

---

## Phase 4: Governance Model

### KPI Ownership and Review Cadence

For each KPI, define:
- **Owner:** who is accountable for the number being correct
- **Review cadence:** when the owner reviews and validates their KPIs (not when the data updates — when a human reviews it)
- **Escalation trigger:** the specific condition that generates an active alert rather than passive Red display
- **Data quality rule:** the condition that flags a data quality problem rather than an operational problem

**Escalation trigger design rules:**
- Not every Red KPI generates an active alert — Red display is passive, escalation is active
- Escalation triggers are reserved for conditions that require human action within 24 hours
- Identify the dependency chain: which technical KPI, if it goes Red, will cause downstream clinical and financial KPIs to degrade within 48 hours? That KPI's escalation trigger should be set lower than its Red threshold

**KPI version control rules:**
- KPI definitions may change as the organization learns — every change must be logged with date, rationale, and owner
- When a target changes, historical data must be relabeled to show which target was in effect at the time
- No retroactive target changes — targets may only be adjusted prospectively

### Phase 4 Output Requirements

Governance model table with: KPI, owner, review cadence, escalation trigger, data quality rule. Plus KPI version history table (initial version). Plus dependency chain documentation.

---

## Output Validation Checklist

Before finalizing any output, verify:

- [ ] Every KPI has an owner, definition, source, target, and frequency
- [ ] No audience view contains a metric whose misinterpretation would generate out-of-scope action
- [ ] Every Red KPI has a context note in every audience view where it is visible
- [ ] Every KPI panel spec includes a data freshness display
- [ ] Every escalation trigger is specific (a condition, not "when it goes Red")
- [ ] The dependency chain is documented (which technical KPI degradation predicts downstream clinical/financial degradation)
- [ ] No KPI definition has changed meaning between Phase 1 and Phase 4
