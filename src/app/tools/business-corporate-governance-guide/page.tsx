import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCorporateGovernanceGuide from '@/components/BusinessCorporateGovernanceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What structures enable corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corporate governance structures include board of directors for strategic oversight accountable to shareholders, executive team for operational leadership accountable to board, audit committee for financial oversight accountable to board, risk committee for risk management accountable to board, compensation committee for pay decisions accountable to board, and nomination committee for director selection accountable to board."
      }
    },
    {
      "@type": "Question",
      "name": "What mechanisms support corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corporate governance mechanisms include board independence, director elections, executive compensation, shareholder rights, financial reporting, internal controls, risk management, and audit processes."
      }
    },
    {
      "@type": "Question",
      "name": "What practices improve corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corporate governance best practices include board diversity for director mix achieving perspectives benefit, separation of roles for CEO and chair split achieving checks and balances benefit, regular evaluation for performance reviews achieving accountability benefit, and stakeholder engagement for communication channels achieving transparency benefit."
      }
    },
    {
      "@type": "Question",
      "name": "What standards measure corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corporate governance standards include board meeting frequency, director attendance rate, independence compliance, audit completion rate, risk assessment coverage, compensation alignment, shareholder participation, and disclosure timeliness."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corporate governance ensures organizational accountability through establishing structures, implementing mechanisms, practicing diversity, separating roles, conducting evaluations, engaging stakeholders, meeting standards, maintaining transparency, aligning compensation, and ensuring shareholder rights."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Corporate Governance Guide - Structures, Mechanisms & Practices',
  description: 'Governance structures, control mechanisms, best practices, and compliance standards.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCorporateGovernanceGuide />
    </Suspense>
  );
}