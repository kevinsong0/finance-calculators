import type { Metadata } from 'next';
import { Suspense } from 'react';
import PayrollGuide from '@/components/PayrollGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is payroll management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payroll management definition: Purpose: Pay employees correctly and timely, withhold proper taxes, comply with regulations, maintain accurate records. Components: Gross pay - total earnings before deductions, Deductions - taxes, benefits, other withholdings, Net pay - final amount paid to employee, Employer taxes - company-paid contributions (Social Security, unemployment). Process: Collect time/attendance data, calculate gross pay, apply deductions, calculate net pay, review for accuracy, process payments, record transactions, report taxes. Importance: Legal compliance mandatory, employee satisfaction, accurate records, tax obligations. Payroll = accuracy essential. Correct calculations. Timely payment. Tax compliance. Record everything. Regular audit."
      }
    },
    {
      "@type": "Question",
      "name": "What deductions are required in payroll?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Required payroll deductions: Federal income tax: Based on employee withholding status, W-4 form determines amount, progressive tax brackets, mandatory withholding. State income tax: Varies by state, some states have no income tax, withholding forms per state, mandatory if applicable. Social Security (FICA): 6.2% of wages up to limit, employer matches 6.2%, mandatory for all employees. Medicare (FICA): 1.45% of all wages, employer matches 1.45%, additional for high earners, mandatory. Voluntary deductions: Health insurance premiums, 401k contributions, life insurance, other benefits - if enrolled. Other: Garnishments (if ordered), union dues, other authorized deductions. Required = federal tax, state tax (if applicable), Social Security, Medicare. Voluntary = benefits contributions. Other = legal orders. Accurate withholding critical."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate overtime pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Overtime calculation: Federal requirements: Non-exempt employees, hours over 40 per week, 1.5x regular rate, weekly basis calculation. Regular rate: Include hourly rate, shift differentials, non-discretionary bonuses, exclude some payments. Calculation: Regular rate x 1.5 = overtime rate, Hours over 40 x overtime rate, Add to regular pay. State variations: Daily overtime (over 8 hours), higher multiplier (2x), different thresholds, check state law. Exempt employees: Salaried exempt - no overtime, professional/administrative/executive, minimum salary threshold, job duties test. Overtime = non-exempt only. Federal 40-hour week rule. 1.5x regular rate. Check state laws. Track hours accurately. Pay correctly."
      }
    },
    {
      "@type": "Question",
      "name": "What payroll records must I maintain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payroll record requirements: Employee information: Name, address, SSN, W-4 form, employment dates, classification (exempt/non-exempt). Pay records: Hours worked, pay rates, gross pay, deductions, net pay, pay dates. Tax records: Tax withholdings, tax payments, W-2 forms, tax reports filed. Time records: Time cards, attendance records, overtime hours, leave records. Retention periods: Federal - 3 years minimum, some records longer, state requirements may differ, safe practice = 4+ years. Accessibility: Audit-ready, organized filing, electronic or paper, secure storage, backup copies. Records = required retention. Employee data, pay records, tax info. Organize clearly. Secure storage. Audit preparation. Meet retention periods."
      }
    },
    {
      "@type": "Question",
      "name": "How do I stay compliant with payroll laws?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payroll compliance: Key laws: Fair Labor Standards Act (FLSA) - minimum wage, overtime, IRS requirements - withholding, reporting, State laws - vary significantly, Equal pay laws - discrimination prevention. Requirements: Minimum wage compliance - federal and state, Overtime calculation - correct rate, correct hours, Tax withholding - accurate amounts, timely deposits, Record keeping - required documents, retention periods, Pay timing - regular schedule, timely payment. Best practices: Reliable payroll system, regular audits, stay updated on changes, professional guidance if needed, documentation of decisions, manager training. Compliance = mandatory. Know requirements. Use reliable system. Audit regularly. Stay updated. Professional help if needed."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Payroll Management Guide - Components, Process & Compliance',
  description: 'Payroll components, deductions, calculations, and compliance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PayrollGuide />
    </Suspense>
  );
}