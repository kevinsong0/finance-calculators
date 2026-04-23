import type { Metadata } from 'next';
import { Suspense } from 'react';
import TaxExtensionCalculator from '@/components/TaxExtensionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What happens if I don't pay estimated tax with extension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You'll owe penalties and interest on underpayment. Penalty: 0.5% per month of unpaid tax (max 25%). Interest: ~4% annually. Extension only delays filing deadline, not payment. Pay at least 90% of current year tax or 100% of previous year by original deadline to avoid penalties."
      }
    },
    {
      "@type": "Question",
      "name": "What is the safe harbor rule for tax extensions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safe harbor protects from penalties if you pay: 90% of current year's tax liability by deadline, OR 100% of previous year's tax (110% if AGI exceeded $150,000). Meeting safe harbor eliminates underpayment penalty even if you owe more when filing by extension deadline."
      }
    },
    {
      "@type": "Question",
      "name": "How long does IRS tax extension last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Personal tax returns (Form 4868): 6-month extension to October 15. Business returns (Form 7004): varies - most get 6-month extension to September 15 for partnerships/S-corps, October 15 for C-corps. Extension only delays filing, not payment of tax owed."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get penalty abatement for late payment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, IRS may abate penalties for reasonable cause: serious illness, natural disaster, death in family, unavoidable absence. First-time penalty abatement available if clean compliance history (3 years). Submit written request with explanation. Interest cannot be abated - must be paid."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need separate state tax extension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most states accept federal extension automatically, but some require separate state extension filing. California, New York accept federal extension. Some states have different deadlines. Check your state's requirements. Even with accepted extension, pay estimated state tax by original deadline."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tax Extension Penalty Calculator - IRS Underpayment Analysis',
  description: 'Calculate IRS penalties and interest for tax extension underpayment. Understand safe harbor rules, extension deadlines, and penalty abatement.',
  keywords: ['tax extension calculator', 'IRS extension penalty', 'Form 4868', 'tax underpayment', 'safe harbor', 'tax penalty', 'extension deadline', 'IRS interest'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TaxExtensionCalculator />
    </Suspense>
  );
}