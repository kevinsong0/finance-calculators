import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceComplianceGuide from '@/components/WorkplaceComplianceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What workplace compliance areas exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance areas: Labor laws: Employment standards, hiring practices, termination rules, working conditions, employee rights, contract requirements, minimum standards. Safety regulations: OSHA compliance, workplace hazards, safety training, incident reporting, protective equipment, emergency procedures, safe work environment. Anti-discrimination: Title VII compliance, protected classes, equal opportunity, harassment prevention, reasonable accommodation, bias avoidance, inclusive practices. Wage and hour: Minimum wage compliance, overtime rules, pay equity, time tracking, classification rules, pay frequency, deduction rules. Benefits compliance: ACA requirements, ERISA rules, benefits administration, reporting obligations, coverage standards, eligibility rules. Data privacy: Employee data protection, consent requirements, data security, privacy notices, retention limits, breach response. Areas = multiple requirements. Labor laws fundamental. Safety mandatory. Discrimination prohibited. Wage and hour critical. Benefits required. Privacy growing. Comprehensive approach needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance maintenance: Documentation: Policies documented clearly, procedures written, employee communications, training records, incident documentation, decisions recorded, audit trails. Training: Regular compliance training, employee education, manager training, specific requirements, refreshers scheduled, new hire orientation, updates provided. Monitoring: Regulation changes tracked, policy reviews scheduled, compliance audits regular, gap identification, risk assessment, trend monitoring. Legal support: Legal counsel access, regulatory guidance, policy review, compliance assessment, risk evaluation, legal updates, expert consultation. Reporting: Required reports completed, timely submission, accurate information, documentation maintained, audit support, regulatory communication. Maintenance = ongoing effort. Documentation thorough. Training regular. Monitoring active. Legal support. Reporting timely. Continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What are compliance risks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance risks: Financial: Fines and penalties, monetary damages, settlement costs, legal fees, corrective costs, business losses, remediation expenses. Legal: Lawsuits filed, regulatory action, criminal charges, civil liability, enforcement proceedings, litigation exposure, judgment risk. Reputation: Public image damage, media coverage, customer loss, trust erosion, brand impact, community standing, future hiring challenges. Operational: Business interruption, corrective requirements, monitoring mandates, policy changes, training mandates, procedure updates. Employee: Claims filed, turnover increase, engagement decrease, morale impact, trust reduction, productivity effects. Risks = significant consequences. Financial costs. Legal exposure. Reputation damage. Operational impact. Employee effects. Prevention priority. Proactive approach."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct compliance audits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance audit process: Planning: Define audit scope, identify areas to review, schedule timing, assign auditors, prepare tools, set objectives, gather background. Review: Policy review, procedure examination, documentation check, training records, incident reports, decision records, communication files. Testing: Process verification, procedure compliance, documentation completeness, training effectiveness, reporting accuracy, policy adherence. Findings: Identify gaps, document deficiencies, risk assessment, root causes, improvement needed, corrective actions, prioritization. Reporting: Audit report written, findings documented, recommendations made, timeline set, responsible parties identified, follow-up planned. Follow-up: Corrective action tracked, improvement monitored, re-audit scheduled, progress verification, closure confirmation. Audit = systematic review. Scope defined. Documentation reviewed. Processes tested. Gaps identified. Recommendations made. Follow-up tracked. Regular schedule."
      }
    },
    {
      "@type": "Question",
      "name": "What compliance documentation is needed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation requirements: Policies: Written policies for all areas, policy acknowledgment, distribution records, version tracking, update history, employee access, management approval. Procedures: Standard procedures documented, step-by-step guides, responsible parties, timelines set, forms provided, examples given. Training: Training records maintained, completion tracking, content documented, dates recorded, trainer information, attendee lists, refresher tracking. Incidents: Incident reports filed, investigation records, outcome documentation, action taken, follow-up notes, lessons learned, closure records. Decisions: Decision records, rationale documented, parties involved, information considered, timeline noted, outcomes recorded. Records = comprehensive documentation. Policies written. Procedures documented. Training tracked. Incidents recorded. Decisions maintained. Access controlled. Retention followed."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Compliance Guide - Areas, Requirements & Risks',
  description: 'Compliance areas, maintenance, risks, audits, and documentation requirements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceComplianceGuide />
    </Suspense>
  );
}