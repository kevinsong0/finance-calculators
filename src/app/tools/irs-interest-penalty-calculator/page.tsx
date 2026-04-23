import type { Metadata } from 'next';
import { Suspense } from 'react';
import IRSInterestPenaltyCalculator from '@/components/IRSInterestPenaltyCalculator';
import Link from 'next/link';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the IRS failure-to-pay penalty rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The IRS failure-to-pay penalty is 0.5% per month on unpaid taxes, up to a maximum of 25% of the unpaid amount. Interest also accrues on unpaid taxes at the federal short-term rate plus 3%."
      }
    },
    {
      "@type": "Question",
      "name": "What is the IRS failure-to-file penalty rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The failure-to-file penalty is 5% per month on unpaid taxes, up to 25% maximum. When both FTP and FTF apply, the combined rate is 4.5% per month (5% FTF minus 0.5% FTP offset)."
      }
    },
    {
      "@type": "Question",
      "name": "How does filing an extension affect IRS penalties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Filing Form 4868 extension protects against failure-to-file penalty until October 15. However, failure-to-pay penalty (0.5%/month) and interest still accrue from April 15 on unpaid taxes."
      }
    },
    {
      "@type": "Question",
      "name": "What is penalty abatement and how can I request it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Penalty abatement may be granted for: reasonable cause (illness, disaster, circumstances beyond control), first-time abatement (clean 3-year compliance history), or statutory exceptions (military service, disaster area). Request by calling IRS or submitting written explanation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the underpayment of estimated tax penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The underpayment penalty (Form 2210) applies if you didn't pay enough estimated tax during the year. You generally must pay 90% of current year tax or 100% of prior year tax (110% if AGI over $150K) through withholding or estimated payments."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'IRS Interest & Penalty Calculator (2026) - Tax Penalty Costs',
  description: 'Calculate IRS failure-to-pay, failure-to-file penalties, and interest on late tax payments. 2026 penalty rates and abatement options.',
};

const relatedTools = [
  { href: '/tools/tax-underpayment-penalty-calculator', name: 'Underpayment Penalty', desc: 'Form 2210 penalty' },
  { href: '/tools/irs-installment-agreement-calculator', name: 'Payment Plan Calculator', desc: 'IRS installment costs' },
  { href: '/tools/penalty-abatement-calculator', name: 'Penalty Abatement', desc: 'FTA eligibility check' },
  { href: '/tools/offer-in-compromise-calculator', name: 'Offer in Compromise', desc: 'Tax debt settlement' },
  { href: '/tools/tax-fresh-start-calculator', name: 'Fresh Start Initiative', desc: 'IRS relief programs' },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
          <IRSInterestPenaltyCalculator />
        </Suspense>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related IRS Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedTools.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition"
              >
                <h3 className="font-medium group-hover:underline">{tool.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex gap-4">
          <Link href="/tools/tax-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Tax Calculators Hub
          </Link>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Home →
          </Link>
        </section>
      </main>
    </>
  );
}