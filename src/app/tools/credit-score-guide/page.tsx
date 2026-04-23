import type { Metadata } from 'next';
import { Suspense } from 'react';
import CreditScoreGuide from '@/components/CreditScoreGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What factors affect my credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit score factors (FICO): Payment History (35% - most important, on-time payments). Credit Utilization (30% - debt vs available credit, keep below 30%). Credit History Length (15% - older accounts help). Credit Mix (10% - variety of credit types). New Credit (10% - recent applications, inquiries). Payment history most impactful - one late payment can drop score significantly. Utilization second most important - high balances hurt. Build history, diversify credit types, limit applications."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit score ranges (FICO 300-850): 300-579 Poor (difficult approval, highest rates). 580-669 Fair (may qualify, not best rates). 670-739 Good (most lenders approve, average rates). 740-799 Very Good (better rates, easier approval). 800-850 Excellent (best rates, premium cards). Good score (670+) sufficient for most needs. Excellent (740+) for best mortgage rates. Above 800 for premium cards. Score needed varies by lender, loan type. Aim for 750+ for optimal rates."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve my credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improve credit score: Pay on time (set autopay, never miss). Reduce utilization (pay down debt, keep below 30% ideally 10%). Keep old accounts (don&apos;t close oldest cards). Limit applications (apply only when needed). Check reports (free annually, dispute errors). Monitor regularly (free apps, catch issues early). Use credit responsibly (small charges, pay in full). Become authorized user (family&apos;s good history). Improvement takes months - consistency key. Payment history changes take longest to fix."
      }
    },
    {
      "@type": "Question",
      "name": "How does credit utilization affect my score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit utilization: percentage of available credit used. Formula: balance / credit limit. Example: $3000 balance on $10,000 limit = 30% utilization. Impact: 30% of score weight. Thresholds: below 10% optimal, below 30% good, above 30% hurts score. Tip: pay before statement closes to report lower balance. Increase limits (don&apos;t increase spending). Multiple cards - utilization per card and overall both matter. Utilization = quick score improvement opportunity (pay down debt). Unlike history, utilization recovers fast."
      }
    },
    {
      "@type": "Question",
      "name": "How long do negative items stay on credit report?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit report retention: Late payments (7 years from first missed payment). Collections (7 years from first delinquency). Charge-offs (7 years). Bankruptcies (Chapter 7: 10 years, Chapter 13: 7 years). Foreclosures (7 years). Hard inquiries (2 years). Closed accounts (positive history: 10 years, negative: 7 years). Positive items stay longer, help score. Negative impact decreases over time. Build positive history now - recent negative hurts more than old. Dispute errors - incorrect items can be removed."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Credit Score Guide - Factors, Ranges & Improvement Tips',
  description: 'Credit score factors, ranges, improvement tips, and action impacts.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CreditScoreGuide />
    </Suspense>
  );
}