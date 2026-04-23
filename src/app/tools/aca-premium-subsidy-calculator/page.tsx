import type { Metadata } from 'next';
import { Suspense } from 'react';
import ACAPremiumSubsidyCalculator from '@/components/ACAPremiumSubsidyCalculator';

export const metadata: Metadata = {
  title: 'ACA Health Insurance Subsidy Calculator | Obamacare Premium Tax Credit',
  description: 'Calculate your Affordable Care Act (Obamacare) premium tax credit based on income, household size, age, and state. Estimate your monthly subsidy and marketplace plan costs.',
  alternates: { canonical: '/tools/aca-premium-subsidy-calculator' },
  openGraph: {
    title: 'ACA Health Insurance Subsidy Calculator',
    description: 'Calculate your ACA premium subsidy based on income and household size. Estimate your marketplace plan costs.',
    url: '/tools/aca-premium-subsidy-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACA Health Insurance Subsidy Calculator',
    description: 'Calculate your ACA premium subsidy based on income and household size.',
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading calculator...</div>}>
        <ACAPremiumSubsidyCalculator />
      </Suspense>
    </main>
  );
}