# Stakeholder Views: Access Architecture

## Purpose

This document defines what each stakeholder audience sees in the Project Vista dashboard, what they do not see, and the PM rationale for each boundary. These are not formatting differences — they are access differences. The CFO does not receive a simplified version of the engineering dashboard. They receive a different dataset.

**Design principle:** In a push model, the PM controls the narrative. In a pull model, the data architecture controls the narrative. Every boundary decision here is a narrative decision.

---

## Audience 1: Chief Medical Officer

| Parameter | Value |
|---|---|
| **Sees** | Clinical Operations KPIs (all 4) · Site Rollout Progress · Adoption trend line |
| **Does not see** | Financial dollar figures · API error rates · Sprint velocity · Revenue at Risk |
| **Default view** | Clinical KPI scorecard with trend arrows · Rollout progress bar |
| **Drill-down available** | Site-level adoption breakdown by archetype |
| **Red metric handling** | Context note mandatory · No financial framing in context note |
| **Mobile / rural** | Full functionality at 3G · No real-time data dependencies in CMO view |
| **Primary metric** | Manual Case Rate (% trending toward < 12% target) |
| **Single ask** | "Are my clinicians working in a stable, improving environment?" |

**PM rationale for access boundary:** The CMO's decisions are clinical. Revenue at Risk and API error rates require technical and financial context to interpret correctly — without that context, they generate questions that pull the CMO into problem spaces that are not theirs to solve. The CMO view is designed to answer one question clearly and completely.

---

## Audience 2: Chief Financial Officer

| Parameter | Value |
|---|---|
| **Sees** | Financial / Revenue Cycle KPIs (all 4) · Manual Case Rate (as cost driver) · Modifier Error Rate (as revenue impact) |
| **Does not see** | Technical root causes · Sprint velocity · Team capacity · API error details |
| **Default view** | Financial KPI scorecard · DSO trend · Revenue at Risk gauge |
| **Drill-down available** | Claims by exception type · DSO by partner hospital · Revenue at Risk aging |
| **Red metric handling** | Context note mandatory · Must include resolution timeline and probability |
| **Mobile / rural** | Full functionality at 3G |
| **Primary metric** | DSO (days) and Revenue at Risk ($) |
| **Single ask** | "Is revenue flowing and is exposure contained?" |

**PM rationale for access boundary:** The CFO receives two clinical KPIs — Manual Case Rate and Modifier Error Rate — because they are direct cost drivers. A 1% increase in modifier error rate has a quantifiable DSO impact; the CFO needs to see the clinical inputs that affect their financial outputs. They do not need the technical root cause of an API error — only whether it is resolved and when.

---

## Audience 3: VP of Engineering

| Parameter | Value |
|---|---|
| **Sees** | All 16 KPIs · Full drill-down on all categories · Data source timestamps · API error logs |
| **Does not see** | Nothing filtered |
| **Default view** | Technical Infrastructure KPIs · Epic completion status · Active alert queue |
| **Drill-down available** | Full — including data quality flags and source system health |
| **Red metric handling** | Context note visible · Root cause link available |
| **Mobile / rural** | Optimized for desktop; mobile view available for top-level KPIs |
| **Primary metric** | HL7 Mapping Accuracy · RCM Platform API Error Rate · Epic Completion Rate |
| **Single ask** | "Is the technical layer stable and are we delivering on schedule?" |

**PM rationale for access boundary:** The VP of Engineering is the owner of the technical infrastructure that all other KPIs depend on. Full visibility is required for accurate diagnosis and prioritization. No access restrictions apply — the VP of Engineering is also the audience most likely to catch data quality issues before they surface as misinterpretations by other stakeholders.

---

## Audience 4: Clinical Operations Field Lead

| Parameter | Value |
|---|---|
| **Sees** | Manual Case Rate · Manual Case Completion Time · SOP Adoption Rate · Site Rollout Progress |
| **Does not see** | Revenue figures · Financial exposure · Technical infrastructure · Sprint velocity |
| **Default view** | 4-KPI summary card · Site adoption rate for their cohort |
| **Drill-down available** | Site-level adoption within their region/cohort |
| **Red metric handling** | Context note mandatory · Framed in operational terms only, no financial framing |
| **Mobile / rural** | Priority — full functionality at 3G, optimized for mobile |
| **Primary metric** | Site Rollout Progress for their cohort |
| **Single ask** | "Will anything change for my clinicians this week?" |

**PM rationale for access boundary:** Revenue at Risk in dollar figures, presented without financial context to a clinical field lead in a rural critical access hospital, generates panic and questions that escalate to the CFO and back to the PM before anyone has determined whether it is actionable. The field lead's decisions are operational — site adoption, clinician readiness, workflow friction. They need exactly that and nothing else.

---

## Audience 5: Product Manager

| Parameter | Value |
|---|---|
| **Sees** | All 16 KPIs · Governance layer · Data quality flags · Context note edit access · Escalation queue |
| **Does not see** | Nothing filtered |
| **Default view** | Full dashboard with governance overlay · Pending context note alerts · Freshness warnings |
| **Drill-down available** | Full — including KPI definition version history and owner change log |
| **Red metric handling** | Receives active alert · Responsible for validating context notes before other audiences see them |
| **Mobile / rural** | Desktop primary |
| **Primary metric** | All KPIs in aggregate · Data quality health |
| **Single ask** | "Is the system telling the truth and is every stakeholder getting what they need?" |

**PM rationale:** The PM is the owner of the dashboard itself, not just a consumer of it. The governance layer — context note validation, freshness alerts, data quality flags — is only visible to the PM view. This is not because it is confidential; it is because it is operational overhead that other audiences should never have to manage.

---

## Cross-Audience Consistency Rules

Drawn from Project Signal's consistency enforcement layer — adapted for a persistent dashboard rather than point-in-time communications.

| Rule | Requirement |
|---|---|
| Same fact, same number | If Manual Case Rate appears in both the CMO and CFO views, it must show the same value and the same last-updated timestamp |
| Red metric context must be consistent | The context note for a Red KPI must not contradict itself across audiences — different framing is acceptable, different facts are not |
| No audience sees a metric the others do not have access to that would change their interpretation of a shared metric | If the CFO sees DSO trending up, they must also see the context note that explains whether it is driven by a clinical or technical root cause |
