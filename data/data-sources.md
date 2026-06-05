# Data Sources: Freshness, Quality, and Governance

## Purpose

This document maps every Project Vista KPI to its source system, defines the expected data freshness for each source, and establishes the data quality rules that make the dashboard trustworthy.

**Governance principle:** Stale data that looks current is worse than no data. Every data panel in the dashboard displays its source system and last-updated timestamp. This is not a technical feature — it is a trust requirement.

---

## Source System Registry

### Source 1: RCM Platform API
*Feeds: Manual Case Rate, Manual Case Completion Time, SOP Adoption Rate, Training Completion Rate, Site Rollout Progress (partial), RCM Platform API Error Rate*

| Parameter | Value |
|---|---|
| Refresh cadence | Real-time polling (15-minute intervals for clinical KPIs) |
| Latency expectation | < 5 minutes from event to dashboard display |
| Data quality risk | API error rate affects own measurement (self-referential) — flag if error rate > 1% |
| Rural connectivity | All clinical KPIs cached for offline display; last-updated timestamp displayed prominently |
| Escalation trigger | If API returns error for > 30 minutes, all dependent KPIs display "Data Unavailable" with timestamp rather than stale value |
| Owner | VP Engineering |

---

### Source 2: HL7 Interface Engine
*Feeds: HL7 Mapping Accuracy*

| Parameter | Value |
|---|---|
| Refresh cadence | Real-time (event-driven — updates on each transaction) |
| Latency expectation | < 2 minutes from transaction to metric update |
| Data quality risk | Mapping errors are the metric being measured — no circular dependency |
| Rural connectivity | HL7 accuracy displayed as rolling 24-hour rate; no real-time dependency for dashboard display |
| Escalation trigger | If mapping accuracy drops below 99% for > 1 hour, active alert generated for VP Engineering |
| Owner | VP Engineering |

---

### Source 3: Billing System
*Feeds: Modifier Error Rate, DSO, Same-Day Claim Submission Rate, Billing Reconciliation Accuracy, Revenue at Risk*

| Parameter | Value |
|---|---|
| Refresh cadence | Daily batch — end of business day (5:00 PM local) |
| Latency expectation | Financial KPIs reflect previous business day's activity |
| Data quality risk | Batch failures result in stale data; billing system must flag batch completion status |
| Rural connectivity | Not applicable — financial KPIs are not accessed by field-facing audiences |
| Escalation trigger | If batch has not run by 7:00 PM, all financial KPIs display "Pending — Last Updated [date]" |
| Owner | CFO / Revenue Cycle Director |

**Freshness note for financial audiences:** CFO and Revenue Cycle Director must understand that financial KPIs reflect end-of-prior-business-day data, not real-time. This is documented in the dashboard UI and in the stakeholder onboarding materials.

---

### Source 4: Sprint Tracking System
*Feeds: Sprint Velocity, Epic Completion Rate*

| Parameter | Value |
|---|---|
| Refresh cadence | Per-sprint update — manual PM input at sprint close |
| Latency expectation | Sprint KPIs updated within 24 hours of sprint close |
| Data quality risk | Manual input dependency — PM must complete sprint close process for data to update |
| Rural connectivity | Not applicable — sprint KPIs are not accessed by field-facing audiences |
| Escalation trigger | If sprint KPIs have not been updated within 48 hours of sprint close date, PM receives alert |
| Owner | PM |

---

### Source 5: Support Ticketing System
*Feeds: Workflow Support Ticket Volume*

| Parameter | Value |
|---|---|
| Refresh cadence | Daily (automated pull at midnight) |
| Latency expectation | Ticket volume reflects previous calendar day |
| Data quality risk | Ticket categorization must be consistent — "workflow" tickets must be tagged correctly at intake |
| Rural connectivity | Not applicable |
| Escalation trigger | If weekly ticket volume increases > 25% week-over-week for two consecutive weeks, PM alert generated |
| Owner | VP Clinical Operations |

---

## Data Quality Rules

| Rule | Requirement |
|---|---|
| No stale data displayed as current | Every KPI panel displays source system and last-updated timestamp |
| Data unavailable ≠ zero | If a source system is unreachable, KPI displays "Data Unavailable" — not zero, not previous value without timestamp |
| Batch failure protocol | If a batch source fails, dependent KPIs display last-known-good value with explicit staleness warning |
| Self-referential KPI handling | RCM Platform API Error Rate is sourced from the same system it measures — if the API is down, this KPI displays "System Unavailable" |
| Rural connectivity resilience | All KPIs accessible to field-facing audiences must function at 3G speeds with cached data; real-time dependency is prohibited for field views |

---

## KPI-to-Source Mapping Summary

| KPI | Source System | Freshness | Field-Accessible |
|---|---|---|---|
| Manual Case Rate | RCM platform API | 15-min | Yes |
| Manual Case Completion Time | RCM platform API | 15-min | Yes |
| Modifier Error Rate | Billing system | Daily batch | No |
| Clinician Satisfaction Score | Survey platform | Monthly | Yes |
| DSO | Billing system | Daily batch | No |
| Same-Day Claim Submission Rate | Billing system | Daily batch | No |
| Billing Reconciliation Accuracy | Billing system | Daily batch | No |
| Revenue at Risk | Billing system | Daily batch | No |
| Sprint Velocity | Sprint tracking | Per sprint | No |
| Epic Completion Rate | Sprint tracking | Per sprint | No |
| RCM Platform API Error Rate | RCM platform API | Real-time | No |
| HL7 Mapping Accuracy | HL7 interface engine | Real-time | No |
| SOP Adoption Rate | RCM platform API | 15-min | Yes |
| Training Completion Rate | RCM platform API | 15-min | Yes |
| Workflow Support Ticket Volume | Support ticketing | Daily | No |
| Site Rollout Progress | PM tracking | Weekly | Yes |
