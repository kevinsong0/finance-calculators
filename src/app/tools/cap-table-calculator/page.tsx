import type { Metadata } from 'next';
import { Suspense } from 'react';
import CapTableCalculator from '@/components/CapTableCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a cap table?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A capitalization table (cap table) is a spreadsheet showing company ownership structure including shareholders, shares owned, ownership percentages, and equity value. It tracks common stock, preferred stock, options, warrants, and other equity instruments. Essential for startups and investors."
      }
    },
    {
      "@type": "Question",
      "name": "How do funding rounds affect cap tables?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each funding round adds new shareholders and can dilute existing owners. Series A investors typically get preferred stock with special rights. Founders' percentage decreases but company value increases. Track pre-money and post-money valuation. Update cap table after every round."
      }
    },
    {
      "@type": "Question",
      "name": "What is dilution in a cap table?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dilution occurs when new shares are issued, reducing existing shareholders' percentage ownership. Example: Founder owns 100% of 1M shares. Company issues 500K new shares to investors. Founder now owns 67% (1M of 1.5M). Dilution is normal but should be tracked carefully."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between authorized and outstanding shares?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Authorized shares: maximum shares company can issue per articles of incorporation. Outstanding shares: shares currently held by shareholders. Authorized minus outstanding equals unissued shares available for future funding or option pools. You can increase authorized with board approval."
      }
    },
    {
      "@type": "Question",
      "name": "How do employee stock options affect cap tables?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stock options represent potential future shares. Create an option pool (typically 10-20% of total) for employees. Options dilute when exercised. Track granted vs available options. Vesting schedules (typically 4 years) delay exercise. Include option pool in cap table calculations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Cap Table Calculator - Track Equity Ownership & Dilution',
  description: 'Calculate startup capitalization table across funding rounds. Track shareholders, ownership percentages, dilution, and post-money valuation.',
  keywords: ['cap table calculator', 'capitalization table', 'startup equity', 'dilution calculator', 'funding rounds', 'shareholder ownership', 'post-money valuation', 'startup financing'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CapTableCalculator />
    </Suspense>
  );
}