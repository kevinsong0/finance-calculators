import type { Metadata } from 'next';
import { Suspense } from 'react';
import SalaryNegotiationCalculator from '@/components/SalaryNegotiationCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much raise should I ask for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard annual raises: 3-5%. With promotion: 10-20%. Job change: 15-25%. For exceptional performance: 10-15%. Research market rates first - asking above market without justification often fails. Base request on documented achievements and market benchmarks."
      }
    },
    {
      "@type": "Question",
      "name": "When is the best time to negotiate salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best times: job offer negotiation (strongest leverage), annual performance review, after major achievement or project completion, when company is profitable/growing, after receiving competing offer. Avoid: during layoffs, budget cuts, or poor company performance. Timing matters as much as request amount."
      }
    },
    {
      "@type": "Question",
      "name": "How do I research market salary rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resources: Glassdoor, Payscale, LinkedIn Salary, Bureau of Labor Statistics, industry salary surveys, recruiter conversations. Compare your role, experience level, location, and company size. Account for total compensation (bonus, equity, benefits) not just base salary."
      }
    },
    {
      "@type": "Question",
      "name": "What if my salary request is denied?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If denied: ask for specific reasons and timeline for future increase, negotiate non-salary items (bonus, equity, PTO, remote work, development budget), request performance metrics needed for raise, set follow-up meeting date. Don't accept 'no' as final - get commitment for future review."
      }
    },
    {
      "@type": "Question",
      "name": "Should I negotiate total compensation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, negotiate total compensation including: signing bonus, annual bonus percentage, equity/stock options, PTO days, retirement contribution match, remote work flexibility, professional development budget, education reimbursement. These add significant value and may be easier to negotiate than base salary."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Salary Negotiation Calculator - Calculate Raise & Lifetime Impact',
  description: 'Calculate appropriate salary raise requests based on experience, education, and industry. Analyze lifetime earnings impact and market-based compensation.',
  keywords: ['salary negotiation calculator', 'raise calculator', 'salary increase', 'negotiate salary', 'market salary', 'compensation calculator', 'lifetime earnings', 'salary negotiation tips'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SalaryNegotiationCalculator />
    </Suspense>
  );
}