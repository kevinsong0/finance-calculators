import type { Metadata } from 'next';
import { Suspense } from 'react';
import SalaryCalculator from '@/components/SalaryCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate annual salary from hourly wage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Annual salary = hourly rate × hours per week × weeks per year. For a standard 40-hour week with 52 weeks: $25/hr × 40 × 52 = $52,000. Adjust for vacation days, overtime, and bonuses."
      }
    },
    {
      "@type": "Question",
      "name": "How does overtime affect annual salary calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Overtime hours are typically paid at 1.5x the regular rate (time and a half). Calculate overtime pay = overtime hours × hourly rate × 1.5 × weeks worked. Add this to regular pay for total compensation."
      }
    },
    {
      "@type": "Question",
      "name": "Should I include vacation days in salary calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For hourly workers, unpaid vacation reduces working weeks. For salaried employees, vacation is typically paid. When converting hourly to salary, subtract vacation days from total working days to get accurate comparison."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between gross and net salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gross salary is the total amount before deductions. Net salary (take-home pay) is gross salary minus taxes, Social Security, Medicare, health insurance, and other deductions. Net pay is typically 70-80% of gross."
      }
    },
    {
      "@type": "Question",
      "name": "How many working hours are in a year?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard calculation: 40 hours × 52 weeks = 2,080 hours. Subtracting holidays and vacation (about 10-15 days): approximately 1,900-2,000 actual working hours per year for full-time employees."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Salary Calculator - Convert Hourly Wage to Annual Income',
  description: 'Calculate annual, monthly, weekly salary from hourly wage. Include overtime, bonuses, and projected growth.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SalaryCalculator />
    </Suspense>
  );
}