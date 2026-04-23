import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceInvestigationGuide from '@/components/WorkplaceInvestigationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When should workplace investigations occur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investigation triggers: Harassment complaints: Harassment allegations require investigation, all complaints investigated, formal or informal, prompt response required, thorough process, documented outcome. Discrimination claims: Discrimination allegations trigger investigation, bias complaints, unequal treatment reports, policy violation, protected class issues, fair process. Safety incidents: Safety events need investigation, accidents, injuries, near misses, hazards, violations, root cause analysis, corrective action. Policy violations: Policy breach triggers investigation, rule violations, procedure failures, standard breaches, conduct issues, appropriate response. Misconduct reports: Behavior complaints require investigation, misconduct allegations, ethics violations, performance issues, conduct breaches, fair process. Fraud concerns: Fraud suspicion triggers investigation, financial concerns, theft allegations, misuse reports, irregularities, thorough review. Triggers = multiple sources. Harassment mandatory. Discrimination required. Safety essential. Policy violations. Misconduct reports. Fraud concerns. Prompt response always."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct fair investigations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fair investigation principles: Objectivity: Investigator neutral, bias avoided, facts sought, evidence-based, no assumptions, open mind, fair assessment, consistent standards. Confidentiality: Information protected, limited disclosure, witness privacy, need-to-know basis, records secured, appropriate handling. Timeliness: Prompt start, efficient process, reasonable timeline, no unnecessary delay, progress tracked, completion timely. Thoroughness: Complete coverage, all parties interviewed, evidence gathered, relevant information, documentation thorough, gaps addressed. Documentation: All steps recorded, interviews documented, evidence cataloged, findings written, rationale explained, outcomes noted. Fairness: All parties heard, response opportunity, consistent treatment, bias avoided, rights protected, respectful process. Principles = guide process. Objectivity maintained. Confidentiality respected. Timely completion. Thorough coverage. Documentation complete. Fairness ensured. Legal compliance."
      }
    },
    {
      "@type": "Question",
      "name": "How do I interview during investigations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investigation interviews: Preparation: Interview plan created, questions prepared, evidence reviewed, objectives clear, setting arranged, privacy ensured, time allocated. Complainant: Interview complainant first, complaint details, specific incidents, dates and times, witnesses identified, evidence described, impact explained, expectations stated. Accused: Interview accused fairly, allegations explained, response opportunity, evidence presented, questions asked, explanation sought, defense heard, corroboration requested. Witnesses: Interview relevant witnesses, observations sought, knowledge gathered, corroboration found, timeline established, context provided, credibility assessed. Questions: Open-ended questions, specific clarification, follow-up queries, contradiction addressed, details sought, timeline confirmed, consistency checked. Documentation: Interview notes taken, statements recorded, quotes captured, demeanor noted, questions documented, responses logged, dates recorded. Interviews = thorough process. Preparation complete. Complainant first. Accused fairly. Witnesses relevant. Questions appropriate. Documentation thorough. Rights protected."
      }
    },
    {
      "@type": "Question",
      "name": "How do I document investigations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investigation documentation: Initial report: Complaint details, date received, reporting party, complaint description, initial assessment, severity rating, urgency level, immediate actions. Investigation plan: Scope defined, investigator assigned, timeline set, parties to interview, evidence to gather, resources needed, approach planned. Interview records: Interview dates, parties interviewed, questions asked, responses given, demeanor noted, statements captured, follow-up needed. Evidence: Evidence collected, documents reviewed, emails examined, records checked, photos taken, physical evidence, chain of custody. Analysis: Findings analyzed, evidence evaluated, credibility assessed, timeline verified, facts established, gaps identified, conclusions reached. Determination: Determination made, rationale explained, facts applied, policy considered, precedent reviewed, decision documented, reasons clear. Outcome: Action taken, discipline issued, corrective action, communication made, follow-up planned, closure documented, lessons learned. Documentation = complete records. Initial report. Investigation plan. Interview notes. Evidence cataloged. Analysis documented. Determination explained. Outcome recorded. Secure storage."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after investigations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Post-investigation actions: Determination: Make fair determination, apply evidence, consider policy, assess credibility, review precedent, consistent decision, documented rationale. Action: Implement appropriate action, discipline if warranted, corrective measures, training requirements, policy changes, monitoring needed, support provided. Communication: Communicate outcome appropriately, parties informed, confidentiality maintained, need-to-know basis, explanation given, expectations set. Follow-up: Monitor situation, check compliance, support parties, address retaliation, ongoing assessment, continued attention, issue resolution. Prevention: Address root causes, policy improvements, training updates, culture changes, awareness efforts, prevention measures, systematic fixes. Documentation: Close investigation file, outcome documented, action recorded, follow-up noted, file secured, retention followed, audit ready. After = complete process. Fair determination. Appropriate action. Proper communication. Follow-up monitoring. Prevention focus. Documentation closed. Lessons applied."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Investigation Guide - Types, Steps & Documentation',
  description: 'Investigation types, process steps, fairness principles, and documentation requirements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceInvestigationGuide />
    </Suspense>
  );
}