import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeHandbookGuide from '@/components/EmployeeHandbookGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should an employee handbook include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handbook sections: Company overview: Company introduction, mission statement, values, culture, history, structure, leadership, vision. Employment policies: At-will statement, hiring process, classification, probationary period, transfers, promotions, termination, resignation. Code of conduct: Behavior expectations, professional standards, ethics, conflicts of interest, confidentiality, integrity, respect. Compensation: Pay policies, pay periods, overtime, deductions, bonuses, raises, classification, timekeeping. Benefits: Benefits overview, eligibility, health insurance, retirement, leave, voluntary benefits, changes. Leave policies: PTO policy, sick leave, family leave, holidays, bereavement, jury duty, military leave. Safety: Safety commitment, hazards, reporting, emergency procedures, workers&apos; compensation, substance policy. Discipline: Performance expectations, discipline process, termination, appeals, documentation. Sections = comprehensive coverage. Company overview. Employment policies. Conduct standards. Compensation details. Benefits explanation. Leave policies. Safety requirements. Discipline process. Legal protections."
      }
    },
    {
      "@type": "Question",
      "name": "How do I develop an employee handbook?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handbook development: Research: Identify legal requirements, review regulations, understand obligations, policy research, industry standards, best practices, company needs. Drafting: Write policies clearly, consistent format, understandable language, comprehensive coverage, legal accuracy, practical application, employee focus. Review: Legal review essential, management input, HR review, employee feedback, accuracy check, completeness verification, tone appropriate. Approval: Management approval obtained, legal sign-off, HR confirmation, executive approval, board review if needed, final authorization. Format: Professional design, consistent formatting, readable layout, table of contents, index included, version dated, easy navigation. Distribution: Distribution method chosen, all employees receive, acknowledgment collected, training provided, questions answered, access ensured. Development = systematic process. Research thorough. Drafting clear. Review comprehensive. Approval obtained. Format professional. Distribution complete. Training provided."
      }
    },
    {
      "@type": "Question",
      "name": "How often should handbooks be updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handbook update frequency: Annual review: Yearly comprehensive review, policy assessment, regulation check, practice review, content update, format refresh, employee feedback. Regulation changes: Update when laws change, new requirements added, policy adjustments, legal compliance, immediate updates for major changes, timeline for implementation. Policy changes: Update for policy changes, procedure modifications, benefit changes, organizational changes, practice updates, announcement timing. Company changes: Update for company changes, structure changes, leadership changes, culture evolution, mission updates, strategic shifts. Triggers: Regular schedule plus triggers, law changes, policy changes, incidents, audits, employee feedback, organizational changes. Updates = scheduled plus triggered. Annual review minimum. Immediate for legal changes. Timely for policy changes. Company changes addressed. Employee notification. Acknowledgment collection. Version tracking."
      }
    },
    {
      "@type": "Question",
      "name": "What policies are essential in handbooks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Essential handbook policies: Equal opportunity: Non-discrimination statement, protected classes, commitment to fairness, complaint procedure, accommodation process, investigation process. Anti-harassment: Harassment prohibition, types defined, reporting procedure, investigation process, consequences stated, retaliation prohibited. Attendance: Attendance expectations, tardiness policy, absence reporting, leave request process, consequences, documentation. Confidentiality: Confidentiality requirements, protected information, disclosure rules, exceptions, consequences, business protection. Technology: Technology use policy, email rules, internet use, social media, equipment, security, privacy. Safety: Safety requirements, hazard reporting, emergency procedures, PPE, substance policy, workers&apos; comp. Discipline: Progressive discipline, steps explained, documentation, rights, termination process, appeals. Policies = essential coverage. Equal opportunity required. Harassment prohibition. Attendance rules. Confidentiality protection. Technology guidelines. Safety commitment. Discipline process. Legal compliance."
      }
    },
    {
      "@type": "Question",
      "name": "How do I ensure handbook compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handbook compliance: Legal review: Attorney review essential, regulation compliance, policy accuracy, legal language, protection statements, liability limitation, enforceability. Distribution: All employees receive handbook, new hire distribution, distribution documented, method appropriate, access ensured, copies available. Acknowledgment: Employee signature obtained, acknowledgment form, receipt confirmation, understanding statement, binding effect, record maintained. Training: Policy training provided, key sections explained, questions answered, understanding verified, compliance emphasized, refresher sessions. Updates: Change notification timely, updated distribution, new acknowledgment, training on changes, version tracking, archive maintained. Compliance = thorough process. Legal review obtained. Distribution complete. Acknowledgment collected. Training provided. Updates managed. Records maintained. Audit readiness."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Handbook Guide - Sections, Policies & Development',
  description: 'Handbook sections, essential policies, development process, and maintenance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeHandbookGuide />
    </Suspense>
  );
}