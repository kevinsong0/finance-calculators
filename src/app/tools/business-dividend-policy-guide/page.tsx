import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessDividendPolicyGuide from '@/components/BusinessDividendPolicyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What dividend policies do companies use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Policy types include: Stable dividend (consistent payouts for investor confidence), Residual dividend (remaining profits for investment priority), Constant payout ratio (fixed percentage for profitability link), and Low regular plus extra (base plus special for flexibility)."
      }
    },
    {
      "@type": "Question",
      "name": "What factors influence dividend policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Influencing factors include: profitability level, cash flow stability, growth opportunities, capital requirements, debt obligations, tax considerations, shareholder preferences, industry practices, economic conditions, and legal restrictions."
      }
    },
    {
      "@type": "Question",
      "name": "What decisions shape dividend policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Policy decisions include: Payout ratio (distribution percentage, cash retention impact), Dividend frequency (payment schedule, cash timing impact), Dividend growth (increase rate, expectations impact), and Special dividends (extra payouts, flexibility impact)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure dividend policy success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: dividend payout ratio, dividend yield, dividend growth rate, dividend coverage ratio, dividend per share, total dividend payout, retention ratio, and dividend stability index."
      }
    },
    {
      "@type": "Question",
      "name": "Why is dividend policy important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dividend policy creates shareholder value, signals financial health, attracts investors, balances growth and returns, and builds confidence. Strategic dividend policy transforms profit distribution into shareholder communication."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Dividend Policy Guide - Policies, Factors & Decisions',
  description: 'Policy types, influencing factors, policy decisions, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessDividendPolicyGuide />
    </Suspense>
  );
}
