import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeLeaveManagementGuide from '@/components/EmployeeLeaveManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of employee leave need management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leave types include vacation leave (accrued time, company-specific policy), sick leave (illness or injury, health-related policy), FMLA leave (family and medical needs, federally mandated), parental leave (birth or adoption, company policy), bereavement leave (family death, company allowance), and military leave (service duty, USERRA protection)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the leave management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves receiving leave requests, verifying eligibility, checking leave balances, reviewing documentation, approving or denying, communicating decisions, tracking leave usage, managing return coordination, updating records, and reporting compliance."
      }
    },
    {
      "@type": "Question",
      "name": "What compliance requirements apply to leave management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance requirements include FMLA eligibility tracking, leave balance calculations, documentation requirements, return rights protection, benefit continuation during leave, job restoration obligations, notification timing requirements, and record retention standards."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges arise in leave management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include coverage planning (handling absent employees through cross-training), balance tracking (managing complex accruals with automated systems), policy consistency (ensuring fair application with clear guidelines), and return coordination (smoothing transitions with communication plans)."
      }
    },
    {
      "@type": "Question",
      "name": "How should companies handle FMLA leave requests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FMLA requests should be handled by verifying eligibility (50 employees, 12 months employment, 1,250 hours), reviewing documentation (medical certification if needed), tracking the 12-week entitlement, ensuring job restoration rights, maintaining benefit continuation, and following proper notification timelines within 5 business days."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Leave Management Guide - Types, Process & Compliance',
  description: 'Leave types, management process, compliance requirements, and challenges.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeLeaveManagementGuide />
    </Suspense>
  );
}