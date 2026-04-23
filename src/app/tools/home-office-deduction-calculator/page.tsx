import type { Metadata } from 'next';
import { Suspense } from 'react';
import HomeOfficeDeductionCalculator from '@/components/HomeOfficeDeductionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the simplified home office deduction method?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The simplified method allows a deduction of $5 per square foot of home office space, up to 300 square feet (maximum $1,500). No expense tracking required, no depreciation recapture. Ideal for small offices or simple calculations."
      }
    },
    {
      "@type": "Question",
      "name": "What is the regular home office deduction method?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The regular method calculates actual expenses (mortgage interest, property tax, utilities, insurance, repairs, depreciation) multiplied by the business percentage (office sq ft / total home sq ft). Potentially larger deduction but requires tracking."
      }
    },
    {
      "@type": "Question",
      "name": "What are the home office deduction eligibility requirements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eligibility requires: (1) Regular and exclusive use of space for business, (2) Principal place of business OR meeting clients regularly OR separate structure. Exclusive use means no personal activities in the office space."
      }
    },
    {
      "@type": "Question",
      "name": "Can employees deduct home office expenses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The home office deduction for employees was suspended from 2018-2025 by the Tax Cuts and Jobs Act. Only self-employed individuals (sole proprietors, freelancers, contractors) can claim this deduction on Schedule C."
      }
    },
    {
      "@type": "Question",
      "name": "What is depreciation recapture for home office?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When using the regular method, you deduct depreciation (27.5 years for residential). When selling the home, accumulated depreciation is recaptured at 25% tax rate. The simplified method has no depreciation, avoiding recapture entirely."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Home Office Deduction Calculator - Regular vs Simplified Method',
  description: 'Calculate home office deduction for self-employed. Compare regular method (actual expenses) vs simplified method ($5/sq ft). Form 8829 analysis.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeOfficeDeductionCalculator />
    </Suspense>
  );
}