import type { Metadata } from 'next';
import { Suspense } from 'react';
import BenefitsGuide from '@/components/BenefitsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are standard employee benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard employee benefits: Required/standard: Health insurance - medical, dental, vision (often legally required), Retirement - 401k, pension plans (common), Paid time off - vacation, sick, holidays (standard), Disability insurance - short and long-term (some required). Optional/common: Life insurance - death benefit coverage, Flexible spending accounts - pre-tax for expenses, Wellness programs - fitness, mental health, Tuition assistance - education support. Competitive benefits: Remote work flexibility, Mental health coverage, Student loan help, Career development, Flexible scheduling, Parental leave beyond minimum. Standard = health, retirement, PTO, disability. Optional = life, FSA, wellness. Competitive additions attract talent. Market changes require updates."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose benefit plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefit plan selection: Needs assessment: Employee demographics, workforce preferences, budget constraints, competitive requirements. Options analysis: Multiple vendor quotes, coverage comparison, cost comparison, network adequacy, administrative requirements. Cost factors: Premium costs - company and employee share, Deductibles and copays - employee cost burden, Coverage limits - what&apos;s included/excluded, Administrative costs - time and systems. Decision criteria: Employee value vs cost, market competitiveness, budget fit, administrative complexity, vendor quality. Implementation: Clear enrollment process, employee communication, smooth transition, support available. Selection = employee needs + budget. Compare options thoroughly. Balance cost and coverage. Communicate clearly. Review regularly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I administer benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits administration: Enrollment: Clear process, deadlines communicated, online enrollment preferred, support available, questions answered. Communication: Benefits summary for employees, explain coverage clearly, regular updates, changes communicated promptly. Vendor management: Regular contact, issue resolution, performance monitoring, renewal negotiation. Compliance: Track legal requirements, ACA reporting, ERISA compliance, state-specific rules, documentation maintained. Record keeping: Enrollment records, changes tracked, eligibility verification, audit-ready files. Questions/support: HR help available, vendor contact provided, timely responses, escalation process. Administration = organized process. Clear enrollment. Good communication. Vendor relationships. Compliance tracking. Support available."
      }
    },
    {
      "@type": "Question",
      "name": "What benefits trends should I consider?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits trends: Remote work: Home office support, remote work allowances, flexibility options, equipment provision, connectivity support. Mental health: Counseling coverage, mental health days, stress support, EAP programs, therapy access. Financial wellness: Student loan assistance, financial planning help, emergency savings programs, debt management. Work flexibility: Flexible schedules, compressed weeks, part-time options, sabbatical programs. Professional development: Learning budgets, certification support, career coaching, mentorship programs. Wellness: Fitness subsidies, health screenings, nutrition support, preventive care. Trends = respond to workforce needs. Remote work support critical. Mental health important. Financial wellness growing. Flexibility valued. Regular trend review essential."
      }
    },
    {
      "@type": "Question",
      "name": "How do I communicate benefits to employees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits communication: Content: Clear summary of all benefits, coverage details, costs to employee, how to use benefits, enrollment instructions, contact information. Methods: Benefits guide document, presentation sessions, online portal, one-on-one discussions, regular reminders. Timing: Initial hiring - explain benefits, Annual enrollment - reminder and changes, Throughout year - updates and questions, Changes - immediate notification. Tone: Helpful and clear, not legalistic, emphasize value, answer questions patiently, accessible language. Accessibility: Multiple formats, translations if needed, easy to find, always available. Communication = clear, timely, helpful. Multiple methods. Ongoing not just enrollment. Answer questions. Emphasize value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Benefits Management Guide - Types, Administration & Trends',
  description: 'Benefit types, plan selection, administration, and current trends.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BenefitsGuide />
    </Suspense>
  );
}