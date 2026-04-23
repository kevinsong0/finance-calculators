import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessRiskGovernanceGuide from '@/components/BusinessRiskGovernanceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What elements define risk governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk governance elements include risk identification for risk discovery through risk assessment process, risk evaluation for impact analysis through prioritization process, risk treatment for response actions through mitigation planning process, risk monitoring for ongoing tracking through performance review process, risk reporting for communication through status updates process, and risk governance for decision oversight through board review process."
      }
    },
    {
      "@type": "Question",
      "name": "What framework guides risk governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk governance framework involves establishing risk appetite, defining risk tolerance, implementing risk policies, creating risk procedures, assigning risk ownership, building risk capabilities, deploying risk tools, monitoring risk metrics, reporting risk status, and reviewing risk governance."
      }
    },
    {
      "@type": "Question",
      "name": "What roles support risk governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk governance roles include board for risk oversight with policy approval action, risk committee for risk review with assessment direction action, executive team for risk management with implementation action, and risk officers for risk coordination with monitoring execution action."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure risk governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk governance metrics include risk exposure levels, risk mitigation progress, risk incident count, risk response time, policy compliance rate, risk review completion, governance effectiveness, and risk maturity score."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement risk governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk governance provides organizational protection through establishing appetite, defining tolerance, implementing policies, creating procedures, assigning ownership, building capabilities, deploying tools, monitoring metrics, reporting status, and reviewing governance."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Risk Governance Guide - Elements, Framework & Roles',
  description: 'Risk governance elements, framework, governance roles, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessRiskGovernanceGuide />
    </Suspense>
  );
}