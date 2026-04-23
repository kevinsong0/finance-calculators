import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeePayrollProcessingGuide from '@/components/EmployeePayrollProcessingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the key steps in payroll processing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payroll processing steps include gathering time data, calculating hours worked, determining pay rates, calculating gross pay, applying deductions, calculating overtime, processing bonuses, applying taxes, calculating net pay, reviewing accuracy, processing payment, distributing pay, recording transactions, and reporting compliance."
      }
    },
    {
      "@type": "Question",
      "name": "What are common payroll deductions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common deductions include federal tax (mandatory, wage bracket based), state tax (mandatory, state rates), Social Security (mandatory, 6.2% fixed rate), Medicare (mandatory, 1.45% fixed rate), retirement contributions (voluntary, employee choice), and health insurance (voluntary, plan selection)."
      }
    },
    {
      "@type": "Question",
      "name": "What compliance requirements apply to payroll?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance requirements include tax withholding accuracy, pay frequency requirements, minimum wage compliance, correct overtime calculation, pay stub requirements, record retention, reporting deadlines, and proper tax deposit timing."
      }
    },
    {
      "@type": "Question",
      "name": "What are best practices for payroll management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best practices include automating processing, double-checking calculations, maintaining thorough records, staying current on laws, communicating to employees, handling errors promptly, auditing regularly, and training payroll staff adequately."
      }
    },
    {
      "@type": "Question",
      "name": "How often should payroll be processed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payroll frequency depends on company policy and legal requirements. Common schedules include weekly, biweekly, semimonthly, and monthly. Each schedule has specific deadlines for processing, tax deposits, and reporting requirements."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Payroll Processing Guide - Steps, Deductions & Compliance',
  description: 'Payroll steps, deductions, compliance requirements, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeePayrollProcessingGuide />
    </Suspense>
  );
}