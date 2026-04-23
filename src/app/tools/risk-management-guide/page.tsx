import type { Metadata } from 'next';
import { Suspense } from 'react';
import RiskManagementGuide from '@/components/RiskManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is risk management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk management definition: Purpose: Identify potential problems before they occur, plan responses to minimize impact, increase project/business success probability, reduce uncertainty effects. Process: Identify risks - what could go wrong?, assess risks - how likely and how bad?, prioritize risks - which matter most?, plan responses - what to do if happens?, monitor risks - track and adjust. Risk components: Probability - likelihood of occurrence (high/medium/low), impact - severity if occurs (high/medium/low), trigger - what indicates risk is happening, owner - who monitors and responds. Response strategies: Avoid - eliminate the risk source, transfer - move risk elsewhere (contract, insurance), reduce - lower probability or impact, accept - acknowledge and monitor (low risks). Risk management = proactive planning. Identify, assess, plan, monitor. Don&apos;t wait for problems - anticipate them."
      }
    },
    {
      "@type": "Question",
      "name": "How do I identify project risks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk identification methods: Brainstorming: Team session to list potential risks, diverse perspectives, no judgment during listing, capture all possibilities. Categories to consider: Technical - implementation uncertainty, technology limitations, integration challenges. Schedule - timeline unrealistic, dependencies delays, resource availability timing. Resource - team members unavailable, skill gaps, tool limitations. Budget - cost overruns, unexpected expenses, budget cuts. Scope - requirements unclear, changes likely, scope creep potential. External - vendor dependencies, regulatory changes, market conditions. Historical review: Past project lessons learned, similar project experiences, known problem patterns. Stakeholder input: Ask team, stakeholders, subject experts, different viewpoints reveal risks. Documentation: Risk register - central list of all identified risks, probability assessment, impact assessment, mitigation plan, owner assignment, status tracking. Identification = comprehensive thinking. Categories help structure. Team input valuable. Document in register."
      }
    },
    {
      "@type": "Question",
      "name": "How do I assess and prioritize risks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk assessment and prioritization: Assessment: Probability - likelihood of occurrence: High (likely to happen), medium (possible), low (unlikely). Impact - severity if occurs: High (major effect on success), medium (significant but manageable), low (minor inconvenience). Risk score: Probability x impact (or similar calculation), high probability + high impact = highest priority, low probability + low impact = lowest priority. Prioritization matrix: High-high: Address immediately, active mitigation, high-medium/high-low: Plan mitigation, monitor closely, medium-medium: Monitor, low contingency, low-low: Accept, minimal monitoring. Factors beyond score: Controllability - can we influence?, detectability - can we see it coming?, timing - when might it occur?, dependencies - does it trigger other risks? Priority order: Critical risks (high score) first, manageable risks with mitigation plans, lower risks monitored but less effort. Assessment = probability + impact. Prioritization = focus resources on highest risks. Don&apos;t treat all risks equally - highest score gets most attention."
      }
    },
    {
      "@type": "Question",
      "name": "What are risk response strategies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk response strategies: Avoid: Eliminate the risk entirely, change approach to remove risk source, example: avoid risky technology by choosing proven alternative, use when risk is avoidable and high impact. Transfer: Move risk to another party, contracts with penalties, insurance, outsourcing with guarantees, example: transfer delivery risk to vendor contract, use when another party can handle better, contractual transfer works. Reduce (Mitigate): Lower probability or impact, implement controls, redundancy, testing, training, example: reduce technical risk with prototype testing, use when risk manageable through action, most common strategy. Accept: Acknowledge risk exists, no active mitigation, contingency plan if occurs, monitor for triggers, example: accept minor schedule delay risk with buffer, use when risk impact low, cost of mitigation exceeds benefit, unavoidable. Choosing strategy: Risk score high - avoid/transfer/reduce, risk score medium - reduce/accept with contingency, risk score low - accept with monitoring. Strategy = match to risk level. Avoid when possible, reduce when manageable, accept when acceptable. Cost-effective response for each risk."
      }
    },
    {
      "@type": "Question",
      "name": "How do I monitor risks throughout a project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk monitoring process: Regular reviews: Weekly or biweekly risk review, update status for each risk, identify new risks, adjust assessments if needed, update mitigation plans. Monitoring activities: Track trigger indicators - signs risk is occurring, check mitigation progress - are actions working?, reassess probability/impact - situation may change, identify emerging risks - new concerns appear, document closed risks - what was resolved. Communication: Report status to stakeholders, escalate critical risks, celebrate mitigated risks, lessons learned for future. Risk register updates: Status - open, in-progress, closed, triggered, probability/impact changes, mitigation adjustments, owner accountability. Triggers: Define specific indicators for each risk, measurable conditions, clear thresholds, what to watch for. Monitoring = continuous attention. Don&apos;t set and forget. Review regularly, update as situation changes. New risks emerge, old risks change."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Risk Management Guide - Types, Strategies & Process',
  description: 'Risk types, response strategies, assessment, and monitoring process.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RiskManagementGuide />
    </Suspense>
  );
}