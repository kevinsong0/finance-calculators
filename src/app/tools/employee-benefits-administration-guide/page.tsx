import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeBenefitsAdministrationGuide from '@/components/EmployeeBenefitsAdministrationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of employee benefits need administration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefit types requiring administration include health insurance (medical, dental, vision with premium sharing), retirement plans (401k, pension with contribution matching), life insurance (basic and supplemental), disability insurance (short-term and long-term), paid time off (vacation, sick, holiday with accrual tracking), and flexible spending accounts (health and dependent with pre-tax deductions)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the benefits administration process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves selecting benefit providers, negotiating contracts, designing benefit packages, setting contribution levels, enrolling employees, managing changes, processing claims, tracking participation, reporting compliance, and reviewing plans annually."
      }
    },
    {
      "@type": "Question",
      "name": "What compliance requirements apply to benefits administration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance requirements include ERISA requirements, ACA compliance, HIPAA privacy rules, FMLA administration, COBRA notifications, DOL reporting, non-discrimination rules, and providing summary plan descriptions to employees."
      }
    },
    {
      "@type": "Question",
      "name": "What are common challenges in benefits administration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include cost management (handling premium increases through plan redesign), employee education (addressing complex options with clear communication), claim processing (resolving delays and disputes with streamlined procedures), and regulatory changes (adapting to new requirements through regular updates)."
      }
    },
    {
      "@type": "Question",
      "name": "How often should benefit plans be reviewed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefit plans should be reviewed annually at minimum. Review should assess plan performance, cost effectiveness, employee satisfaction, regulatory compliance, market competitiveness, and alignment with company goals. More frequent reviews may be needed when significant changes occur."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Benefits Administration Guide - Types, Process & Compliance',
  description: 'Benefit types, administration process, compliance requirements, and challenges.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeBenefitsAdministrationGuide />
    </Suspense>
  );
}