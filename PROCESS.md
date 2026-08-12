# The PROCESS — How I Built This Project

*Zina Lee, Product Manager*

---

## Why I Built This

Currently, AI's pitch to business is usually some version of "everyone gets clarity, all the time." Frontline teams and the C-suite alike, always knowing the state of an initiative, where the blockers sit, what the risk picture looks like.

The part that pitch skips over: information without framing, especially bad news, doesn't create clarity. It creates confusion, or worse. Give everyone access to everything with no context attached, and you haven't solved a communication problem. You've built a machine for generating false alarms on a schedule.

The first three projects in this portfolio were about designing outputs — what gets built, how a process changes, what gets said to whom. This one's about designing a system, with guardrails baked into the structure itself. The decisions here are slower and quieter than the ones in Horizon, Clarity, or Signal, and that's exactly why they're more dangerous if you get them wrong. Nobody notices a bad governance decision in week one. They notice it eighteen months later, when two executives are staring at conflicting numbers and neither of them trusts the dashboard anymore.

If you haven't read [the README](./README.md) yet, start there — this page goes deeper into the same reasoning, not a repeat of it.

---

## Why KPI Ownership Has to Come Before Dashboard Design

The instinct when someone asks for a dashboard is to start sketching screens. What should it show? What should it look like? I didn't start there. I started with: what's actually true, and who owns it?

A KPI without an owner is a number nobody's accountable for. It sits at amber indefinitely, because there's no name attached to the job of moving it. And if finance and operations have quietly been using different definitions of the same metric — "net" versus "gross" DSO, say — the dashboard doesn't catch that. It just gives both of them a shared screen to discover the disagreement on, live, in front of each other.

So the prompt is built to complete the entire KPI taxonomy — definitions, owners, measurement rules — before it generates a single stakeholder view. The AI can't design what people see until someone's decided what's actually true. That's not a technical constraint. That's the whole point.

## Access Differences, Not Formatting Differences

Project Signal solved a different version of this problem: five audiences, five formats of the same underlying information. Vista's version is sharper. These aren't five formats of one dataset — they're five different datasets, full stop. The CFO doesn't get a simplified version of the engineering view; the CFO gets financial KPIs and clinical cost drivers, and nothing else. A field lead doesn't see revenue-at-risk figures — not because the number's sensitive, but because a raw dollar amount with no clinical framing is just noise that generates a question a PM then has to personally go answer, which is the exact overhead a self-service system is supposed to eliminate.

That's the real shift from push to pull: in a pushed report, formatting is the tool a PM reaches for. Here, access architecture is the tool. Those are different design decisions, made at different points in the build, and confusing them is how you end up with a dashboard that looks audience-appropriate but leaks information it shouldn't.

## No Naked Red

None of the first three projects needed this rule, because a PM was always in the room to add context before a bad number reached anyone. Here, the number shows up alone.

A red SOP adoption rate in Week 4 of a six-week rollout looks like failure. It isn't — it's a rollout that hasn't finished yet. So the governance model requires a context note on every Red-status KPI, and the prompt drafts those notes as part of the scorecard generation. My job is validating that the notes are accurate, not authoring forty of them by hand every week.

But there's a gap the mock version didn't surface until I actually pressure-tested it: "Red during rollout is expected" is only true until the rollout ends. Without a hard date attached to that exception, it quietly turns into a permanent excuse instead of a time-bounded one. Before this dashboard goes live for real, the Phase 3 completion date needs to be written into the governance model as an actual threshold — after that date, Red escalates, no exceptions. Catching that gap mattered more than anything the mock demo showed cleanly.

## Freshness Is a Trust Problem, Not a Technical One

If someone pulls a DSO figure and sees 43 days, they assume that's current. If it's actually 72 hours stale because the billing system only batches overnight, every decision made off that number rests on information that's already wrong, and nobody knows it. Every data source in this design has a documented refresh cadence, surfaced directly in the UI as a last-updated timestamp on every panel. Stale data that looks current does more damage than a dashboard that's honestly slow.

## The CFO's Defect Spillover Request

The CFO noticed sprint delivery gaps lining up with downstream revenue cycle delays and asked for that engineering metric added to their view. Refusing would've ignored a real pattern the CFO had already spotted independently. Adding it raw would've handed a financial executive a delivery metric they'd interpret purely through a financial lens — a setup for the wrong argument with engineering every single time it moved.

The actual call: surface it, but reframe it around downstream financial impact instead of raw sprint counts, and keep VP Engineering as the metric's owner no matter who's looking at it. The access rule didn't bend. It got applied with judgment — which is a different skill than either enforcing a rule rigidly or waiving it because someone senior asked nicely.

---

## What the AI Handled, and What I Owned

The AI generated KPI definitions and measurement rules from the prior projects' data, designed the per-audience view specs, produced the governance model's ownership and cadence structure, drafted context notes for every Red KPI, and built the data-source and freshness mapping.

What I owned was narrower and riskier: which KPIs actually belong in which category, where every access boundary sits and why, which Red conditions trigger an active alert versus a passive display, whether the AI's context notes were actually accurate, and the call that freshness is a governance requirement rather than a technical footnote nobody reads. The AI can generate a governance model. It can't tell you whether the model is *right* for this specific org's trust dynamics. That's still on the PM, every time.

---

## What Happened When I Actually Ran It

**Phase 0 was missing, and it mattered more than anything in the spec itself.** This entire design assumes a platform decision already happened — where the dashboard actually lives. That choice is out of scope for this portfolio, but it constrains almost everything: dynamic context-note editing, the PM governance overlay, offline caching for field views, the escalation alert layer. A static BI embed can't do any of that. An enterprise platform like Power BI or Tableau can do some of it. A purpose-built app can do all of it, at real cost. That's a PM/budgetary/permissions tradeoff, and it needs to happen before Phase 1, not after the spec's already written and everyone's attached to it.

In practice, the right tool tracks organizational maturity. Jira dashboards work fine if the audience is engineering-only and the data's already native to Jira, but they can't reach EMR or billing data without custom integration. Confluence with connectors — EazyBI, an embedded Power BI or Tableau view — is the pragmatic middle path for a mid-market org without a full BI platform; audience-filtered page permissions map cleanly onto Vista's access model, and Confluence is a naturally good fit for the explanatory-text-next-to-red-metrics requirement. A full BI platform is the only path that properly handles dynamic access control and the escalation layer, but it assumes the org already has that tooling in place. Whichever path you take, the governance decisions — ownership, boundaries, context requirements, freshness thresholds — don't change. The platform changes the build cost and the ceiling. It doesn't change what makes the dashboard trustworthy.

**The dependency chain turned out to be a warning system, not just documentation.** The mock flagged RCM Platform API Error Rate and Revenue at Risk as leading indicators. The live run made the actual value of that clearer: the full cascade — API error, to manual case rate, to modifier errors, to revenue at risk, to DSO — takes five to ten business days to fully land. A PM watching only DSO is always reacting after the fact. A PM watching the two leading indicators has a week of runway to act before the financial damage shows up. That cascade should be the first thing on the default dashboard view, not a fact buried in a dependency-chain appendix nobody opens.

---

## What I'd Do Differently With Real Data

Validating KPI definitions with each stakeholder before building anything would've caught the finance-versus-operations DSO conflict before it became a live-dashboard argument instead of a design-phase conversation. That's the kind of disagreement that surfaces at the worst possible moment if you let it — in front of both executives, on a screen neither of them expected to disagree about.

I'd also move the governance model earlier in the delivery sequence. Vista's positioned as a capstone after three sprints of delivery, but KPI ownership conversations belong in PI Planning, not after Sprint 3 wraps. A dashboard is a lot easier to trust when the people reading it helped decide what it measures in the first place.

And I'd build in a feedback loop from day one — something as lightweight as a "this metric isn't useful to me" button on every card. The first version of any dashboard measures the wrong things at the wrong frequency for at least one audience. That's not a failure of design. It's just true of first versions. A cheap feedback mechanism catches it faster than waiting for a full redesign cycle after go-live.

---

### Live run observations, written by Claude *(from actually running this prompt)*

*(Asking an AI to critique its own output is usually worth doing — it surfaces things a clean read-through misses.)*

```text
What held up well:
- The dependency chain is specific and the cascade timing holds up — genuinely useful, not filler
- The "explanation before metric" rule for the Field Lead view catches something a lot of dashboard designs miss
- The escalation triggers are actual conditions, not just "when it turns Red" — the prompt is doing real work here

What needed pressure-testing against real data:
- The dollar thresholds (Revenue at Risk > $800K) are illustrative — a real org calibrates these during PM judgment, not before
- The data quality rules need validation against actual system behavior before anyone should trust them

What this confirms about the prompt design:
The pause point works as intended. Running this prompt means actually stopping to read five access-boundary rationales and deciding whether they're right, before anything else generates. That's the judgment test doing its job.

```
---

*This document reflects my actual decision-making process in building this project. It is intended to give reviewers — technical and non-technical — an honest view of where the PM thinking ends and the AI tooling begins — and vice-versa.*

*[Back to README](./README.md)*
