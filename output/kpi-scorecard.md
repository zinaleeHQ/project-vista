# KPI Scorecard: Project Vista

*Generated output from `/prompts/dashboard-design-prompt.md` · Mock data · Portfolio simulation*

**Scorecard date:** End of Phase 2, Week 4 of 6-week rollout (post-Sprint 3 delivery)

**RAG Key:** 🟢 Green = at or above target · 🟡 Amber = within 10% of target, trending correct direction · 🔴 Red = below target threshold · requires context note

---

## Category 1: Clinical Operations

| KPI | Target | Current | Status | Trend | Context Note |
|---|---|---|---|---|---|
| Manual Case Rate | < 12% | 13.2% | 🟡 Amber | ↓ Improving | Week 4 of Clarity SOP rollout — 31/50 sites live. Pace projects 11.4% at full adoption (Week 6). |
| Manual Case Completion Time | < 3.5 min | 3.4 min | 🟢 Green | ↓ Improving | Within target at sites where SOP is live. Average reflects mixed cohort. |
| Modifier Error Rate | < 8% | 9.1% | 🟡 Amber | ↓ Improving | Pre-Clarity baseline was 22%. Current rate reflects sites not yet on updated SOP. Projects < 8% at full adoption. |
| Clinician Satisfaction Score | > 3.8 / 5.0 | 3.6 / 5.0 | 🟡 Amber | ↑ Improving | Survey reflects early-adoption friction. Cohort A sites (live 4 weeks) are averaging 4.1. Trend is favorable. |

---

## Category 2: Financial / Revenue Cycle

| KPI | Target | Current | Status | Trend | Context Note |
|---|---|---|---|---|---|
| DSO | < 45 days | 43 days | 🟢 Green | → Stable | Within target. Revenue at Risk is the leading indicator to watch — currently within threshold. |
| Same-Day Claim Submission Rate | > 95% | 93.2% | 🟡 Amber | ↑ Improving | Amber driven by sites not yet on updated SOP submitting same-day at 87%. Cohort A sites: 97.1%. |
| Billing Reconciliation Accuracy | > 98% | 97.8% | 🟡 Amber | ↑ Improving | 0.2% below target. Driven by residual modifier errors from pre-SOP sites. Projects above target at full adoption. |
| Revenue at Risk | < $50K | $42K | 🟢 Green | → Stable | Within threshold. No DSO escalation trigger conditions met. Monitor weekly. |

---

## Category 3: Technical Infrastructure

| KPI | Target | Current | Status | Trend | Context Note |
|---|---|---|---|---|---|
| Sprint Velocity | 35–40 SP | 38 SP | 🟢 Green | → Stable | Sprint 3 closed on schedule. Next sprint planning cycle pending PI Planning. |
| Epic Completion Rate | > 95% | 100% | 🟢 Green | → Stable | All three Sprint 3 epics delivered. No carryover. |
| RCM Platform API Error Rate | < 0.5% | 0.3% | 🟢 Green | → Stable | Within target. No escalation conditions. |
| HL7 Mapping Accuracy | > 99.5% | 99.7% | 🟢 Green | → Stable | Within target. Sprint 1 HL7 upgrade holding. |

---

## Category 4: Operational Adoption

| KPI | Target | Current | Status | Trend | Context Note |
|---|---|---|---|---|---|
| SOP Adoption Rate | > 85% | 71% | 🔴 Red | ↑ Improving | **Week 4 of 6-week phased rollout. 31/50 sites live.** Cohort C (final 10 sites) deploys Week 5. Projected 89% adoption at Week 6 based on Cohort A and B completion rates. This metric is expected Red during rollout and will not reach target until Phase 3 close. |
| Training Completion Rate | > 90% | 68% | 🔴 Red | ↑ Improving | **Week 4 of 6-week phased rollout.** Embedded training completion tracks site adoption — clinicians complete training at go-live. Projected 92% at Week 6. Expected Red until rollout completes. |
| Workflow Support Ticket Volume | < 5 / week, declining | 8 / week | 🟡 Amber | ↓ Declining | Peak was 14/week at Cohort A go-live (Week 2). Currently 8 and declining. Projects below 5 by Week 6 based on Cohort A trajectory (now 2/week). |
| Site Rollout Progress | 100% by Phase 3 end | 62% (31/50 sites) | 🟡 Amber | ↑ On schedule | On schedule for 100% by Week 6. Cohort C deploys Week 5. No sites have requested delay or exception. |

---

## Leading Indicator Alert Status

| Leading Indicator | Current Status | Downstream Risk |
|---|---|---|
| RCM Platform API Error Rate | 🟢 0.3% | If > 1%: Manual Case Rate, Modifier Error Rate, and DSO will degrade within 24–48 hours |
| Revenue at Risk | 🟢 $42K | If > $75K: DSO escalation trigger activates — CFO alert generated |

---

## Context Note Validation Log

| KPI | Context Note Author | Validated By PM | Date |
|---|---|---|---|
| SOP Adoption Rate | AI-generated from rollout data | PM | Week 4 |
| Training Completion Rate | AI-generated from rollout data | PM | Week 4 |
| Manual Case Rate | AI-generated from rollout data | PM | Week 4 |
