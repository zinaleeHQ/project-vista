# Governance Model: Project Vista

*Generated output from `/prompts/dashboard-design-prompt.md` · Portfolio simulation*

---

## KPI Ownership and Review Cadence

| KPI | Owner | Review Cadence | Escalation Trigger | Data Quality Rule |
|---|---|---|---|---|
| Manual Case Rate | VP Clinical Operations | Weekly (Monday AM) | If > 15% for 2 consecutive weeks post-rollout completion | Flag if RCM platform API returns incomplete data for > 2 hours |
| Manual Case Completion Time | VP Clinical Operations | Weekly (Monday AM) | If > 5.0 min average for 2 consecutive weeks post-rollout | Flag if sample size < 50 cases in measurement window |
| Modifier Error Rate | Revenue Cycle Director | Weekly (Tuesday AM) | If > 12% for 2 consecutive weeks post-rollout completion | Flag if billing batch has not run by 7:00 PM |
| Clinician Satisfaction Score | VP Clinical Operations | Monthly | If score drops below 3.0 / 5.0 | Flag if survey response rate < 30% |
| DSO | CFO | Weekly (Wednesday AM) | If > 50 days for 2 consecutive weeks | Flag if billing batch has not run by 7:00 PM |
| Same-Day Claim Submission Rate | Revenue Cycle Director | Weekly (Wednesday AM) | If < 90% for 2 consecutive weeks post-rollout | Flag if billing batch has not run |
| Billing Reconciliation Accuracy | Revenue Cycle Director | Weekly (Wednesday AM) | If < 96% for 2 consecutive weeks | Flag if billing batch has not run |
| Revenue at Risk | CFO | Daily | If > $75K — active alert to CFO and PM | Flag if billing batch has not run |
| Sprint Velocity | VP Engineering | Per sprint close | If < 28 SP for 2 consecutive sprints | Flag if PM has not updated within 48 hours of sprint close |
| Epic Completion Rate | VP Engineering | Per sprint close | If < 80% for 2 consecutive sprints | Flag if PM has not updated within 48 hours of sprint close |
| RCM Platform API Error Rate | VP Engineering | Daily | If > 1% for > 30 minutes — active alert | Flag if API returns no data for > 15 minutes |
| HL7 Mapping Accuracy | VP Engineering | Daily | If < 99% for > 1 hour — active alert | Flag if transaction volume drops > 50% below baseline |
| SOP Adoption Rate | VP Clinical Operations | Weekly (Monday AM) | If < 60% at Week 6 rollout close — escalation to CMO | Flag if RCM platform API returns incomplete data |
| Training Completion Rate | VP Clinical Operations | Weekly (Monday AM) | If < 70% at Week 6 rollout close | Flag if RCM platform API returns incomplete data |
| Workflow Support Ticket Volume | VP Clinical Operations | Weekly (Monday AM) | If > 20/week for 2 consecutive weeks post-rollout | Flag if ticketing system has not synced within 26 hours |
| Site Rollout Progress | PM | Weekly | If any site requests delay beyond 2 weeks — CMO and VP Clinical Operations notified | Flag if PM has not updated within 7 days |

---

## Dependency Chain

The two leading indicators that predict downstream KPI degradation:

### Leading Indicator 1: RCM Platform API Error Rate

| If API error rate exceeds... | Then within... | These KPIs degrade: |
|---|---|---|
| 0.5% sustained > 15 min | 2 hours | Manual Case Rate (incomplete data), Manual Case Completion Time (incomplete data) |
| 1.0% sustained > 30 min | 24–48 hours | SOP Adoption Rate (incomplete data), Training Completion Rate (incomplete data) |
| 2.0% sustained > 1 hour | 48–72 hours | Same-Day Claim Submission Rate (cases not submitting), Modifier Error Rate (rising) |

**Escalation protocol:** API error rate > 1% for > 30 minutes → active alert to VP Engineering and PM → VP Engineering owns resolution within 4 hours → PM notifies CMO and CFO only if resolution is not confirmed within 4 hours.

### Leading Indicator 2: Revenue at Risk

| If Revenue at Risk exceeds... | Then within... | Action: |
|---|---|---|
| $50K | — | Amber display, no alert — monitor |
| $75K | 7–10 business days | DSO escalation risk — active alert to CFO and PM |
| $100K | 3–5 business days | DSO will breach 45-day target — CFO active escalation + PM communication |

**Escalation protocol:** Revenue at Risk > $75K → active CFO alert generated automatically → CFO and PM review within 24 hours → PM determines whether Signal-style stakeholder communication is needed.

---

## KPI Version History

| KPI | Version | Effective Date | Change | Rationale | Owner |
|---|---|---|---|---|---|
| Manual Case Rate | 1.0 | Sprint 3 close | Initial definition: % of encounters requiring manual intervention | Baseline established from Clarity pre-state data | VP Clinical Operations |
| Modifier Error Rate | 1.0 | Sprint 3 close | Initial definition: % of manual cases with incorrect modifier requiring resubmission | Baseline 22% established from Clarity pre-state | Revenue Cycle Director |
| SOP Adoption Rate | 1.0 | Sprint 3 close | Initial definition: % of active sites using standardized SOP | Rollout-phase context note rule applied from initial version | VP Clinical Operations |
| All other KPIs | 1.0 | Sprint 3 close | Initial definitions as per KPI framework document | — | Per ownership table |

**Version control rules:**
- Target changes require owner approval and PM sign-off
- Target changes apply prospectively only — no retroactive relabeling of historical status
- Definition changes require VP Engineering review if the KPI is sourced from a technical system
- All changes logged here before taking effect in the dashboard

---

## Escalation Routing Summary

| Condition | Alert To | Response SLA |
|---|---|---|
| RCM Platform API Error Rate > 1% for > 30 min | VP Engineering, PM | 4 hours to resolution confirmation |
| HL7 Mapping Accuracy < 99% for > 1 hour | VP Engineering, PM | 4 hours to root cause identification |
| Revenue at Risk > $75K | CFO, PM | 24 hours to review and decision |
| SOP Adoption Rate < 60% at Week 6 close | CMO, VP Clinical Operations, PM | 48 hours to remediation plan |
| Any KPI context note unvalidated > 48 hours | PM only | PM responsibility — no external alert |
| Source system batch failure > 2 hours past expected time | PM, system owner | 2 hours to status update |
