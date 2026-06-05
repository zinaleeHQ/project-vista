# Dashboard Specification: Project Vista

*Generated output from `/prompts/dashboard-design-prompt.md` · Portfolio simulation*

---

## View 1: Chief Medical Officer

**Default screen (above the fold):**
- 4-KPI Clinical Operations scorecard — each card shows: current value, target, trend arrow, last-updated timestamp
- Site Rollout Progress bar — "31 of 50 sites live · Week 4 of 6"
- No financial figures visible at any zoom level

**KPI card format:**
- Manual Case Rate: large number with trend arrow + Amber indicator + expandable context note
- Manual Case Completion Time: large number with Green indicator
- Modifier Error Rate: large number with trend arrow + Amber indicator + expandable context note
- Clinician Satisfaction Score: gauge (1–5 scale) with trend line

**Red/Amber metric display:**
- Context notes visible inline below the KPI value — no click required
- Context notes use clinical language only: "Week 4 of rollout" not "DSO exposure" not "API parameters"

**Data freshness display:**
- Each card footer: "Updated: [timestamp] · Source: RCM platform"
- Rollout progress: "Updated: [date] · Source: PM weekly input"

**Mobile / 3G behavior:**
- All 4 KPI cards stack vertically, full readability at 375px width
- Trend lines collapse to trend arrow only
- Context notes remain fully visible — not collapsed on mobile
- No real-time dependencies — cached data displays within 30 seconds on 3G

---

## View 2: Chief Financial Officer

**Default screen (above the fold):**
- DSO gauge (days) — large format, target line visible
- Revenue at Risk dollar figure — large format with threshold indicator ($50K line)
- Same-Day Claim Submission Rate and Billing Reconciliation Accuracy as secondary cards
- Two clinical cost-driver cards below fold: Manual Case Rate, Modifier Error Rate (labeled "Cost Drivers")

**KPI card format:**
- DSO: gauge with 30/45/60-day markers + trend line (30-day rolling)
- Revenue at Risk: dollar figure with color band (Green < $50K / Amber $50–75K / Red > $75K)
- Claim Submission Rate: percentage with trend arrow
- Billing Reconciliation Accuracy: percentage with trend arrow
- Clinical cost drivers: compact cards with trend arrows and one-line context

**Red/Amber metric display:**
- Context notes for any Red/Amber financial KPI visible inline — include resolution timeline and probability
- Clinical cost driver context notes use financial framing: "Modifier error rate projected below 8% at full SOP adoption (Week 6) — expected $X reduction in resubmission cost"

**Data freshness display:**
- Prominent banner: "Financial data reflects [date] end-of-day · Next update: [date] 5:00 PM"
- Per-card timestamp in footer

**Mobile / 3G behavior:**
- Desktop-optimized view; mobile renders top 3 KPIs in stacked cards
- DSO gauge converts to large number + trend arrow on mobile

---

## View 3: VP of Engineering

**Default screen (above the fold):**
- Technical Infrastructure KPI status table — all 4 KPIs with current value, target, status, trend
- Active alert queue (empty if no escalation triggers met)
- Epic completion status: "Sprint 3 — 3/3 Epics Complete"

**KPI card format:**
- RCM Platform API Error Rate: real-time gauge with 15-minute rolling average
- HL7 Mapping Accuracy: real-time percentage with 24-hour trend line
- Sprint Velocity: bar chart (last 3 sprints)
- Epic Completion Rate: completion tracker with sprint timeline

**Full drill-down available:**
- API error log by error type and timestamp
- HL7 transaction error log with mapping detail
- All 16 KPIs accessible from navigation panel
- Data source health status per source system
- Data quality flag queue

**Red metric display:**
- Full technical context — root cause link, resolution steps, owner, estimated resolution time
- No narrative softening for this audience

**Data freshness display:**
- Real-time timestamp on API and HL7 KPIs (updates every 15 minutes)
- Sprint KPIs: "Last updated: [sprint close date] · Next update: Sprint 4 close"

**Mobile / 3G behavior:**
- Desktop primary; mobile shows top-level KPI summary only
- Full drill-down requires desktop

---

## View 4: Clinical Operations Field Lead

**Default screen (entire view — single scroll on mobile):**
- 4 cards: Manual Case Rate, Manual Case Completion Time, SOP Adoption Rate, Site Rollout Progress
- All cards show: current value, target, trend arrow, last-updated timestamp
- Site-specific adoption rate for their cohort (if applicable)

**KPI card format:**
- All cards: large number + trend arrow + one-line status
- Site Rollout Progress: progress bar with "X of 50 sites live"
- No gauges, no trend lines — clean single-number format

**Red metric display:**
- Context notes visible inline — operational framing only
- "SOP Adoption Rate is below target because the rollout is in progress — your sites go live in Week 5" not "modifier error rate is driving DSO exposure"

**Data freshness display:**
- Simple: "Updated [time today]" — no source system language

**Mobile / 3G behavior:**
- Priority mobile view — all content readable at 375px with no scroll past 4 cards
- Cached data; 30-second load at 3G
- All context notes visible without interaction

---

## View 5: Product Manager

**Default screen (above the fold):**
- 16-KPI summary grid — all categories, RAG status at a glance
- Governance alert queue: pending context note validations, freshness warnings, escalation trigger status
- Data quality flag count

**Full access:**
- All 16 KPIs with full drill-down
- Context note editor for Red KPIs (validate AI-generated notes before other audiences see them)
- KPI definition version history
- Owner change log
- Source system health status

**Governance overlay:**
- Highlighted border on any KPI whose context note has not been PM-validated
- Freshness warning badge on any KPI approaching staleness threshold
- Dependency chain visualization: which KPIs cascade from each leading indicator

**Data freshness display:**
- Full source + timestamp + staleness warning threshold per KPI
- "Billing data: 18 hours old · Threshold: 26 hours · No action required"

**Mobile / 3G behavior:**
- Desktop primary — governance functions require desktop
- Mobile shows RAG summary only
