# KPI Framework: Operational Intelligence Layer

## Purpose

This document defines the 17 KPIs that form the measurement backbone of the Project Vista dashboard. Each KPI is drawn directly from the work products of Projects Horizon, Clarity, and Signal. No KPI appears here that was not already implied by the prior three projects — Vista measures what was built, not abstract ideals.

**Design rule:** Every KPI has an owner. A metric without an owner is a number without accountability.

---

## KPI Taxonomy

### Category 1: Clinical Operations
*Source project: Clarity · Owner: VP Clinical Operations*

| KPI | Definition | Data Source | Owner | Target | Frequency |
|---|---|---|---|---|---|
| Manual Case Rate | % of clinical encounters requiring manual RCM platform intervention | RCM platform API | VP Clinical Operations | < 12% | Daily |
| Manual Case Completion Time | Avg minutes per manual case from trigger to charge submission | RCM platform API | VP Clinical Operations | < 3.5 min | Daily |
| Modifier Error Rate | % of manual cases resulting in incorrect modifier submission requiring resubmission | Billing system | Revenue Cycle Director | < 8% | Weekly |
| Clinician Satisfaction Score | Avg score on post-workflow friction survey (1–5 scale) | Survey platform | VP Clinical Operations | > 3.8 / 5.0 | Monthly |

**Baseline note:** Manual Case Rate (15%), Completion Time (8.4 min), and Modifier Error Rate (22%) are the pre-Clarity baselines. Vista tracks improvement trajectory against those starting points.

---

### Category 2: Financial / Revenue Cycle
*Source project: Horizon (Epic 3) · Owner: CFO / Revenue Cycle Director*

| KPI | Definition | Data Source | Owner | Target | Frequency |
|---|---|---|---|---|---|
| Days Sales Outstanding (DSO) | Avg days from service delivery to payment receipt | Billing system | CFO | < 45 days | Weekly |
| Same-Day Claim Submission Rate | % of cases submitted to payer on day of service | Billing system | Revenue Cycle Director | > 95% | Daily |
| Billing Reconciliation Accuracy | % of submitted claims with no modifier error requiring resubmission | Billing system | Revenue Cycle Director | > 98% | Weekly |
| Revenue at Risk | $ value of claims in exception queue > 5 business days unresolved | Billing system | CFO | < $50K | Daily |

**DSO protection note:** Revenue at Risk is the leading indicator for DSO exposure. If Revenue at Risk exceeds $75K, the DSO target is at risk within 7–10 business days. This relationship is documented in the governance model escalation triggers.

---

### Category 3: Technical Infrastructure
*Source project: Horizon (Epics 1 and 2) · Owner: VP Engineering*

| KPI | Definition | Data Source | Owner | Target | Frequency |
|---|---|---|---|---|---|
| Sprint Velocity | Story points completed per 2-week sprint | Sprint tracking system | VP Engineering | 35–40 SP | Per sprint |
| Defect Spillover Rate | % of sprint-committed scope (story points) that carries over undelivered to the following sprint | Sprint tracking system | VP Engineering | < 10% per sprint | Per sprint |
| Epic Completion Rate | % of sprint-committed epics delivered on schedule | Sprint tracking system | VP Engineering | > 95% | Per sprint |
| RCM Platform API Error Rate | % of API calls resulting in error or timeout | RCM platform API | VP Engineering | < 0.5% | Real-time |
| HL7 Mapping Accuracy | % of HL7 transactions processed without mapping error | HL7 interface engine | VP Engineering | > 99.5% | Real-time |

**Dependency note:** HL7 Mapping Accuracy and RCM Platform API Error Rate are the two technical KPIs with direct downstream impact on Clinical and Financial categories. If either goes Red, Clinical and Financial KPIs will degrade within 
24–48 hours. This dependency chain is documented in the governance model escalation triggers.

**CFO exception note:** Defect Spillover Rate is a VP Engineering-owned metric that also surfaces in the CFO view by specific request. The CFO identified a pattern between sprint delivery gaps and downstream revenue cycle delays. It is surfaced in the CFO view with mandatory engineering context attached, framed in terms of downstream financial impact rather than raw sprint delivery counts. VP Engineering owns this metric regardless of which audience view displays it.

---

### Category 4: Operational Adoption
*Source project: Clarity (Rollout Plan) · Owner: VP Clinical Operations / PM*

| KPI | Definition | Data Source | Owner | Target | Frequency |
|---|---|---|---|---|---|
| SOP Adoption Rate | % of active clinical sites using the standardized manual case workflow | RCM platform API | VP Clinical Operations | > 85% | Weekly |
| Training Completion Rate | % of active clinicians who have completed the embedded SOP guidance sequence | RCM platform API | VP Clinical Operations | > 90% | Weekly |
| Workflow Support Ticket Volume | # of clinician-initiated support tickets related to manual case workflow per week | Support ticketing system | VP Clinical Operations | < 5 / week, declining | Weekly |
| Site Rollout Progress | % of target pilot sites (50) live on updated workflow | PM tracking | PM | 100% by Phase 3 end | Weekly |

**Rollout context note:** SOP Adoption Rate and Training Completion Rate will appear Red during the 6-week phased rollout and are expected to do so. Both KPIs require embedded context notes in the dashboard that reference the rollout phase and projected completion date. See governance model for context note rules.

---

## Pre-Scoring Filter Rules

| Rule | Logic |
|---|---|
| No KPI without an owner | Any proposed KPI with no assigned owner is excluded until ownership is confirmed |
| No KPI without a defined data source | Aspirational metrics without a connected source system are logged as backlog items, not active KPIs |
| No duplicate measurements | If two KPIs measure the same operational reality, the more leading indicator is retained |
| Freshness must be specified | Every KPI must have a documented measurement frequency — "as available" is not acceptable |
