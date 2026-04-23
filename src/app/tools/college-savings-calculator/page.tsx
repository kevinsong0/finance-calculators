import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollegeSavingsCalculator from '@/components/CollegeSavingsCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a 529 plan and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 529 plan is a tax-advantaged savings account designed for education expenses. Contributions grow tax-free and withdrawals are tax-free when used for qualified education costs including tuition, fees, books, and room & board. Many states offer additional tax deductions or credits for contributions."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I save for college?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "College costs vary widely: public universities average $25,000/year, private universities $55,000/year, and community colleges $15,000/year. With 5% annual inflation, costs increase significantly over time. A general guideline is to save 1/3 of expected costs, with the remaining 2/3 coming from current income and student loans/aid."
      }
    },
    {
      "@type": "Question",
      "name": "Can 529 plans be used for graduate school?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 529 plans can be used for graduate school and other post-secondary education. Qualified expenses include tuition, fees, books, supplies, and room & board at accredited institutions. The same tax benefits apply to graduate programs, making 529 plans useful for continuing education beyond undergraduate degrees."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if my child doesn't go to college?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your child doesn't attend college, you have several options: change the beneficiary to another family member, use the funds for qualified education expenses including trade schools and apprenticeships, or withdraw funds (paying income tax and a 10% penalty on earnings). Many states also allow rollovers to Roth IRAs starting in 2024."
      }
    },
    {
      "@type": "Question",
      "name": "What are the 529 plan contribution limits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "529 plan contribution limits vary by state, typically ranging from $300,000 to $500,000 per beneficiary. There are no annual contribution limits, but contributions over $18,000 per year may trigger gift tax reporting. Many states offer tax deductions up to certain annual limits, encouraging regular contributions throughout childhood."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'College Savings Calculator (529 Plan) - Plan Education Funding',
  description: 'Calculate how much to save for college with 529 plans. Project future education costs, estimate tax savings, and determine monthly contributions needed.',
  keywords: ['college savings calculator', '529 plan', 'education savings', 'college cost estimate', 'tuition planning', '529 calculator', 'education funding', 'college inflation'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CollegeSavingsCalculator />
    </Suspense>
  );
}