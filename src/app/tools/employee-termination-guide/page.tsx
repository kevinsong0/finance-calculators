import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeTerminationGuide from '@/components/EmployeeTerminationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are termination types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Termination types: Voluntary resignation: Employee chooses to leave, resignation submitted, two-week notice typical, smooth transition planned, employee-initiated process. Involuntary termination: Employer decision to end employment, performance-based, policy violation, business reasons, documentation required. Layoff: Business necessity driven, reduction in force, position elimination, economic reasons, restructuring, non-performance related. Termination for cause: Serious policy violation, misconduct, illegal activity, immediate termination possible, investigation completed, documentation critical. Retirement: Career end planned, retirement eligibility, succession planning, transition support, benefits continuation. Contract end: Contract term completed, project completion, agreed end date, transition planned, renewal option possible. Types = different handling. Voluntary employee choice. Involuntary employer decision. Layoff business driven. For cause serious issue. Retirement planned end. Contract natural end. Process varies."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle termination process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Termination process: Preparation: Review employment terms, check policy compliance, consult legal counsel, document rationale, prepare separation package, plan meeting. Meeting: Schedule meeting appropriately, private setting, appropriate attendees, direct communication, reason explained, paperwork completed, professional tone. Documentation: Termination letter written, performance records reviewed, discipline history documented, investigation records if needed, separation agreement prepared. Logistics: Final paycheck prepared, benefits information provided, COBRA details, company property collected, access removed, systems deactivated. Communication: Team notification appropriate, minimal details needed, coverage plan communicated, morale maintained, work continuity. Follow-up: HR support available, questions answered, references handled, records maintained, legal compliance verified. Process = professional handling. Preparation thorough. Meeting direct. Documentation complete. Logistics handled. Communication appropriate. Follow-up support."
      }
    },
    {
      "@type": "Question",
      "name": "What documentation is needed for termination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Termination documentation: Termination letter: Written termination notice, reason stated, effective date, terms outlined, separation package, signature required, copy provided. Performance records: Performance history, evaluation records, goal tracking, performance issues documented, improvement attempts, review history. Discipline history: Prior discipline records, warnings issued, PIP documents, investigation records, policy violations, response documented, outcomes noted. Separation agreement: Severance terms if applicable, release language, confidentiality terms, return of property, non-compete terms, benefit terms, signature required. Final pay: Final paycheck calculation, unused PTO payout, deductions noted, pay date confirmed, delivery method, wage compliance. Benefits: Benefits termination information, COBRA rights, continuation options, premium details, deadlines noted, coverage ending. Documentation = comprehensive records. Termination letter required. Performance history relevant. Discipline documented. Separation agreement if applicable. Final pay accurate. Benefits information. Legal compliance."
      }
    },
    {
      "@type": "Question",
      "name": "What legal considerations apply to termination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Legal considerations: Employment terms: Review employment agreement, check contract terms, notice requirements, severance provisions, restrictive covenants, benefits terms. Documentation: Performance documentation required, progressive discipline proof, investigation records, policy violations clear, consistent treatment, objective basis. Protected classes: No discrimination basis, protected status avoided, legitimate reason documented, consistent treatment, objective decision, bias avoided. Timing: Final pay timing required, state law compliance, wage requirements, immediate or next pay period, delivery method, proper calculation. Benefits: COBRA requirements, continuation rights, notification timing, election period, premium information, coverage ending. Post-termination: Reference policy followed, non-compete enforcement, unemployment claims, legal claims defense, records retained. Legal = compliance required. Agreement terms reviewed. Documentation thorough. Protected class awareness. Final pay timely. Benefits notification. Post-termination handling."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct termination meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Termination meeting: Preparation: Review documentation thoroughly, prepare message, plan logistics, arrange private setting, prepare paperwork, HR attendance, timing appropriate. Setting: Private location chosen, minimal distractions, appropriate seating, formal setting, professional atmosphere, comfort considered. Delivery: Direct and clear message, reason stated, avoid excessive detail, professional tone, brief explanation, no debate, firm delivery. Paperwork: Complete required forms, separation agreement if applicable, final pay discussed, benefits information provided, property return noted, signatures obtained. Response: Allow brief response, listen respectfully, avoid argument, maintain professionalism, redirect if needed, focus on process, support offered. Closure: Clear ending, next steps explained, logistics reviewed, HR contact provided, professional exit, no prolonging. Meeting = professional handling. Preparation thorough. Setting private. Delivery direct. Paperwork complete. Response brief. Closure clear. Support offered."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Termination Guide - Types, Process & Documentation',
  description: 'Termination types, process steps, documentation requirements, and legal considerations.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeTerminationGuide />
    </Suspense>
  );
}